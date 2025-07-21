import { DataTypes } from 'sequelize';
import { sequelize } from './index.js';

const Staff = sequelize.define('Staff', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isEmail: true,
    },
  },
  businessId: {
    type: DataTypes.INTEGER,
    allowNull: false, 
  },
}, {
  timestamps: true,
  underscored: true,
}

);

export default Staff;
