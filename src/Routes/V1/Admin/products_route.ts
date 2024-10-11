import { addProduct, deleteProduct, getProducts, searchForProducts, updateProduct } from '../../../Contoller/products_controller';
import {Router, Request , Response } from 'express';

const router = Router();

//////////////////////////// PRODUCTS ///////////////////////////////////

router.post('/product' , (req : Request , res : Response) => { addProduct(req , res ) });
router.delete('/product' , (req : Request , res : Response) => { deleteProduct(req , res ) });
router.put('/product' , (req : Request , res : Response) => { updateProduct(req , res ) });
router.get('/product/:offSet' , (req : Request , res : Response) => { getProducts(req , res ) });
router.get('/productSearch/:name' , (req : Request , res : Response) => { searchForProducts(req , res ) });


//////////////////////////// PRODUCTS ///////////////////////////////////

export default router;