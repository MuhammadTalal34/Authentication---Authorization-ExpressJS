const mongoose = require('mongoose');
const { isEmail, trim } = require('validator');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        validate: {
            validator: isEmail,
            message: 'Please provide a valid email address',
        },
    },
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    user_type_id: {
        type: Number,
        default: 0, 
        
    },
});

module.exports = mongoose.model('AuthUser', userSchema);
