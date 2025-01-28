import { addProduct, deleteProduct, getProducts, searchForProducts, searchForProductsNames, updateProduct } from '../../../Contoller/products_controller';
import {Router, Request , Response } from 'express';

const router = Router();

//////////////////////////// PRODUCTS ///////////////////////////////////

router.post('/' , (req : Request , res : Response) => { addProduct(req , res ) });
router.delete('/' , (req : Request , res : Response) => { deleteProduct(req , res ) });
router.put('/' , (req : Request , res : Response) => { updateProduct(req , res ) });
router.get('/:offSet' , (req : Request , res : Response) => { getProducts(req , res ) });
router.get('/search/:name/:offset' , (req : Request , res : Response) => { searchForProducts(req , res ) });
router.get('/search/:name' , (req : Request , res : Response) => { searchForProductsNames(req , res ) });



//////////////////////////// PRODUCTS ///////////////////////////////////

export default router;