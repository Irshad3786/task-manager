import mongoose from "mongoose";

const CreateTask = new mongoose.Schema({
  Email: {
    type: String,
    required: true,
  },
  Tittle: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});


const CreateTaskmodel =  mongoose.model("CreateTask",CreateTask)

export default CreateTaskmodel;