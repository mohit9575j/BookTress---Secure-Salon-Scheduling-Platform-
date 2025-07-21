import db from '../models/index.js';
  
const User = db.User;

const BusinessDetails = db.BusinessDetails;
if (!BusinessDetails) {
  throw new Error('BusinessDetails model not found');
}


// 1. GET All Approved Businesses with Pagination
export const getAllApprovedBusinesses = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const offset = (page - 1) * limit;

    const { count, rows } = await BusinessDetails.findAndCountAll({
      where: { status: 'approved' },
      include: [{ model: User, attributes: ['id', 'name', 'email'] }],
      limit,
      offset,
      order: [['createdAt', 'DESC']],
    });

    res.status(200).json({
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      data: rows,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};


 export const getAllPendingBusinesses = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const offset = (page - 1) * limit;

    const { count, rows } = await BusinessDetails.findAndCountAll({
      where: { status: 'pending' },
      include: [{ model: User, attributes: ['id', 'name', 'email'] }],
      limit,
      offset,
      order: [['createdAt', 'DESC']],
    });

    res.status(200).json({
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      data: rows,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};



 
// 2. GET Single Business by User ID
export const getBusinessByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const business = await BusinessDetails.findOne({
      where: { userId, status: 'approved' },
      include: [{ model: User, attributes: ['id', 'name', 'email'] }],
    });

    if (!business) {
      return res.status(404).json({ message: 'Business not found or not approved' });
    }

    res.status(200).json(business);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};



export const submitBusinessDetails = async (req, res) => {
  try {
    const { businessName, address, phone } = req.body;
    const userId = req.user.id;

    const user = await User.findByPk(userId);
    if (!user || user.role !== 'business') {
      return res.status(403).json({ message: 'Access denied: only business users can submit' });
    }

    const existing = await BusinessDetails.findOne({ where: { userId } });

    // Agar pehle se details hai
    if (existing) {
      if (existing.status === 'approved') {
        return res.status(400).json({ message: 'Your business is already approved. No need to submit again.' });
      } else {
        // Agar rejected ya pending hai to wapas bhejne dena chahte ho
        await existing.destroy(); // purana hata do taki naya insert ho sake
      }
    }

    if (!req.file) return res.status(400).json({ message: 'Document file is required' });

    const details = await BusinessDetails.create({
      userId,
      businessName,
      address,
      phone,
      documentUrl: req.file.path,
      status: 'pending' // default status
    });

    res.status(201).json({ message: 'Details submitted. Awaiting admin approval.', details });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};


// Approve   business details
export const approveBusiness = async (req, res) => {
  try {
    const { id } = req.params; // businessDetails ID

    const details = await BusinessDetails.findByPk(id);
    if (!details) return res.status(404).json({ message: 'Business details not found' });

    // 🔁 Fix this line
    details.status = 'approved'; // ✅ set status instead of isApproved
    await details.save();

    res.status(200).json({ message: 'Business approved successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};


 // Reject business details

export const rejectBusiness = async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body; 

    const details = await BusinessDetails.findByPk(id);
    if (!details) return res.status(404).json({ message: 'Business details not found' });

    details.status = 'rejected';
    details.rejectionReason = reason || 'No reason provided'; 
    await details.save();

    res.status(200).json({ message: 'Business rejected', details });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
