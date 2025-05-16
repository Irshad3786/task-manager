import jwt from 'jsonwebtoken';

export const VerifyToken = async (req, res) => {
    try {
        const token = req.cookies.Authtoken;
        if (!token) {
            return res.status(401).json({ message: "No Token Found" });
        }

        const decode = jwt.verify(token, process.env.JWTKEY);
        return res.json({message:"valid user",data:decode})

    } catch (error) {
        console.error("Error during token verification:", error.message);
        res.status(401).json({ message: "Invalid or Expired Token" });
    }
};
