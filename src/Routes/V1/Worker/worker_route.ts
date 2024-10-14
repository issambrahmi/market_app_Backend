import { Router , Request , Response } from "express";
import { login } from "../../../Contoller/auth_controller";
import order_route from './worker_order_route';

const router = Router();


router.get('/login' , (req : Request , res: Response) => { login(req , res , 'worker') });
router.use('/order' , order_route );