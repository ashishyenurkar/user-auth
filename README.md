🚀 User Authentication System
A full-stack React + Node.js + PostgreSQL authentication system with user management and filtering.

📌 Features
✅ User Authentication (Login/Register with JWT)
✅ Dashboard for User Management
✅ Add User (With type: child, mother, father, teacher)
✅ Search & Filter Users (By name and type)
✅ Pagination Support

🛠️ Tech Stack
Frontend: React, Material-UI
Backend: Node.js, Express.js
Database: PostgreSQL (Sequelize ORM)
🚀 Installation & Setup
1️⃣ Clone the Repository
bash
Copy
Edit
git clone 
cd user-auth-app
2️⃣ Install Dependencies
Backend:
bash
Copy
Edit
cd backend
npm install
Frontend:
bash
Copy
Edit
cd ../frontend
npm install
3️⃣ Configure Environment Variables
Create a .env file in the backend folder:

env
Copy
Edit
PORT=4000

DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=admin@123
DB_NAME=user-auth
DB_PORT=5432

JWT_SECRET=ljflshvakfdsvkdhglsjfldkgjldjkl
4️⃣ Run the Application
Start Backend (Node.js + Express.js)
bash
Copy
Edit
cd backend
npm start
Start Frontend (React)
bash
Copy
Edit
cd frontend
npm start
The frontend will run on http://localhost:3000
The backend API will run on http://localhost:4000

🛠️ API Endpoints
Endpoint	Method	Description
/api/user/register	POST	Register a new user
/api/user/login	POST	Login user & get JWT token
/api/user/user-list	GET	Fetch users with pagination, filtering, and search
📌 Notes
Ensure PostgreSQL is running before starting the backend.
Update DB_PASSWORD in .env if needed.
The project uses Sequelize for database interaction.
