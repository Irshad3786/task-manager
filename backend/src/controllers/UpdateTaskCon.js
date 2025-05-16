import CreateTaskmodel from '../dbmodels/Task.js';


export const UpdateTask =async(req,res)=>{
    const {_id,Description} = req.body
    
    try {
        await CreateTaskmodel.findByIdAndUpdate(_id,{Description:Description},{ new: true })
        res.status(200).json({message:"updated successfully"})
    } catch (error) {
        console.log(error); 
    }
}