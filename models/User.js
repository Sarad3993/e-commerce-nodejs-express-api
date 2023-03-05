const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

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
        validator:{
            validator: validator.isEmail, // we used validator package to validate the email field using the isEmail method provided by the validator package instead of using regex or validation method provided by mongoose as it is more readable and easy to understand
            message: 'Please provide a valid email'
        }
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

// Mongoose pre save hook
// we are using pre save hook to hash the password before saving the user to the database 

UserSchema.pre('save', async function(){
    const salt = await bcrypt.genSalt(10); // we are generating salt using the genSalt method provided by the bcrypt package
    this.password = await bcrypt.hash(this.password,salt); // we are hashing the password using the hash method provided by the bcrypt package 
    // this.password refers to the password field of the User document
})

// for comparing the password entered with the database password
UserSchema.methods.comparePassword = async function (enteredPassword){
    const isMatch = await bcrypt.compare(enteredPassword,this.password);
    // this.password refers to the password saved in the database and enteredPassword refers to the password entered by the user
    return isMatch;
}

module.exports = mongoose.model('User', UserSchema);