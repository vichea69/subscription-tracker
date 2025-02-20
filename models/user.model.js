import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "UserName is required"],
        trim: true,
        minlength: [3, "UserName must be at least 3 characters long"],
        maxlength: [30, "UserName must be less than 30 characters long"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match: [
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            "Please enter a valid email address"
        ],
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be at least 8 characters long"],
        trim: true,
        
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

export default User; 