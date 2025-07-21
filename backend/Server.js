// backend/Server.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import authRoutes from './routes/auth.routes.js';
import { sequelize } from './models/index.js';
import userRoutes from './routes/user.routes.js';
import serviceRoutes from './routes/service.routes.js';
import appointmentRoutes from './routes/appointment.routes.js';
import staffRoutes from './routes/staff.routes.js';
import businessRoutes from './routes/business.routes.js';


dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/services', serviceRoutes);
app.use('/appointments', appointmentRoutes);
app.use('/staff', staffRoutes);
app.use('/business', businessRoutes);


// DB Connection + Server start
const PORT = process.env.PORT || 5000;
sequelize.sync({alter: true }).then(() => {
  console.log(' DB connected');
  app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
});
