import CreateTaskmodel from "../dbmodels/Task.js";

export const DeleteTaskCon =async(req,res)=>{
    const {_id} = req.body
    try {
        await CreateTaskmodel.findByIdAndDelete({_id})
        res.status(200).json({message:"Task Deleted Successfully"})
    } catch (error) {
        console.log(error);
        
    }
}