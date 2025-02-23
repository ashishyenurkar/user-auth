import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { connectDB, syncDB } from './db/db.js';
import UserRoute from './routes/UserRoute.js';

dotenv.config(); 
const app = express();




const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded form data
app.use(cookieParser()); // Parse cookies
// Configure CORS
app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true // Enable cookies and authentication headers
}));// Enable CORS (adjust as needed)

//routes for user 
app.use('/api/user', UserRoute);

// Routes (Example)
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Start the server only after database connection
const startServer = async () => {
  await connectDB(); 
  //await syncDB(); // Uncomment if you want to sync models

  app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
  });
};

startServer(); // Initialize the app
