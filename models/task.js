import mongoose from "mongoose";

const taskSchema = mongo.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    status: {
        type: Boolean,
        default: false
    },
    deliveryDate: {
        type: Date,
        required: true,
        default: Date.now()
    },
    priority: {
        type: String,
        required: true,
        enum: ['Low','Medium','High']
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        def: 'Project'
    }
},{
    timestamps: true
});

const Task = mongoose.model('Task', taskSchema);

export default Task;