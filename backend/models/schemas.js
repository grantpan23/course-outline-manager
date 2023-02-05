const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//schema creations
const userSchema = new Schema({
    email: {type:String, unique:true, required:true},
    password: {type:String, default:'changeme', required:true},
    username: {type:String, required:true, unique:true},
    role: {
        type:String, 
        enum: ['instructor', 'reviewer', 'admin'],
        required:true
    },
    firstName: {type:String,required:true},
    lastName: {type:String,required:true},
    coursesTaught: {
      type:Array,
      of: String,
      required:false
    }
})

const courseSchema = new Schema({
    name:{type:String,required:true},
    code:{type:String,required:true,unique:true},
    faculty:{type:String,required:true},
    instructors: {
        type:Array,
        of: String,
        required: false,
        default:[]
      }
});

  //model creations
const User = mongoose.model('User', userSchema);
const Course = mongoose.model('Course',courseSchema);

//aggregate models
const mySchemas = {'User':User,'Course':Course};

module.exports = mySchemas;
