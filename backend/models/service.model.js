// // ✅ Modified service.model.js
// import { DataTypes } from 'sequelize';
// import { sequelize } from './index.js';

// const Service = sequelize.define('Service', {
//   name: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   description: {
//     type: DataTypes.TEXT,
//   },
//   price: {
//     type: DataTypes.FLOAT,
//     allowNull: false
//   },
//   duration: {
//     type: DataTypes.INTEGER, // in minutes
//     allowNull: false
//   },
//   userId: {
//     type: DataTypes.INTEGER,
//     allowNull: false
//   }
// });

// export default Service;




// ✅ FIXED: service.model.js
import { DataTypes } from 'sequelize';
import { sequelize } from './index.js';

const Service = sequelize.define('Service', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  duration: {
    type: DataTypes.INTEGER,  
    allowNull: false
  },

  image: { 
    type: DataTypes.STRING 
  },


  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',  
      key: 'id'
    }
  }
});

export default Service;