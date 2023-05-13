import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
    title: {
        type: String,
        reqired: true
    },
    description: {
        type: String,
        reqired: true
    },
    isCompleted:{
        type: Boolean,
        default: false
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "User",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

// mongoose.model = {};

const Task = mongoose.models.todo ||  mongoose.model("todo", TodoSchema)

export default Task;