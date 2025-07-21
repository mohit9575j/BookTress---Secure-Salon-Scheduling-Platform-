import { DataTypes } from 'sequelize';
import { sequelize } from './index.js';
 
export const BusinessDetails = sequelize.define('BusinessDetails', {
  businessName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  documentUrl: {
    type: DataTypes.STRING,
    allowNull: false, 
  },
  status: {
    type: DataTypes.ENUM('pending', 'approved', 'rejected'),
    defaultValue: 'pending',
  },


  rejectionReason: {
    type: DataTypes.STRING,
    allowNull: true,
  },

}, {
  timestamps: true,
  underscored: true,
});
 
//export default BusinessDetails;
