const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true, 'Please provide name'],
        minlength: [3, 'Name cannot be less than 3 characters'],
        maxlength: [50, 'Name cannot be more than 50 characters']
    },
    email:{
        type:String,
        required: [true, 'Please provide email'],
        unique: true,
    },
    password:{
        type:String,
        required: [true, 'Please provide password'],
        minlength: [6, 'Password cannot be less than 6 characters'],
    },
    role:{
        type:String,
        enum: ['admin','user'], // enum is used to specify the values that can be assigned to the field
        // we used enum for role field because it makes our code more readable and we can easily check if the user is admin or user
        default: 'user', // default is used to specify the default value of the field if no value is provided
    }
})

module.exports = mongoose.model('User', UserSchema);