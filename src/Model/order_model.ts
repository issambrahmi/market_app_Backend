import { query } from 'express';
import {db} from '../db config/db';


export interface Order {
  id: number , 
  clientId : number , 
  wordkerId : number , 
  date : string ,
  totalePrice : number ,
  status : 'waiting' | 'preparing' | 'finished' ,
  isAccepted : boolean
}

export interface OrderItems {
  id : number ,
  orderID : number ,
  productId : number ,
  type : 'detaille' | 'gros' | 'super_gros'
  qnt : number ,
}

export const addOrderToDB = async (Order : Order , items : OrderItems[]): Promise<Order | null> =>{

     const query1 = `INSERT INTO orders (client_id , total_price ) VALUES (?,?)`;
     const query2 = `INSERT INTO order_items (order_id , product_id , qnt , type ) VALUES (?,?,?,?)`;
 
     const connection = await db.getConnection();
    try {
      await connection.beginTransaction(); // start

      const [row1]: any = await db.execute(query1 , [Order.clientId , Order.totalePrice]);
      const orderId = row1.insertId;

      for(let item of items){
        await db.execute(query2 , [orderId , item.productId , item.qnt , item.type]);
      }

      await connection.commit(); // success
     
      return Order;
    } catch (error) {

        await connection.rollback(); // delete all changes
        console.log('err adding Order ' + error);
        return null;
        
    } finally{
      connection.release(); // end
    }
}

export const deleteOrderFromDB = async (OrderId : string): Promise< boolean > =>{

    const query = `DELETE FROM orders WHERE id = ?`;
   try {
     await db.execute(query , [OrderId]);
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

  const query = `UPDATE order items SET  total_price = ?`;
  const query2 = `INSERT INTO order items ( qnt , type ) VALUES ?`;
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

export const getOrdersFromDB = async (): Promise<[Order] | null> =>{

   const query = `(SELECT orders.* , clients.username AS client_name , workers.username AS worker_name
                  FROM orders INNER JOIN clients
                  ON orders.client_id = clients.id
                  LEFT JOIN workers
                  ON orders.worker_id = workers.id
                  WHERE is_accepted=1
                  LIMIT 30)
                  UNION
                  (SELECT orders.* , clients.username AS client_name , workers.username AS worker_name
                  FROM orders INNER JOIN clients
                  ON orders.client_id = clients.id
                  LEFT JOIN workers
                  ON orders.worker_id = workers.id
                  WHERE is_accepted=0
                  LIMIT 30)
                  `;  
   try {
    const [rows]: any =  await db.execute(query);
     return rows;
   } catch (error) {
       console.log('err getting Orders ' + error);
       return null;
   }
}

export const loadMoreOrdersFromDB = async (isAccepted: any , offSet: any): Promise<[Order] | null> =>{

  const query = `SELECT orders.* , clients.username AS client_name , workers.username AS worker_name
                 FROM orders INNER JOIN clients
                 ON orders.client_id = clients.id
                 LEFT JOIN workers
                 ON orders.worker_id = workers.id
                 WHERE is_accepted=?
                 LIMIT 30 OFFSET ?
                 `;  
  try {
   const [rows]: any =  await db.execute(query , [isAccepted , offSet]);
    return rows;
  } catch (error) {
      console.log('err getting Orders ' + error);
      return null;
  }
}

export const getOrderItemsFomDB = async (orderId : string): Promise<[OrderItems] | null> =>{

    const query = `SELECT order_items.*,
                   products.*
                   FROM order_items
                   INNER JOIN products
                   ON order_items.product_id = products.id
                   WHERE order_items.order_id = ?`;
   try {
    const [rows]: any =  await db.execute(query , [orderId]);
     return rows;
   } catch (error) {
       console.log('err getting OrderItems ' + error);
       return null;
   }
}

export const searchOrderByIdOnDB = async (orderId: string): Promise<Order | null> =>{

    const query = `SELECT orders.*,clients.username AS client_name, workers.username AS worker_name
                  FROM orders
                  INNER JOIN clients
                  ON orders.client_id = clients.id
                  LEFT JOIN workers
                  ON orders.worker_id = workers.id
                  WHERE orders.id = ?`;
   try {

    const [rows]: any =  await db.execute(query , [orderId]);
     return rows;
   } catch (error) {
       console.log('err search Order by Id' + error);
       return null;
   }
}

export const acceptOrderOnDB = async (orderId : number , workerId : number): Promise<boolean> =>{

  const query = `UPDATE orders SET worker_id=? , is_accepted=1 WHERE id=?`;
  
 try {
  await db.execute(query , [workerId , orderId]);
   return true;
 } catch (error) {
     console.log('err accept Order' + error);
     return false;
 }
}






