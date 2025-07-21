 


import db from '../models/index.js';

const { Appointment, Service, Staff, User } = db;

// Create appointment with AUTO STAFF ASSIGNMENT
export const createAppointment = async (req, res) => {
  try {
    const { serviceId, date, time, notes } = req.body;
    const userId = req.user.id;

    // Check if service exists
    const service = await Service.findByPk(serviceId, {
      include: [{ model: User, as: 'owner' }]
    });
    
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    const businessId = service.userId;  

    // Find available staff for this business at this time
    const availableStaff = await Staff.findAll({
      where: { businessId },
      include: [
        {
          model: Appointment,
          where: {
            date: date,
            time: time,
            status: ['booked', 'rescheduled']  
          },
          required: false  
        }
      ]
    });

     const freeStaff = availableStaff.filter(staff => 
      staff.Appointments.length === 0
    );

    let assignedStaffId = null;
    
    if (freeStaff.length > 0) {
 
      assignedStaffId = freeStaff[0].id;
    } else if (availableStaff.length > 0) {
 
      const leastBusyStaff = availableStaff.reduce((prev, current) => 
        prev.Appointments.length < current.Appointments.length ? prev : current
      );
      assignedStaffId = leastBusyStaff.id;
    }

    // Create appointment
    const appointment = await Appointment.create({
      userId,
      serviceId,
      staffId: assignedStaffId,
      date,
      time,
      notes,
      status: 'booked'
    });

    // Get complete appointment details
    const appointmentWithDetails = await Appointment.findByPk(appointment.id, {
      include: [
        { model: Service, attributes: ['name', 'price', 'duration'] },
        { model: Staff, attributes: ['name', 'phone', 'email'] },
        { model: User, attributes: ['name', 'email'] }
      ]
    });

    res.status(201).json({
      message: 'Appointment created successfully',
      appointment: appointmentWithDetails
    });

  } catch (error) {
    console.error('Create appointment error:', error);
    res.status(500).json({ error: 'Failed to create appointment' });
  }
};

 
  export const getMyAppointments = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const result = await Appointment.findAndCountAll({
      where: { userId: req.user.id },
      limit,
      offset,
      distinct: true, 
      include: [
        {
          model: Service,
          attributes: ['name', 'price', 'duration'],
          include: [{
            model: User,
            as: 'owner',
            attributes: ['name', 'email']
          }]
        },
        {
          model: Staff,
          attributes: ['name', 'phone', 'email']
        }
      ],
      order: [['date', 'DESC'], ['time', 'DESC']]
    });

    res.status(200).json({
      totalItems: result.count,
      totalPages: Math.ceil(result.count / limit),
      currentPage: page,
      data: result.rows
    });

  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch appointments' });
  }
};






export const deleteMyAppointment = async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const { notes } = req.body;

    const appointment = await Appointment.findOne({
      where: {
        id: appointmentId,
        userId: req.user.id
      }
    });

    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found or unauthorized' });
    }

    // Save the notes as delete reason
    appointment.notes = notes || 'Deleted by user';
    await appointment.save();

    // Now delete the appointment
    await appointment.destroy();

    return res.status(200).json({ message: 'Appointment deleted successfully with reason' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ error: 'Failed to delete appointment' });
  }
};











// Admin can view all appointments
export const getAllAppointments = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden' });
    }

    const appointments = await Appointment.findAll({
      include: [
        { model: Service, attributes: ['name', 'price'] },
        { model: Staff, attributes: ['name', 'email'] },
        { model: User, attributes: ['name', 'email'] }
      ],
      order: [['date', 'DESC'], ['time', 'DESC']]
    });
    
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch appointments' });
  }
};

// NEW - Business can view their appointments
export const getBusinessAppointments = async (req, res) => {
  try {
    const businessId = req.user.id;
    let { page = 1, limit = 10, status = 'all' } = req.query;
    
    page = parseInt(page);
    limit = parseInt(limit);
    const offset = (page - 1) * limit;

    // Build where condition
    const whereCondition = {};
    if (status !== 'all') {
      whereCondition.status = status;
    }

    const appointments = await Appointment.findAndCountAll({
      where: whereCondition,
      include: [
        {
          model: Service,
          where: { userId: businessId }, // Only this business's services
          attributes: ['name', 'price', 'duration']
        },
        {
          model: User,
          attributes: ['name', 'email', 'phone']
        },
        {
          model: Staff,
          attributes: ['name', 'phone', 'email']
        }
      ],
      offset,
      limit,
      order: [['date', 'ASC'], ['time', 'ASC']]
    });

    res.json({
      totalAppointments: appointments.count,
      totalPages: Math.ceil(appointments.count / limit),
      currentPage: page,
      appointments: appointments.rows
    });

  } catch (error) {
    console.error('Get business appointments error:', error);
    res.status(500).json({ error: error.message });
  }
};

// NEW - Business can reschedule appointment with message
export const rescheduleAppointment = async (req, res) => {
  try {
    const businessId = req.user.id;
    const appointmentId = req.params.id;
    const { newDate, newTime, rescheduleMessage, newStaffId } = req.body;

    // Find appointment
    const appointment = await Appointment.findOne({
      where: { id: appointmentId },
      include: [
        {
          model: Service,
          where: { userId: businessId } // Only this business's appointments
        },
        {
          model: User,
          attributes: ['name', 'email']
        }
      ]
    });

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found or unauthorized' });
    }

    // Check if new staff belongs to this business (if provided)
    if (newStaffId) {
      const staff = await Staff.findOne({
        where: { id: newStaffId, businessId }
      });
      if (!staff) {
        return res.status(400).json({ message: 'Invalid staff selection' });
      }
    }

    // Update appointment
    appointment.date = newDate || appointment.date;
    appointment.time = newTime || appointment.time;
    appointment.staffId = newStaffId || appointment.staffId;
    appointment.status = 'rescheduled';
    appointment.rescheduleMessage = rescheduleMessage || null;
    
    await appointment.save();

    // Get updated appointment with details
    const updatedAppointment = await Appointment.findByPk(appointment.id, {
      include: [
        { model: Service, attributes: ['name', 'price'] },
        { model: Staff, attributes: ['name', 'phone'] },
        { model: User, attributes: ['name', 'email'] }
      ]
    });

    res.json({
      message: 'Appointment rescheduled successfully',
      appointment: updatedAppointment
    });

  } catch (error) {
    console.error('Reschedule appointment error:', error);
    res.status(500).json({ error: error.message });
  }
};

// Updated - Better update function
export const updateAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findByPk(id);

    if (!appointment) return res.status(404).json({ error: 'Not found' });

    // Only admin or owner can update
    if (req.user.role !== 'admin' && req.user.id !== appointment.userId) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    const { date, time, status, notes } = req.body;
    
    if (date) appointment.date = date;
    if (time) appointment.time = time;
    if (status) appointment.status = status;
    if (notes) appointment.notes = notes;
    
    await appointment.save();

    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update appointment' });
  }
};

// Existing delete function - no changes needed
export const deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findByPk(id);

    if (!appointment) return res.status(404).json({ error: 'Not found' });

    // Only admin or owner can delete
    if (req.user.role !== 'admin' && req.user.id !== appointment.userId) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    await appointment.destroy();
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete appointment' });
  }
};