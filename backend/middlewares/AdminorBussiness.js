export const isAdminOrBusiness = (req, res, next) => {
  if (req.user.role === 'admin' || req.user.role === 'business') {
    next();
  } else {
    return res.status(403).json({ message: 'Access restricted to admin or business users only' });
  }
};
