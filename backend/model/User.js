import { Sequelize, DataTypes } from 'sequelize';
import { sequelize } from '../db/db.js';


const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true, // Validate email format
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  type: {
    type: DataTypes.ENUM('child', 'mother', 'father', 'teacher'), // Only these values allowed
    allowNull: true,
  },
}, {
  timestamps: true, 
});

// Sync Model
await User.sync({ alter: true });

export default User;
