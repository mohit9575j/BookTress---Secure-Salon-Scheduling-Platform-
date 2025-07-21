import db from '../models/index.js';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken.js';

const User = db.User;
export const register = async (req, res) => {
  const { name, email, password, role } = req.body;   
  try {
    const userExists = await User.findOne({ where: { email } });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

     const allowedRoles = ['user', 'business', 'admin']; 
    const userRole = allowedRoles.includes(role) ? role : 'user';

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword, role: userRole });

    const token = generateToken(user.id, user.role);
    res.status(201).json({ user: { id: user.id, name, email, role: user.role }, token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = generateToken(user.id, user.role);
    res.status(200).json({ user: { id: user.id, name: user.name, email, role: user.role }, token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
