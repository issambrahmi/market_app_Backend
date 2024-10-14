import { Router , Request , Response } from "express";
import { getOrderItems, getOrders, updateOrderStatus } from "../../../Contoller/orders_controller";

const router = Router();

router.put('/' , (req: Request , res: Response) => { updateOrderStatus(req , res) });
router.get('/orders' , (req: Request , res: Response) => { getOrders(req , res) });
router.get('/orderItems' , (req: Request , res: Response) => { getOrderItems(req , res) });

export default router;