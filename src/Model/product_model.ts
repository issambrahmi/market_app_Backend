import { db } from "../db config/db";

export interface Product {
    id: number , 
    name: string , 
    categorieId: number ,
    image: string ,
    priceD : number ,
    priceG : number,
    priceSG : number,
    minQntG: number,
    minQntSG: number,
}

export const addProductToDB  = async (product : Product): Promise<Product | null> => {
    try {
      const query = `INSERT INTO products (name , categorie_id , image , price_d , price_g , price_sg , min_qnt_g , min_qnt_sg) VALUES (?,?,?,?,?,?,?,?)`;
      const [rows]: any = await db.execute(query , [product.name , product.categorieId , product.image , product.priceD ,
         product.priceG , product.priceSG , product.minQntG , product.minQntSG]);
         product.id =  rows.insertId;
         return product;
  
    } catch (error) {
      console.log('err addProduct' + error);
      return null;
    }
  }
  
  export const deleteProductFromDB  = async (id : string): Promise<boolean> => {
    try {
      const query = `DELETE FROM products WHERE id = ?`;
      await db.execute(query , [id]);
      return true ;
  
    } catch (error) {
      console.log('err deleteProduct' + error);
      return false;
    }
  }
  
  export const updateProductOnDB = async (product : Product): Promise<Product | null> => {
    const data: (string | number) [] = []; 

    try {
       var query = `UPDATE products SET`;

       if(product.name){
         data.push(product.name);
         query += `name = ?, `;
       }
       if(product.priceD){
        data.push(product.priceD);
        query += `price_d = ?, `;
       }
       if(product.priceG){
        data.push(product.priceG);
        query += `price_sg = ?, `;
       }
       if(product.priceSG){
        data.push(product.priceSG);
        query += `price_sg = ?, `;
       }
       if(product.minQntG){
        data.push(product.minQntG);
        query += `min_qnt_g = ?, `;
       }
       if(product.minQntSG){
        data.push(product.minQntSG);
        query += `min_qnt_sg = ?, `;
       }

       query = query.slice(0 , -2);
       query += `WHERE id = ?`;
       data.push(product.id);
       
      const [rows]: any = await db.execute(query , data);
      return rows as Product ;
  
    } catch (error) {
      console.log('err updateProduct' + error);
      return null;
    }
  }
  
  export const getProductsFromDB  = async (offSet : string): Promise<[Product] | null> => {

    const query = `SELECT products.* , categories.name AS categorie_name 
    FROM products 
    JOIN categories ON products.categorie_id = categories.id
    LIMIT 16
    OFFSET ?`;
    
      try {
        const [rows]: any = await db.execute(query , [offSet]);
        return rows;
  
      } catch (error) {
        console.log('err getproduct' + error);
        return null;
      }
    }

    export const searchForProductFromDB  = async (name : string ): Promise<[Product] | null> => {
     
      const query = `SELECT products.* , categories.name AS categorie_name 
         FROM products 
         JOIN categories ON products.categorie_id = categories.id
         WHERE products.name LIKE ? 
         LIMIT 16`;

      try {
        const [rows]: any = await db.execute(query , [`%${name}%`]);
        return rows;
  
      } catch (error) {
        console.log('err getproduct' + error);
        return null;
      }
    }
