import mongoose from "mongoose";
import Project from "../models/Project.js";



const getProjects = async (req, res) => {

    const projects = await Project.find().where('creator').equals(req.user);

    res.json({ projects });
};

const newProject = async (req, res) => {
    
    const project = new Project(req.body);
    project.creator = req.user._id;

    try {
        const projectSaved = await project.save();
        res.json({ projectSaved });
    } catch (error) {
        console.log(error);
    }

 };

const getProject = async (req, res) => {

    const { id } = req.params;

    const project = await Project.findById(id);
    
    //console.log(mongoose.Types.ObjectId.isValid(project));
    
    if( !mongoose.Types.ObjectId.isValid(project)  ) {
        const error = new Error('Not found');
        return res.status(404).json({ msg: error.message });
    }

    if( project.creator.toString() !== req.user._id.toString() ) {
        const error = new Error('Invalid action');
        return res.status(404).json({ msg: error.message });
    }

    res.json( project );
 };

const editProject = async (req, res) => { };

const deleteProject = async (req, res) => { };

const addCollaborator = async (req, res) => { };

const deleteCollaborator = async (req, res) => { };

const getTasks = async (req, res) => { };

export {
    getProjects, newProject, getProject, editProject, deleteProject, addCollaborator, deleteCollaborator, getTasks
}