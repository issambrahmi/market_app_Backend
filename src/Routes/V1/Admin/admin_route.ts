
import { login } from '../../../Contoller/auth_controller';
import {Router, Request , Response } from 'express';
import usersRoute from './users_route';
import categorieRoute from './categories_route';
import productRoute from './products_route'
import orderRoute from './admin_orders_route'

const router = Router();


router.post('/login' , (req : Request , res : Response) => {
    login(req , res , 'admin')
});

router.use('/users' , usersRoute);
router.use('/categories' , categorieRoute );
router.use('/products' , productRoute);
router.use('/orders' , orderRoute);


export default router


