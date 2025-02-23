
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secretKey = process.env.SECRET_KEY;

if (!secretKey) {
  throw new Error("SECRET_KEY is not defined in the environment variables.");
}

export const generateToken = (userId, res) => {
  const token =  jwt.sign({userId}, secretKey, { 
    expiresIn: '7d', 
    algorithm: 'HS256' 
  });

  res.cookie('jwt',token,{
    maxAge: 7*24*60*1000,
    httpOnly: true,
    sameSite: 'strict'
  })

  return token;
}

