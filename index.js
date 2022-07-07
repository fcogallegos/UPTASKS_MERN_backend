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
const server = app.listen(PORT, () => {
    console.log( `Server running in the port ${PORT}` );
});


// Socket.io
import { Server } from 'socket.io';

const io = new Server(server, {
    pingTimeout: 60000,
    cors: {
        origin: process.env.FRONTEND_URL,
    }
}); 

io.on('connection', (socket) => {
    console.log('Conected to socket.io');

    //Define the events of socket.io
    socket.on('open project', (project) => {
        socket.join(project);
    });

    socket.on('new task', (task) => {
        const project = task.project;
        socket.to(project).emit('task added', task);
    });

    socket.on('delete task', task => {
        const project = task.project;
        socket.to(project).emit('task deleted', task);
    })
});