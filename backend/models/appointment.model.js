 


import { DataTypes } from 'sequelize';
import {sequelize} from '../config/db.js';

const Appointment = sequelize.define('Appointment', {
   date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  time: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('booked', 'rescheduled', 'cancelled', 'completed'),
    defaultValue: 'booked',
  },
  
   userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  serviceId: {
    type: DataTypes.INTEGER,
    allowNull: false,  
    references: {
      model: 'Services', 
      key: 'id'
    }
  },
  staffId: {
    type: DataTypes.INTEGER,
    allowNull: false, 
    references: {
      model: 'staffs',
      key: 'id'
    }
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true,  
  },
  rescheduleMessage: {
    type: DataTypes.TEXT,
    allowNull: true,  
  }
}, {
  timestamps: true,
  underscored: true
});

export default Appointment;