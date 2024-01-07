const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },  
   
    email:{
        type:String,
        required:true,
        unique: true
    },
    phone:{
        type:Number,
        required:true   
    },
    password:{
        type:String,
        required:true
    },
    cpassword:{
        type:String,
        required:true
    }


})

employeeSchema.pre("save", async function(next) {
    console.log(`The current password is ${this.password}`);
    next();
})

//Now we need to create the collections

const  register = new mongoose.model("Register", employeeSchema)

module.exports = register;