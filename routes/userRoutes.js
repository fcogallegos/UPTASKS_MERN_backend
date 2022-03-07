import express from "express";
const router = express.Router();

import { register, authenticate } from '../controllers/userController.js';


// Authentication, Register and Users confirmation
router.post('/', register); //create a new user
router.post('/login', authenticate);



 
export default router;