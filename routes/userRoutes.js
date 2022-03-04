import express from "express";
const router = express.Router();

import { register } from '../controllers/userController.js';


// Authentication, Register and Users confirmation
router.post('/', register); //create a new user


export default router;