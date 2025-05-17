import mongoose from "mongoose";

const UserTask = new mongoose.Schema({
  Email: {
    type: String,
    required: true,
  },
  Projects: [ {Tittle: {
    type: String,
    required: true,
  },Description: {
    type: String,
    required: true,
  },timestamp: {
    type: Date,
    default: Date.now,
  },
  Tasks:[
    {
        Tittle: {
        type: String,
        required: true,
        },
        Description: {
        type: String,
        required: true,
        },
        Status:{
        type: String,
        required: true,
        },
        timestamp: {
        type: Date,
        default: Date.now,
        },
    }
  ]
} ]
  
});


const UserTaskmodel =  mongoose.model("UserTask",UserTask)

export default UserTaskmodel;