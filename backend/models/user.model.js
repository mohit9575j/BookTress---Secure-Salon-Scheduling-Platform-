 


import { DataTypes } from 'sequelize';
import { sequelize } from './index.js';

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('user', 'business', 'admin'),
    defaultValue: 'user',
  },
  phone: {
  type: DataTypes.STRING,
  allowNull: true,  
},

}, {
  timestamps: true,
  underscored: true,
});

export default User;
