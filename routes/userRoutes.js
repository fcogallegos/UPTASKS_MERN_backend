import express from "express";
const router = express.Router();

import { register, authenticate, confirm, forgetPassword, checkToken } from '../controllers/userController.js';


// Authentication, Register and Users confirmation
router.post('/', register); //create a new user
router.post('/login', authenticate);
router.get('/confirm/:token', confirm);
router.post('/forget-password', forgetPassword);
router.get('/forget-password/:token', checkToken);
 
export default router;