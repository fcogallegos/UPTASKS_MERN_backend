import express from "express";
const router = express.Router();

import { register, authenticate, confirm, forgetPassword } from '../controllers/userController.js';


// Authentication, Register and Users confirmation
router.post('/', register); //create a new user
router.post('/login', authenticate);
router.get('/confirm/:token', confirm);
router.post('/forget-password', forgetPassword);

 
export default router;