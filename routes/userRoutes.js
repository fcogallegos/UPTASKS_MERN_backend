import express from "express";
const router = express.Router();

import { register, authenticate, confirm,
forgetPassword, checkToken, newPassword,
profile } from '../controllers/userController.js';

import checkAuth from '../middleware/checkAuth.js';



// Authentication, Register and Users confirmation
router.post('/', register); //create a new user
router.post('/login', authenticate);
router.get('/confirm/:token', confirm);
router.post('/forget-password', forgetPassword);
router.route('/forget-password/:token').get(checkToken).post(newPassword);

 router.get('/profile', checkAuth, profile);

export default router;