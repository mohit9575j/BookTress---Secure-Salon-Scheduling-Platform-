 

 import db from '../models/index.js';
const Service = db.Service;
const User = db.User;
const BusinessDetails = db.BusinessDetails;

 

//  Get all services with pagination
export const getAllServices = async (req, res) => {
  try {
     const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
 
     const result = await Service.findAndCountAll({
      limit,
      offset,
      include: [{
        model: User,
        as: 'owner',
        attributes: ['id', 'email', 'role']
      }],
      order: [['createdAt', 'DESC']]
    });

    //  Send response
    res.status(200).json({
      totalItems: result.count,
      totalPages: Math.ceil(result.count / limit),
      currentPage: page,
      data: result.rows
    });

  } catch (err) {
    console.error('Get all services error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};


// GET all services for the logged-in business user with pagination
export const getMyServices = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;      
    const limit = parseInt(req.query.limit) || 5;   
    const offset = (page - 1) * limit;

    const { count, rows: services } = await Service.findAndCountAll({
      where: { userId: req.user.id }, 
      include: [
        {
          model: User,
          as: 'owner',
          attributes: ['id', 'email', 'role']  
        }
      ],
      limit,
      offset,
      order: [['createdAt', 'DESC']]
    });

    if (count === 0) {
      return res.status(404).json({ message: 'No services found for this business' });
    }

    res.status(200).json({
      totalServices: count,
      currentPage: page,
      totalPages: Math.ceil(count / limit),
      services
    });
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ message: 'Server error' });
  }
};








// Get single service by ID
export const getServiceById = async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.id, {
      include: [{
        model: User,
        as: 'owner',
        attributes: ['id', 'email', 'role']
      }]
    });
    if (!service) return res.status(404).json({ message: 'Service not found' });
    res.status(200).json(service);
  } catch (err) {
    console.error('Get service error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

 

export const createService = async (req, res) => {
  try {
    const { name, description, price, duration } = req.body;

    const image = req.file ? req.file.filename : null; 
    const newService = await Service.create({
      name,
      description,
      price,
      duration,
      image, // save filename
      userId: req.user.id,
    });

    res.status(201).json(newService);
  } catch (err) {
    console.error(' Create service error:', err);
    res.status(400).json({ message: 'Invalid input', error: err.message });
  }
};



 // FIXED: Business can only update their own services
export const updateService = async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    console.log('🔄 Update service request:', {
      serviceId: req.params.id,
      userId: req.user.id,
      userRole: req.user.role,
      serviceOwnerId: service.userId,
      isOwner: service.userId === req.user.id
    });

    //  FIXED: Proper authorization logic
    let canUpdate = false;
    
    if (req.user.role === 'admin') {
      canUpdate = true;
      console.log(' Admin can update any service');
    } else if (req.user.role === 'business' && service.userId === req.user.id) {
      canUpdate = true;
      console.log(' Business can update their own service');
    } else {
      console.log(' Business cannot update others services');
    }

    if (!canUpdate) {
      return res.status(403).json({ 
        message: 'Unauthorized to update this service',
        debug: {
          userRole: req.user.role,
          userId: req.user.id,
          serviceOwnerId: service.userId,
          isOwner: service.userId === req.user.id
        }
      });
    }

    const { name, description, price, duration } = req.body;
    await service.update({ name, description, price, duration });
    
    console.log(' Service updated successfully');
    res.status(200).json(service);
  } catch (err) {
    console.error(' Update service error:', err);
    res.status(400).json({ 
      message: 'Error updating service',
      error: err.message 
    });
  }
};

// Delete a service -  FIXED: Business can only delete their own services
export const deleteService = async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    console.log('🗑️ Delete service request:', {
      serviceId: req.params.id,
      userId: req.user.id,
      userRole: req.user.role,
      serviceOwnerId: service.userId,
      isOwner: service.userId === req.user.id
    });

    //  FIXED: Proper authorization logic
    let canDelete = false;
    
    if (req.user.role === 'admin') {
      canDelete = true;
      console.log(' Admin can delete any service');
    } else if (req.user.role === 'business' && service.userId === req.user.id) {
      canDelete = true;
      console.log(' Business can delete their own service');
    } else {
      console.log(' Business cannot delete others services');
    }

    if (!canDelete) {
      return res.status(403).json({ 
        message: 'Unauthorized to delete this service',
        debug: {
          userRole: req.user.role,
          userId: req.user.id,
          serviceOwnerId: service.userId,
          isOwner: service.userId === req.user.id
        }
      });
    }

    await service.destroy();
    console.log(' Service deleted successfully');
    res.status(200).json({ message: 'Service deleted successfully' });
  } catch (err) {
    console.error(' Delete service error:', err);
    res.status(500).json({ 
      message: 'Error deleting service',
      error: err.message 
    });
  }
};