import CreateAccountModel from '../dbmodels/CreateAccount.js';



export const CreateAccountController = async (req,res)=>{
    try {
        const {Name,Email,Password} = req.body
        const FindEmail = await CreateAccountModel.findOne({Email:Email.toLowerCase()})
        if(FindEmail == null){
            await CreateAccountModel.create({Name,Email:Email.toLowerCase(),Password})
            return res.status(201).json("Successfully Created")
            
        }else{
            return res.status(409).json("Email Already Exists")
        }
    } catch (error) {
        console.log("Error at" , error);
        
    }
    
}

