import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables


const sequelize = new Sequelize(
  process.env.DB_NAME, 
  process.env.DB_USER, 
  process.env.DB_PASSWORD, 
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT || 5432,
    logging: false, // Disable SQL query logs
  }
);

// Test database connection
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ PostgreSQL Database Connected Successfully!');
  } catch (error) {
    console.error('❌ Database Connection Failed:', error);
    process.exit(1); // Exit process if connection fails
  }
};

// Sync database models (optional)
const syncDB = async () => {
  try {
    await sequelize.sync({ alter: true }); // Use { force: true } to drop and recreate tables
    console.log('✅ Database Synced!');
  } catch (error) {
    console.error('❌ Error syncing database:', error);
  }
};

export { sequelize, connectDB, syncDB };
