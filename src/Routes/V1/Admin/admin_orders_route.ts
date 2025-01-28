import { acceptOrder, deleteOrder, getOrderItems, getOrders, searchForOrders, updateOrderItems, updateOrderStatus } from '../../../Contoller/orders_controller';
import {Router, Request , Response } from 'express';

const router = Router();

//////////////////////////// ORDERS ///////////////////////////////////

router.delete('/' , (req : Request , res : Response) => { deleteOrder(req , res ) });
router.post('/' , (req : Request , res : Response) => { acceptOrder(req , res ) });
router.put('/status' , (req : Request , res : Response) => { updateOrderStatus(req , res ) });
router.put('/items' , (req : Request , res : Response) => { updateOrderItems(req , res ) });
router.get('/' , (req : Request , res : Response) => { getOrders(req , res ) });
router.get('/items/:orderId' , (req : Request , res : Response) => { getOrderItems(req , res ) });
router.get('/search/:name' , (req : Request , res : Response) => { searchForOrders(req , res ) });


//////////////////////////// ORDERS ///////////////////////////////////


export default router;