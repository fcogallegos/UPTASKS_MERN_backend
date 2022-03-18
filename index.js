//const express = require("express");
import express from "express";

import dotenv from 'dotenv';
import conectDB from './config/db.js';

import cors from 'cors';

import userRoutes from "./routes/userRoutes.js";
import projectRoutes from './routes/projectRoutes.js';
import taskRoutes from './routes/taskRoutes.js';

const app = express();
app.use(express.json());

dotenv.config();

conectDB();

//configure CORS
const whitelist = [process.env.FRONTEND_URL];

const corsOptions = {
    origin: function( origin, callback ) {
        console.log(origin);
        if( whitelist.includes(origin) ) {
            //can consult API
            callback(null, true);   
        } else {
            //not is permited
            callback(new Error("Cors Error"));
        }
    }
}

app.use(cors(corsOptions));

//Routing
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);



const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log( `Server running in the port ${PORT}` );
});