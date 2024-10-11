import jwt from 'jsonwebtoken';
import { Request , Response , NextFunction } from 'express';
import dotenv from 'dotenv';
import { getEnvVar } from '../Functions/env_funcs';

dotenv.config();


exports.protect = (req : Request, res : Response, next : NextFunction ) => {
  let token = req.headers.authorization;

  if (!token || !token.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Not authorized' });
  }

  const jwtSecret = getEnvVar('JWT_SECRET');
  token = token.split(' ')[1]; // Extract token from Bearer
 
  try { 
    const decoded = jwt.verify(token, jwtSecret);
   // req.user  = decoded; // Set user data in request
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// exports.adminOnly = (req, res, next) => {
//   if (req.user.role !== 'admin') {
//     return res.status(403).json({ message: 'Access denied' });
//   }
//   next();
// };