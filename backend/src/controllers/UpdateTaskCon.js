import UserTaskmodel from "../dbmodels/UserTask.js"


export const UpdateTask =async(req,res)=>{
    const {_id,Description,Email,Projecttittle} = req.body
    
    try {

        const User = await UserTaskmodel.findOne({Email})

        const project = User.Projects.find(proj => proj.Tittle === Projecttittle.Tittle);

        if (!project) {
         return res.status(404).json({ message: "Project not found" });
        }else{
            const task = project.Tasks.find((task) => task._id.toString() === _id);

        if (!task) {
        return res.status(404).json({ message: "Task not found" });
        }

        task.Description = Description;

        await User.save();

        res.status(200).json({ message: "Updated successfully" });
        }

        
    } catch (error) {
        console.log(error); 
    }
}