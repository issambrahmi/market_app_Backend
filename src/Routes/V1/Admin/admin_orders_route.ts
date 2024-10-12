import { deleteOrder, getOrderItems, getOrders, searchForOrders, updateOrderItems, updateOrderStatus } from '../../../Contoller/orders_controller';
import {Router, Request , Response } from 'express';

const router = Router();

//////////////////////////// ORDERS ///////////////////////////////////

router.delete('/order' , (req : Request , res : Response) => { deleteOrder(req , res ) });
router.put('/orderStatus' , (req : Request , res : Response) => { updateOrderStatus(req , res ) });
router.put('/orderItems' , (req : Request , res : Response) => { updateOrderItems(req , res ) });
router.get('/order/:offSet' , (req : Request , res : Response) => { getOrders(req , res ) });
router.get('/orderItems' , (req : Request , res : Response) => { getOrderItems(req , res ) });
router.get('/orderSearch/:name' , (req : Request , res : Response) => { searchForOrders(req , res ) });


//////////////////////////// ORDERS ///////////////////////////////////

export default router;