import {Router, Request , Response } from 'express';
import { login } from '../../../Contoller/auth_controller';
import { clientHome } from '../../../Contoller/client_home_controller';
import ordersRoute from './client_orders_route'

const router = Router();

router.get('/login' , (req : Request , res : Response) => { login (req , res , 'client' )});
router.get('/home' ,  (req : Request , res : Response) => { clientHome (req , res )});

router.use('/orders' , ordersRoute);
