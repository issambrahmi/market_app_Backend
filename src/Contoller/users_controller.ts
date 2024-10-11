import { db } from '../db config/db'
import { Request , Response } from 'express';
import  bcrypt  from 'bcryptjs';
import { getUsersFromDB, searchForUsersFromDB } from '../Model/user_model';
import { error } from 'console';


export const addUser = async ( req : Request , res : Response , role : String): Promise<Response> => {
    const {email , password , username , phoneNumber , image}  = req.body;
  
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Please fill in all fields' });
    }
  
    try {
      var query: string = `SELECT * FROM ${role} WHERE email = ?`
      const [rows1]: any = await db.execute(query , [email]);
      
      if(rows1.length != 0){
          return res.status(500).json({message : 'user already excist'});
      }
      
      const salt: string = await bcrypt.genSalt(10);
      const hashedPassword: string = await bcrypt.hash(password, salt);
      console.log(hashedPassword);

      query = `INSERT INTO ${role} (username, email, password, phoneNumber, image) VALUES (?, ?, ?, ?, ?)`
      const [row2] : any = await db.execute(query , [username, email, hashedPassword, phoneNumber , image]
      );

     return res.status(200).json({Message : "user added succesfully" , userID : row2.insertId });
  
  } catch (err) {
     return res.status(500).json({ message: 'Database error', error: err });
  }
  }

  export const deleteUser = async (req: Request , res: Response , role: string): Promise<Response> => {
    const { id } = req.body;

    if(!id){
      return res.status(400).json({ message: 'Please fill in all fields' });
    }

    try {   
      const query = `DELETE FROM ${role} WHERE id = ?`
      await db.execute(query , [id]);
      return res.status(200).json({message : 'user had deleted successfully'});

    } catch (error) {
      return res.status(500).json({ message: 'Database error', error: error });
    }
  }

  export const updateUserData = async ( req : Request , res : Response , role : String): Promise<Response> => {   
    const { id, username , email , password , phoneNumber , image } = req.body;

    try {
      const query = `UPDATE ${role} SET username=? , email=? , password=? , phoneNumber=? , image=? WHERE id = ?`;
      await db.execute(query , [username , email, password , phoneNumber , image , id]);
      return res.status(200).json({message : "user updated"});

    } catch (error) {
      return res.status(500).json({ message: 'Database error', error: error });
    }
  }

  export const getUsers = async (req: Request , res: Response , role: string): Promise<Response> =>{
    const offSet = req.params.offset;
     try {
      const result = await getUsersFromDB(offSet , role);
      if(result === null){
        throw error('getUsersError');
      }
      return res.status(200).json({})
     } catch (error) {
      return res.status(500).json({ message: 'Database error', error: error });
     }
  }

  export const searchForUsers = async(req: Request , res: Response , role : string): Promise<Response> => {
    const username: string = req.params.username;
    if(!username){
      return res.status(400).json({ message: 'Please fill in all fields' });
    }
       try {
           const users = await searchForUsersFromDB(username , role );
           if(users === null){
              throw error;
           }
           return res.status(200).json({users : users});
       } catch (error) {
         return res.status(500).json({ message: 'Database error', error: error });      
       }
   }

  

  