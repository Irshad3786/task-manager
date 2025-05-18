
import CreateAccountModel from "../dbmodels/CreateAccount.js";
import jwt from 'jsonwebtoken';

export const SignInController = async(req,res)=>{
    try {

        const {Email,Password} = req.body

        const user = await CreateAccountModel.findOne({Email})

        if(!user){
            return res.status(404).json({message:"No User Found"})
        }
        
        if(user.Password != Password){
            return res.status(401).json({message:"Invalid Password"})
        }

        const token = jwt.sign({id:user.id,email:user.Email},process.env.JWTKEY,{expiresIn:'11h'})    
        
        res.cookie("Authtoken",token,{httpOnly: true,
            secure: process.env.NODE_ENV === "production", 
            sameSite: "None", 
            maxAge: 24 * 60 * 60 * 1000 })
        return res.status(200).json({message:"Login Successful"})

    } catch (error) {
        console.log("Error at", error);
        
    }
}