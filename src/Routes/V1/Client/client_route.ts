import {Router, Request , Response } from 'express';
import { login } from '../../../Contoller/auth_controller';
import { clientHome } from '../../../Contoller/client_home_controller';
import ordersRoute from './client_orders_route'
import { addProductToFavorite, deleteProductToFavorite, getProducts } from '../../../Contoller/products_controller';

const router = Router();

router.get('/login' , (req : Request , res : Response) => { login (req , res , 'client' )});
router.get('/home' ,  (req : Request , res : Response) => { clientHome (req , res )});

router.get('/products/:offset' ,  (req : Request , res : Response) => { getProducts (req , res , true )});
router.post('/products/favorite' ,  (req : Request , res : Response) => { addProductToFavorite (req , res )});
router.delete('/products/favorite' ,  (req : Request , res : Response) => { deleteProductToFavorite (req , res )});


router.use('/orders' , ordersRoute);


export default router;

