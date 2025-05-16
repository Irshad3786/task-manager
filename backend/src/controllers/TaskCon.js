import CreateTaskmodel from "../dbmodels/Task.js";

export const Taskadd = async(req,res)=>{
    try {
        const {Email,Tittle,Description} = req.body
        
        const newTask = await CreateTaskmodel.create({Email,Tittle,Description})
        
        return res.status(200).json({message:"Added Task",data: newTask})
    } catch (error) {
        return res.status(500).json({error})
    }
}