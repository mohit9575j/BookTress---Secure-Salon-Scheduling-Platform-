

//  FIXED: businessMiddleware.js - Better error handling
import db from '../models/index.js';
const BusinessDetails = db.BusinessDetails;

export const isAdminOrApprovedBusiness = async (req, res, next) => {
  try {
    console.log(' Checking user permissions:', {
      userId: req.user.id,
      role: req.user.role
    });

    if (req.user.role === 'admin') {
      console.log(' Admin access granted');
      return next();
    }

    if (req.user.role === 'business') {
      const business = await BusinessDetails.findOne({ 
        where: { userId: req.user.id } 
      });
      
      console.log(' Business details:', {
        found: !!business,
        status: business?.status,
        userId: business?.userId
      });

      if (business && business.status === 'approved') {
        console.log(' Approved business access granted');
        return next();
      } else {
        console.log(' Business not approved or not found');
        return res.status(403).json({ 
          message: 'Business not approved or not found',
          debug: {
            businessFound: !!business,
            status: business?.status
          }
        });
      }
    }

    console.log(' Invalid role or unauthorized');
    return res.status(403).json({ 
      message: 'Only admin or approved business users allowed',
      debug: { role: req.user.role }
    });
  } catch (error) {
    console.error(' Middleware error:', error);
    return res.status(500).json({ message: 'Authorization check failed' });
  }
};