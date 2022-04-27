import mongoose from "mongoose";
import Project from "../models/Project.js";
import User from "../models/User.js";



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
    console.log(mongoose.Types.ObjectId.isValid(id));
    
    if( !mongoose.Types.ObjectId.isValid(id) ) {
        const error = new Error('Not found');
        return res.status(404).json({ msg: error.message });
    }

    const project = await Project.findById(id).populate('tasks');
    
    
    if( project.creator.toString() !== req.user._id.toString() ) {
        const error = new Error('Invalid action');
        return res.status(404).json({ msg: error.message });
    }

    res.json(
        project
    );
 };

const editProject = async (req, res) => { 
    
    const { id } = req.params;
    console.log(mongoose.Types.ObjectId.isValid(id));
    
    if( !mongoose.Types.ObjectId.isValid(id) ) {
        const error = new Error('Not found');
        return res.status(404).json({ msg: error.message });
    }

    const project = await Project.findById(id);
    

    if( project.creator.toString() !== req.user._id.toString() ) {
        const error = new Error('Invalid action');
        return res.status(404).json({ msg: error.message });
    }

    project.name = req.body.name || project.name;
    project.description = req.body.description || project.description;
    project.deliveryDate = req.body.deliveryDate || project.deliveryDate;
    project.customer = req.body.customer || project.customer;

    try {
        const projectSaved = await project.save();
        res.json(projectSaved);
    } catch (error) {
        console.log(error);
    }
};

const deleteProject = async (req, res) => { 
    const { id } = req.params;
    console.log(mongoose.Types.ObjectId.isValid(id));
    
    if( !mongoose.Types.ObjectId.isValid(id) ) {
        const error = new Error('Not found');
        return res.status(404).json({ msg: error.message });
    }

    const project = await Project.findById(id);
    

    if( project.creator.toString() !== req.user._id.toString() ) {
        const error = new Error('Invalid action');
        return res.status(404).json({ msg: error.message });
    }

    try {
        await project.deleteOne();
        res.json({ msg: 'Deleted project' });
    } catch (error) {
        console.log(error);
    }
};

const searchCollaborator = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({email}).select('-confirmed -createdAt -password -updatedAt -token -__v');

    if(!user) {
        const error = new Error('User not found');
        return res.status(400).json({msg: error.message});
    }

    res.json(user);
 };

const addCollaborator = async (req, res) => { };

const deleteCollaborator = async (req, res) => { };

//const getTasks = async (req, res) => { 
//    const { id } = req.params;
//
//    if( !mongoose.Types.ObjectId.isValid(id) ) {
//        const error = new Error('Not found');
//        return res.status(404).json({ msg: error.message });
//    }
//
//    const tasks = await Task.find().where('project').equals(id);
//
//    res.json(tasks);
//};

export {
    getProjects, 
    newProject, 
    getProject, 
    editProject, 
    deleteProject, 
    addCollaborator, 
    deleteCollaborator,
    searchCollaborator
}