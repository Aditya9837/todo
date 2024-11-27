import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Correct type for ObjectId
        required: true,
        ref: 'User' // Reference to the User model (adjust this if your User model has a different name)
    },
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 100,
    },
    description: {
        type: String,
        required: true,
        trim: true,
        maxlength: 500,
    },
    completed: {
        type: Boolean,
        required: true,
        default: false,
    }
}, { timestamps: true });

const Todo = mongoose.model('Todo', todoSchema);

export default Todo;
