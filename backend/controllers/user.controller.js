import db from '../models/index.js';
const User = db.User;

// Get current user profile
export const getUserProfile = async (req, res) => {
  try {
    const user = req.user;
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update current user profile
export const updateUserProfile = async (req, res) => {
  try {
    const user = req.user;
    if (!user) return res.status(404).json({ message: 'User not found' });

    const { name, email, password } = req.body;

    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = password; 

    await user.save();

    // Remove password from response
    const userData = user.toJSON();
    delete userData.password;

    res.json({ message: 'Profile updated', user: userData });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
