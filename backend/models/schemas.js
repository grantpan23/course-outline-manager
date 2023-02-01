const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const instructorSchema = new Schema({
    email: {type:String, required:true},
    firstName: {type:String, required:true},
    lastName: {type:String, required:true}
});

const courseSchema = new Schema({

});

const Instructors = mongoose.model('instructors', instructorSchema, 'instructors');

const mySchemas = {'Instructors':Instructors};

module.exports = mySchemas;
