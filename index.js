//const express = require("express");
import express from "express";

import dotenv from 'dotenv';
import conectDB from './config/db.js';
import userRoutes from "./routes/userRoutes.js";
import projectRoutes from './routes/projectRoutes.js';

const app = express();
app.use(express.json());

dotenv.config();

conectDB();


//Routing
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log( `Server running in the port ${PORT}` );
});