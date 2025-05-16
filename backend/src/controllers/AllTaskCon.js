import CreateTaskmodel from '../dbmodels/Task.js';

export const AllTasksControler =async(req,res)=>{
    const {Email} = req.body
    try {
        const tasks = await CreateTaskmodel.find({Email})
        res.status(200).json({message:"All Tasks" , data : tasks})

    } catch (error) {
        console.log("error at" , error);
        res.status(401).json(error);
    }
}