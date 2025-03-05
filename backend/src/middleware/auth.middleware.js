import jwt, { decode } from 'jsonwebtoken'
import User from "../models/user.model.js"
import dotenv from 'dotenv'
dotenv.config();

const JWT_key = process.env.JWT_SECRET
export const protectRoute = async (req,res,next) => {
try{
  const token = req.cookies.jwt;

    if(!token){
      return res.status(401).json({message: "unauthorized - no token provided"})
    }
    const decoded = jwt.verify(token, JWT_key)

    if (!decoded){
      return res.status(401).json({message: "unauthorized - invalid token"})
    };

    const user = await User.findById(decoded.userId).select('-password');

    if(!user){
      return res.status(404).json({message: 'User not found'});
    }

    req.user = user;

    next();
}catch(error){
  console.log('eroor in protectRoute middleware:', error.message);
    res.status(500).json({message: "internal server error"});
}
};
