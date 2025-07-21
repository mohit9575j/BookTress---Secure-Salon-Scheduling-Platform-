import jwt from 'jsonwebtoken';
import db from '../models/index.js';

const User = db.User;

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // decoded me id aur role dono hote hai
      // User ko DB se fetch karo taaki fresh data mile (including role)
      const user = await User.findByPk(decoded.id, { attributes: { exclude: ['password'] } });

      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }

      // req.user me user object assign karo (id, role, baki fields)
      req.user = user;

      next();
    } catch (error) {
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};
