import Project from "../models/Project.js";



const getProjects = async (req, res) => {

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

const getProject = async (req, res) => { };

const editProject = async (req, res) => { };

const deleteProject = async (req, res) => { };

const addCollaborator = async (req, res) => { };

const deleteCollaborator = async (req, res) => { };

const getTasks = async (req, res) => { };

export {
    getProjects, newProject, getProject, editProject, deleteProject, addCollaborator, deleteCollaborator, getTasks
}