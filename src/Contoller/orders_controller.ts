import { Request , Response } from 'express';
import { error } from 'console';
import { addOrderToDB, deleteOrderFromDB, getOrderItemsFomDB, getOrdersFromDB, Order, OrderItems, updateOrderOnDB } from '../Model/order_model';

export const addOrder = async(req: Request , res: Response): Promise<Response> => {

    const {orderData , items } = req.body;
    const order : Order = {
        id: 0,
        clientId: orderData.client_id,
        date: '',
        totalePrice: orderData.total_price,
        status: 'waiting'
     };

     const itemsList: [OrderItems] =  items.map((item: any) =>({ 
        id : item.id ,
        orderID : item.order_id ,
        productId : item.product_id ,
        type : item.type,
        qnt : item.qnt
    }));

       try {
           const result = await addOrderToDB( order , itemsList);
           if(result === null){
              throw error;
           }
           return res.status(200).json({message  : 'order added' , order : result});
       } catch (error) {
         return res.status(500).json({ message: 'Database error', error: error });      
       }
   }

   export const updateOrderItems = async(req: Request , res: Response): Promise<Response> => {

    const { items } = req.body;

     const itemsList: [OrderItems] =  items.map((item: any) =>({ 
        id : '' ,
        orderID : '' ,
        productId : '' ,
        type : item.type,
        qnt : item.qnt
    }));

       try {
           const result = await updateOrderOnDB( itemsList);
           if(!result){
              throw error;
           }
           return res.status(200).json({message  : 'items updated'});
       } catch (error) {
         return res.status(500).json({ message: 'Database error', error: error });      
       }
   }

   export const updateOrderStatus = async(req: Request , res: Response): Promise<Response> => {

    const { status } = req.body;
       try {
           const result = await updateOrderOnDB( status);
           if(!result){
              throw error;
           }
           return res.status(200).json({message  : 'status updated'});
       } catch (error) {
         return res.status(500).json({ message: 'Database error', error: error });      
       }
   }

   export const deleteOrder = async(req: Request , res: Response): Promise<Response> => {

    const { orderId } = req.body;
       try {
           const result = await deleteOrderFromDB(orderId);
           if(!result){
              throw error;
           }
           return res.status(200).json({message  : 'order deleted'});
       } catch (error) {
         return res.status(500).json({ message: 'Database error', error: error });      
       }
   }

   export const getOrders = async(req: Request , res: Response): Promise<Response> => {

    const  offSet: string = req.params.offSet;
       try {
           const result = await getOrdersFromDB(offSet);
           if(result === null){
              throw error;
           }
           return res.status(200).json({message  : 'success' , orders : result});
       } catch (error) {
         return res.status(500).json({ message: 'Database error', error: error });      
       }
   }

   
   export const getOrderItems = async(req: Request , res: Response): Promise<Response> => {

    const  orderId : string= req.params.orderId;
    const  offSet : string= req.params.offSet;

       try {
           const result = await getOrderItemsFomDB(orderId , offSet);
           if(result === null){
              throw error;
           }
           return res.status(200).json({message  : 'success' , items : result});
       } catch (error) {
         return res.status(500).json({ message: 'Database error', error: error });      
       }
   }

   export const searchForOrders = async(req: Request , res: Response): Promise<Response> => {

    const offSet : string = req.body;
       try {
           const result = await getOrdersFromDB(offSet);
           if(result === null){
              throw error;
           }
           return res.status(200).json({message  : 'success' , orders : result});
       } catch (error) {
         return res.status(500).json({ message: 'Database error', error: error });      
       }
   }


   