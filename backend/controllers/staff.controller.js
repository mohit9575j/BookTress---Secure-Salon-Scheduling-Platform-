 


import db from '../models/index.js';
const Staff = db.Staff;
const Appointment = db.Appointment;
const Service = db.Service;
const User = db.User;

// Create new staff for a business
export const createStaff = async (req, res) => {
  try {
    const businessId = req.user.id;
    const { name, email, phone } = req.body;
    const newStaff = await Staff.create({ name, email, phone, businessId });
    res.status(201).json(newStaff);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get staff list with pagination for the logged-in business
export const getStaffByBusiness = async (req, res) => {
  try {
    const businessId = req.user.id;

     let { page = 1, limit = 10 } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    const offset = (page - 1) * limit;

    const { count, rows } = await Staff.findAndCountAll({
      where: { businessId },
      offset,
      limit,
      order: [['createdAt', 'DESC']],
    });

    res.json({
      totalStaff: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      staff: rows,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// NEW - Get staff with their appointments (for workload management)
export const getStaffWithAppointments = async (req, res) => {
  try {
    const businessId = req.user.id;
    const { date } = req.query;  
    let whereCondition = {};
    if (date) {
      whereCondition.date = date;
    }

    const staff = await Staff.findAll({
      where: { businessId },
      include: [
        {
          model: Appointment,
          where: whereCondition,
          required: false,  
          include: [
            {
              model: Service,
              attributes: ['name', 'duration']
            },
            {
              model: User,
              attributes: ['name', 'phone']
            }
          ]
        }
      ],
      order: [['name', 'ASC']]
    });

    const staffWithWorkload = staff.map(member => ({
      id: member.id,
      name: member.name,
      email: member.email,
      phone: member.phone,
      appointments: member.Appointments || [],
      appointmentCount: member.Appointments?.length || 0,
      isAvailable: member.Appointments?.length === 0
    }));

    res.json({
      staff: staffWithWorkload,
      totalStaff: staff.length
    });

  } catch (error) {
    console.error('Get staff with appointments error:', error);
    res.status(500).json({ error: error.message });
  }
};

// Update staff details (only for own business staff)
export const updateStaff = async (req, res) => {
  try {
    const businessId = req.user.id;
    const staffId = req.params.id;
    const { name, email, phone } = req.body;

    const staff = await Staff.findOne({ where: { id: staffId, businessId } });
    if (!staff) return res.status(404).json({ message: 'Staff not found' });

    staff.name = name ?? staff.name;
    staff.email = email ?? staff.email;
    staff.phone = phone ?? staff.phone;

    await staff.save();
    res.json(staff);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a staff member (only own business staff)
export const deleteStaff = async (req, res) => {
  try {
    const businessId = req.user.id;
    const staffId = req.params.id;

    const staff = await Staff.findOne({ where: { id: staffId, businessId } });
    if (!staff) return res.status(404).json({ message: 'Staff not found' });

    // Check if staff has any pending appointments
    const pendingAppointments = await Appointment.count({
      where: { 
        staffId: staffId,
        status: ['booked', 'rescheduled']
      }
    });

    if (pendingAppointments > 0) {
      return res.status(400).json({ 
        message: `Cannot delete staff. ${pendingAppointments} pending appointments found.` 
      });
    }

    await staff.destroy();
    res.json({ message: 'Staff deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};