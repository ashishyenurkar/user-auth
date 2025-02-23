import { getUsers, loginUser, logoutUser, registerUser } from "../controller/UserController.js";
import express from 'express';
import { authenticateUser } from "../middelware/auth.js";
const router = express.Router();

router.post('/register',registerUser);
router.post('/login',loginUser);
router.get('/user-list',authenticateUser, getUsers);
router.post('/logout',logoutUser);

export default router;