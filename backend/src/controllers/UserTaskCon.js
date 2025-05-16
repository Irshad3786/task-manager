import UserTaskmodel from "../dbmodels/UserTask.js";

export const AddProject = async (req, res) => {
  try {
    const { Email, Tittle, Description } = req.body;
   

    let user = await UserTaskmodel.findOne({ Email });

    if (user) {
      
      if (user.Projects.length >= 4) {
        return res.status(400).json({ message: "Project limit exceeded" });
      }

      
      user.Projects.push({
        Tittle,
        Description,
      });

      await user.save(); 

      return res.status(200).json({ message: "Added Project to existing user", data: user });
    } else {
     
      const newUser = await UserTaskmodel.create({
        Email,
        Projects: [
          {
            Tittle,
            Description,
            Tasks: [],
          },
        ],
      });

      return res.status(200).json({ message: "Created new user and project", data: newUser });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};
