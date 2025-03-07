import {Router, Request , Response } from 'express';
import { login } from '../../../Contoller/auth_controller';
import { clientHome } from '../../../Contoller/client_home_controller';
import ordersRoute from './client_orders_route'
import { addProductToFavorite, deleteProductToFavorite, getCategorieProducts, getProducts, searchForProducts, searchForProductsNames } from '../../../Contoller/products_controller';
import { getCategories } from '../../../Contoller/categories_controller';

const router = Router();

router.get('/login' , (req : Request , res : Response) => { login (req , res , 'client' )});
//router.get('/home' ,  (req : Request , res : Response) => { clientHome (req , res )});
router.get('/categories' ,  (req : Request , res : Response) => { getCategories (req , res )});


router.get('/products/:offset' ,  (req : Request , res : Response) => { getProducts (req , res , true )});
router.get('/products/categorie/:categorieId/:offset' ,  (req : Request , res : Response) => { getCategorieProducts (req , res )});
router.get('/products/search/name/:name/:offset' ,  (req : Request , res : Response) => { searchForProductsNames (req , res )});
router.get('/products/search/:name/:offset' ,  (req : Request , res : Response) => { searchForProducts (req , res )});
router.post('/products/favorite' ,  (req : Request , res : Response) => { addProductToFavorite (req , res )});
router.delete('/products/favorite' ,  (req : Request , res : Response) => { deleteProductToFavorite (req , res )});



router.use('/orders' , ordersRoute);


export default router;

