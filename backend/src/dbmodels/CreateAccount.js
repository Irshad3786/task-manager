import mongoose from "mongoose";

const CreateAccountSchema = new mongoose.Schema({
    Name:String,
    Email:String,
    Password:String,
    timestamp: {
        type: Date,
        default: Date.now
      }
})

const CreateAccountModel = mongoose.model("CreateAccount",CreateAccountSchema)

export default CreateAccountModel;
