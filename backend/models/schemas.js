const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {model} = require('mongoose');

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
      },
    draftOutlines: {
      type: Map,
      of: String,
      required: true,
      default: {},
    },
    finalOutlines: {
      type: Map,
      of: String,
      required: true,
      default: {},
    }
});

const documentSchema = new Schema({
  _id: String, 
  data: Object,
  gaIndicators: {type:Array,required:true,default:[]},
  metadata: metadataSchema,
})

const metadataSchema = new Schema({
  instructorJustifications: {type:Array,of:commentSchema,required:true,default:[]},
  reviewerComments: {type:Array,of:commentSchema,required:true,default:[]}
})

const commentSchema = new Schema({
  username: {type:String, required:false, default: ''},
  commentText: {type:String,required:true},
  selectedText: {type:String,required:true},
  type:{type:String,enum: ['justification','comment']}
})

const editHistorySchema = new Schema ({
  userID: String,
  timeStamp: String,
  activity: String,
  docID: String
})

const editSchema = new Schema({
  id: String,
  time: Date,
  username: String,
  document: String
})

  //model creations
const User = mongoose.model('User', userSchema);
const Course = mongoose.model('Course',courseSchema);
const Document = mongoose.model('Document',documentSchema);
const EditHistory = mongoose.model('EditHistory', editHistorySchema);

//aggregate models
const mySchemas = {'User':User,'Course':Course, 'Document': Document, "EditHistory":EditHistory};

module.exports = mySchemas;
