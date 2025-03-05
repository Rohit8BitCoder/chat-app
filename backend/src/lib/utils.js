
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secretKey = process.env.SECRET_KEY;

if (!secretKey) {
  throw new Error("SECRET_KEY is not defined in the environment variables.");
}

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, secretKey, { 
    expiresIn: '7d', 
    algorithm: 'HS256' 
  });

  res.cookie('jwt', token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production' // Only secure in production
  });

  return token;
};

