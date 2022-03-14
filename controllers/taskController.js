import Task from "../models/Task.js";
import Project  from "../models/Project.js";

const addTask = async (req, res) => {
    //console.log(req.body); 
    const { project } = req.body;

    const projectExist = await Project.findById(project);
    
    if( !projectExist ) {
        const error = new Error('The project not exist');
        return res.status(404).json({ msg: error.message });
    }

    if( projectExist.creator.toString() !== req.user._id.toString() ) {
        const error = new Error('Your dont have permissions to add taks');
        return res.status(404).json({ msg: error.message });
    }

    try {
        const taskSaved = await Task.create(req.body);
        res.json( taskSaved );
    } catch (error) {
        console.log(error);
    }

    console.log(projectExist);
};

const getTask = async (req, res) => {};

const updateTask = async (req, res) => {};

const deleteTask = async (req, res) => {};

const changeStatus = async (req, res) => {};

export {
    addTask,
    getTask,
    updateTask,
    deleteTask,
    changeStatus
}  