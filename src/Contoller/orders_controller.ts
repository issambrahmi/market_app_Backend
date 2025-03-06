import { Request , Response } from 'express';
import { error } from 'console';
import { acceptOrderOnDB, addOrderToDB, deleteOrderFromDB, getOrderItemsFomDB, getOrdersFromDB, loadMoreOrdersFromDB, Order, OrderItems, searchOrderByIdOnDB, updateOrderOnDB } from '../Model/order_model';


export const addOrder = async(req: Request , res: Response): Promise<Response> => {

    const {orderData , items } = req.body;

   if(!orderData.client_id || !orderData.total_price || !items){
     return res.status(400).json({message : 'please enter all fields'});
   }

    const order : Order = {
        clientId: orderData.client_id,
        totalePrice: orderData.total_price,
     };

     const itemsList: [OrderItems] =  items.map((item: any) =>({ 
        productId : item.product_id ,
        type : item.type,
        qnt : item.qnt
    }));

       try {
           const result = await addOrderToDB( order, itemsList);
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

     if(!orderId){
      return res.status(400).json({ message: 'Please fill in all fields' });
     }
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

       try {
           const result = await getOrdersFromDB();
           if(result === null){
              throw error;
           }
           console.log(result);
           return res.status(200).json({message  : 'success' , orders : result});
       } catch (error) {
         return res.status(500).json({ message: 'Database error', error: error });      
       }
   }

   
   export const loadMoreOrders = async(req: Request , res: Response): Promise<Response> => {
       
    const isAccepted = req.params.isAccepted;
    const offSet  = req.params.offset;

    if(isAccepted || !offSet){
      return res.status(400).json({ message: 'Please fill in all fields' });
    }

    try {
        const result = await loadMoreOrdersFromDB(isAccepted , offSet);
        if(result === null){
           throw error;
        }
        console.log(result);
        return res.status(200).json({message  : 'success' , orders : result});
    } catch (error) {
      return res.status(500).json({ message: 'Database error', error: error });      
    }
}
   
   export const getOrderItems = async(req: Request , res: Response): Promise<Response> => {

    const  orderId = req.params.orderId;

    if(!orderId){
      return res.status(400).json({ message: 'Please fill in all fields' });
    }

       try {
           const result = await getOrderItemsFomDB(orderId);
           if(result === null){
              throw error;
           }
           return res.status(200).json({message  : 'success' , items : result});
       } catch (error) {
         return res.status(500).json({ message: 'Database error', error: error });      
       }
   }

   export const searchForOrders = async(req: Request , res: Response): Promise<Response> => {

    
    const id  = req.params.id;

    if(!id ){
      return res.status(400).json({ message: 'Please fill in all fields xfg' });
    }

       try {
           const result = await searchOrderByIdOnDB(id);
           if(result === null){
              throw error;
           }
           return res.status(200).json({message  : 'success' , orders : result});
       } catch (error) {
         return res.status(500).json({ message: 'Database error', error: error });      
       }
   }

   export const acceptOrder = async (req:Request , res:Response) =>{
    const {orderId , workerId} = req.body;
    try {
      const result = await acceptOrderOnDB(orderId , workerId);
      if(!result){
        throw error;
      }
      return res.status(200).json({message  : 'order accepted'});

    } catch (error) {
      return res.status(500).json({ message: 'Database error', error: error });      
    }
   }




   