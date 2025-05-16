import UserTaskmodel from "../dbmodels/UserTask.js"

export const AllProjectControler =async(req,res)=>{
    const {Email} = req.body
    console.log(Email);
    
    try {
        const projecttasks = await UserTaskmodel.find({Email})
        res.status(200).json({message:"All Tasks" , data : projecttasks})

    } catch (error) {
        console.log("error at" , error);
        res.status(401).json(error);
    }
}