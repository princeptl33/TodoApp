import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
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
    }
});



const Todo = mongoose.model("practice", TaskSchema)

export default Todo;