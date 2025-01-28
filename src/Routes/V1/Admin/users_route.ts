import { addUser, deleteUser, getUsers, getUsersWithoutOffset, searchForUsers, updateUserData } from '../../../Contoller/users_controller';
import {Router, Request , Response } from 'express';

const router = Router();

//////////////////////////// USERS /////////////////////////////////////
// client 
router.post('/client' , (req : Request , res : Response) => { addUser(req , res , 'clients') });
router.delete('/client' , (req: Request , res : Response) => { deleteUser(req , res , 'clients') });
router.put('/client' , (req: Request , res : Response) => { updateUserData(req , res , 'clients') });
router.get('/client/:offSet' , (req: Request , res : Response ) => { getUsers(req , res , 'clients') });
router.get('/client/search/:username' , (req: Request , res : Response ) => { searchForUsers(req , res , 'clients') });



// worker
router.post('/worker' , (req : Request , res : Response) => { addUser(req , res , 'workers') });
router.delete('/worker' , (req: Request , res : Response) => { deleteUser(req , res , 'workers') });
router.put('/worker' , (req: Request , res : Response) => { updateUserData(req , res , 'workers') });
router.get('/worker/:offSet' , (req: Request , res : Response ) => { getUsers(req , res , 'workers') });
router.get('/worker' , (req: Request , res : Response ) => { getUsersWithoutOffset(req , res , 'workers') });
router.get('/worker/search/:username' , (req: Request , res : Response ) => { searchForUsers(req , res , 'Workers') });

//////////////////////////// USERS /////////////////////////////////////

export default router;