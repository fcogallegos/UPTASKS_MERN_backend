import mongoose from "mongoose";
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
        return res.status(403).json({ msg: error.message });
    }

    try {
        const taskSaved = await Task.create(req.body);

        //save the ID in the project
        projectExist.tasks.push(taskSaved._id);
        await projectExist.save();
        
        res.json( taskSaved );
    } catch (error) {
        console.log(error);
    }

    console.log(projectExist);
};

const getTask = async (req, res) => {
    const { id } = req.params;
   //console.log(id);

   if( !mongoose.Types.ObjectId.isValid(id) ) {
        const error = new Error('Task not found');
        return res.status(404).json({ msg: error.message });
   }
   
   const task = await Task.findById(id).populate('project');
   //console.log(task);

   if( task.project.creator.toString() !== req.user._id.toString() ) {
        const error = new Error('Action not valid');
        return res.status(403).json({ msg: error.message }); 
   }
   
   res.json(task);
};

const updateTask = async (req, res) => {
    const { id } = req.params;
   //console.log(id);

   if( !mongoose.Types.ObjectId.isValid(id) ) {
        const error = new Error('Task not found');
        return res.status(404).json({ msg: error.message });
   }
   
   const task = await Task.findById(id).populate('project');
   //console.log(task);

   if( task.project.creator.toString() !== req.user._id.toString() ) {
        const error = new Error('Action not valid');
        return res.status(403).json({ msg: error.message }); 
   }

   task.name = req.body.name || task.name;
   task.description = req.body.description || task.description;
   task.priority = req.body.priority || task.priority;
   task.deliveryDate = req.body.deliveryDate || task.deliveryDate;

   try {
       const taskSaved = await task.save();
       res.json(taskSaved);
   } catch (error) {
       console.log(error);
   }
};

const deleteTask = async (req, res) => {
    const { id } = req.params;
    //console.log(id);
 
    if( !mongoose.Types.ObjectId.isValid(id) ) {
         const error = new Error('Task not found');
         return res.status(404).json({ msg: error.message });
    }
    
    const task = await Task.findById(id).populate('project');
    //console.log(task);
 
    if( task.project.creator.toString() !== req.user._id.toString() ) {
         const error = new Error('Action not valid');
         return res.status(403).json({ msg: error.message }); 
    }
 
    try {

        const project = await Project.findById(task.project);
        project.tasks.pull(task._id);

        await Promise.allSettled([await project.save(), await task.deleteOne()]);

        res.json({ msg: 'Deleted task' });
    } catch (error) {
        console.log(error);
    }
};

const changeStatus = async (req, res) => {

    const { id } = req.params;
 
    if( !mongoose.Types.ObjectId.isValid(id) ) {
         const error = new Error('Task not found');
         return res.status(404).json({ msg: error.message });
    }

    const task = await Task.findById(id).populate('project');

    if( task.project.creator.toString() !== req.user._id.toString() && !task.project.collaborators.some(
        (collaborator) => collaborator._id.toString() === req.user._id.toString()) ) {
            const error = new Error('Action not valid');
            return res.status(403).json({ msg: error.message }); 
   }

   task.status = !task.status;
   task.completed = req.user._id;
   await task.save();

   const taskStored = await Task.findById(id)
    .populate('project')
    .populate('completed');

   
   res.json(taskStored);

   //console.log(task);
};

export {
    addTask,
    getTask,
    updateTask,
    deleteTask,
    changeStatus
}  