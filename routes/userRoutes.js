import express from "express";
const router = express.Router();

import { register, authenticate, confirm } from '../controllers/userController.js';


// Authentication, Register and Users confirmation
router.post('/', register); //create a new user
router.post('/login', authenticate);
router.get('/confirm/:token', confirm);


 
export default router;