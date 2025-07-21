 




import { sequelize } from '../config/db.js';
import User from './user.model.js';
import Service from './service.model.js';
import Appointment from './appointment.model.js';
import Staff from './staff.model.js';
 import {BusinessDetails} from './businessDetails.model.js';

// Associations

User.hasMany(Service, { foreignKey: 'userId', as: 'services' });
Service.belongsTo(User, { foreignKey: 'userId', as: 'owner' });

User.hasMany(Appointment, { foreignKey: 'userId' });
Appointment.belongsTo(User, { foreignKey: 'userId' });

Service.hasMany(Appointment, { foreignKey: 'serviceId' });
Appointment.belongsTo(Service, { foreignKey: 'serviceId' });

Staff.hasMany(Appointment, { foreignKey: 'staffId' });
Appointment.belongsTo(Staff, { foreignKey: 'staffId' });

BusinessDetails.belongsTo(User, { foreignKey: 'userId' });
User.hasOne(BusinessDetails, { foreignKey: 'userId' });

 



const db = {};
db.sequelize = sequelize;
db.User = User;
db.Service = Service;
db.Appointment = Appointment;
db.Staff = Staff;
db.BusinessDetails = BusinessDetails;

export { sequelize };
export default db;
