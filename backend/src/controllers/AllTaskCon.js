import UserTaskmodel from "../dbmodels/UserTask.js";

export const AllTasksControler =async(req,res)=>{
    const {Email,Projecttittle} = req.body
    try {
        const User = await UserTaskmodel.findOne({Email})

        const project = User.Projects.find(proj => proj.Tittle === Projecttittle.Tittle);

        if (!project) {
         return res.status(404).json({ message: "Project not found" });
        }else{
            return res.status(200).json(project.Tasks);
        }
        

    } catch (error) {
        console.log("error at" , error);
        res.status(401).json(error);
    }
}