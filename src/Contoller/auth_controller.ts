import { db } from '../db config/db';
import { Request , Response } from 'express';
import  bcrypt  from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import {User} from '../Model/user_model'
import {getEnvVar} from '../Functions/env_funcs'

dotenv.config();


export const login = async (req: Request , res: Response , role: string): Promise<Response> => {
    const { email, password } = req.body;

    if(!email || !password){
        return res.status(400).json({ message: 'Please fill in all fields' });
    }

    try {
        const query = `SELECT * FROM ${role} WHERE email = ?`
        const [rows]: any = await db.execute(query, [email]);

        if(rows.length === 0){
           return res.status(400).json({ message: 'Invalid credentials' });
        }
        const user = rows[0] as User;
        
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
          return res.status(400).json({message : 'wrong password'})
        }

        const jwtSecret = getEnvVar('JWT_SECRET');
        const token = jwt.sign(
            { id: user.id },
            jwtSecret,
            { expiresIn: '1h' }
          );
      
      return  res.status(200).json({ token });

    } catch (err) {
     return res.status(500).json({ message: 'Database error', error: err });
    }
}


