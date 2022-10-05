import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    joinedAt: {
        type: Date,
        default: Date.now
    }
})

const User = mongoose.model('user', userSchema)
export default User;