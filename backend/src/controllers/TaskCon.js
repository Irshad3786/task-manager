import UserTaskmodel from "../dbmodels/UserTask.js"

export const Taskadd = async(req,res)=>{
    try {
        const {Email,Tittle,Description,Status,Projecttittle} = req.body
        
        const User = await UserTaskmodel.findOne({Email})

        if(!User){
            return res.status(500).json({message:"No User found at to add Task"})

        }else{
            console.log(Projecttittle.Tittle);

            const project = User.Projects.find(proj => proj.Tittle === Projecttittle.Tittle);

             if (!project) {
            return res.status(404).json({ message: "Project not found" });
            }

            project.Tasks.push({
            Tittle,
            Description,
            Status});
            await User.save();

            return res.status(200).json({message:"Added Task"})
        }
        
        
    } catch (error) {
        return res.status(500).json({error})
    }
}