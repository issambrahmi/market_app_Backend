import { addCategorie, deleteCategorie, getCategories, searchForCategorie, updateCategorie } from '../../../Contoller/categories_controller';
import {Router, Request , Response } from 'express';

const router = Router();

//////////////////////////// CATEGORIES ///////////////////////////////////

router.post('/' , (req : Request , res : Response) => { addCategorie(req , res ) });
router.delete('/' , (req : Request , res : Response) => { deleteCategorie(req , res ) });
router.put('/' , (req : Request , res : Response) => { updateCategorie(req , res ) });
router.get('/' , (req : Request , res : Response) => { getCategories(req , res ) });
router.get('/search/:name' , (req : Request , res : Response) => { searchForCategorie(req , res ) });


//////////////////////////// CATEGORIES ///////////////////////////////////

export default router;