import { addCategorie, deleteCategorie, getCategories, searchForCategorie, updateCategorie } from '../../../Contoller/categories_controller';
import {Router, Request , Response } from 'express';

const router = Router();

//////////////////////////// CATEGORIES ///////////////////////////////////

router.post('/categorie' , (req : Request , res : Response) => { addCategorie(req , res ) });
router.delete('/categorie' , (req : Request , res : Response) => { deleteCategorie(req , res ) });
router.put('/categorie' , (req : Request , res : Response) => { updateCategorie(req , res ) });
router.get('/categorie/:offSet' , (req : Request , res : Response) => { getCategories(req , res ) });
router.get('/categorieSearch/:name' , (req : Request , res : Response) => { searchForCategorie(req , res ) });


//////////////////////////// CATEGORIES ///////////////////////////////////

export default router;