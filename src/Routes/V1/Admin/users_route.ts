import { addUser, deleteUser, getUsers, searchForUsers, updateUserData } from '../../../Contoller/users_controller';
import {Router, Request , Response } from 'express';

const router = Router();

//////////////////////////// USERS /////////////////////////////////////
// client 
router.post('/client' , (req : Request , res : Response) => { addUser(req , res , 'client') });
router.delete('/client' , (req: Request , res : Response) => { deleteUser(req , res , 'client') });
router.put('/client' , (req: Request , res : Response) => { updateUserData(req , res , 'client') });
router.get('/client/:offSet' , (req: Request , res : Response ) => { getUsers(req , res , 'client') });
router.get('/clientSearch/:username' , (req: Request , res : Response ) => { searchForUsers(req , res , 'client') });



// worker
router.post('/worker' , (req : Request , res : Response) => { addUser(req , res , 'worker') });
router.delete('/worker' , (req: Request , res : Response) => { deleteUser(req , res , 'worker') });
router.put('/worker' , (req: Request , res : Response) => { updateUserData(req , res , 'worker') });
router.get('/worker/:offSet' , (req: Request , res : Response ) => { getUsers(req , res , 'worker') });
router.get('/workertSearch/:username' , (req: Request , res : Response ) => { searchForUsers(req , res , 'Worker') });

//////////////////////////// USERS /////////////////////////////////////

export default router;