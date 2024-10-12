import {db} from '../db config/db';


export interface Order {
  id: number , 
  clientId : number , 
  date : string ,
  totalePrice : number ,
  status : 'waiting' | 'preparing' | 'finished' ,
}

export interface OrderItems {
  id : number ,
  orderID : number ,
  productId : number ,
  type : 'detaille' | 'gros' | 'super gros'
  qnt : number ,
}

export const addOrderToDB = async (Order : Order , items : [OrderItems]): Promise<Order | null> =>{

     const query = `INSERT INTO orders (client_id , total_price , status ) VALUES (?,?,?)`;
     const query2 = `INSERT INTO orderItems (order_id , product_id , qnt , type ) VALUES ?`;
     const itemsValues = items.map((item) => [
        item.orderID ,
        item.productId , 
        item.qnt , 
        item.type ,
     ]); 

    try {

      const [row]: any = await db.execute(query , [Order.clientId , Order.totalePrice , Order.status]);
      await db.execute(query2 , [itemsValues]);  
      Order.id = row.insertId;
      return Order;
    } catch (error) {
        console.log('err adding Order ' + error);
        return null;
    }
}

export const deleteOrderFromDB = async (OrderId : string): Promise< boolean > =>{

    const query = `DELETE FROM orders WHERE id = ?`;
    const query2 = `DELETE FROM orderItems WHERE order_id = ?`
   try {
     await db.execute(query , [OrderId]);
     await db.execute(query2 , [OrderId]);
     return true;
   } catch (error) {
       console.log('err deleting Order ' + error);
       return false;
   }
}

export const updateOrderStatusOnDB = async (status : string): Promise<boolean> =>{

    const query = `UPDATE orders SET status = ?`;
   try {

     await db.execute(query , [status]);
     return true;
   } catch (error) {
       console.log('err updating Order status ' + error);
       return false;
   }
}


export const updateOrderOnDB = async ( items : [OrderItems]): Promise<boolean> =>{

  const query = `UPDATE orderItems SET  total_price = ?`;
  const query2 = `INSERT INTO orderItems ( qnt , type ) VALUES ?`;
  const itemsValues = items.map((item) => [
    item.qnt , 
    item.type ,
 ]); 
 try {

   await db.execute(query , [itemsValues]);
   return true;
 } catch (error) {
     console.log('err updating Order ' + error);
     return false;
 }
}

export const getOrdersFromDB = async (offSet : string ): Promise<[Order] | null> =>{

    const query = `SELECT * FROM orders LIMIT 16 OFFSET ${offSet} `;
   try {

    const [rows]: any =  await db.execute(query);
     return rows;
   } catch (error) {
       console.log('err getting Orders ' + error);
       return null;
   }
}

export const getOrderItemsFomDB = async (offSet : string , orderId : string): Promise<[OrderItems] | null> =>{

    const query = `SELECT * FROM orderItems WHERE order_id = ? LIMIT 15 OFFSET ${offSet}`;
   try {

    const [rows]: any =  await db.execute(query , [orderId]);
     return rows;
   } catch (error) {
       console.log('err getting OrderItems ' + error);
       return null;
   }
}

export const searchOrderByIdOnDB = async (orderId : number): Promise<Order | null> =>{

    const query = `SELECT * FROM orders WHERE id = ?`;
   try {

    const [rows]: any =  await db.execute(query , [orderId]);
     return rows;
   } catch (error) {
       console.log('err search Order by Id' + error);
       return null;
   }
}





