import { db } from "../db config/db";

export interface Product {
    id: string , 
    name: string , 
    categorieId: string ,
    image: string ,
    priceD : number ,
    priceG : number,
    priceSG : number,
    minQntG: number,
    minQntSG: number,
}

export const addProductToDB  = async (
    product : Product): Promise<Product | null> => {
    try {
      const query = `INSERT INTO product (name , categorie , priceD , priceG , priceSG , minQntG , minQntSG) VALUES (?,?,?,?,?,?,?)`;
      const [rows]: any = await db.execute(query , [product.name , product.categorieId , product.priceD ,
         product.priceG , product.priceSG , product.minQntG , product.minQntSG]);
      return rows as Product ;
  
    } catch (error) {
      console.log('err addProduct' + error);
      return null;
    }
  }
  
  export const deleteProductFromDB  = async (id : string): Promise<boolean> => {
    try {
      const query = `DELETE FROM product WHERE id = ?`;
      await db.execute(query , [id]);
      return true ;
  
    } catch (error) {
      console.log('err deleteProduct' + error);
      return false;
    }
  }
  
  export const updateProductOnDB = async (
    product : Product): Promise<Product | null> => {
    try {
      const query = `UPDATE product SET name = ? , categorieId = ? , priceD = ? , priceG = ? , priceSG = ? , minQntG = ?,
      minQntSG = ? WHERE id = ?`;
      const [rows]: any = await db.execute(query , [product.name , product.categorieId , product.priceD ,
        product.priceG , product.priceSG , product.minQntG , product.minQntSG]);
      return rows as Product ;
  
    } catch (error) {
      console.log('err updateProduct' + error);
      return null;
    }
  }
  
  export const getProductsFromDB  = async (offSet : string): Promise<[Product] | null> => {
      try {
        const query = `SELECT * FROM product LIMIT 16 OFFSET ${offSet}`;
        const [rows]: any = await db.execute(query);
        return rows;
  
      } catch (error) {
        console.log('err getproduct' + error);
        return null;
      }
    }

    export const searchForProductFromDB  = async (name : string): Promise<[Product] | null> => {
      try {
        const query = `SELECT * FROM product LIMIT 16 WHERE name LIKE %?%`;
        const [rows]: any = await db.execute(query , [name]);
        return rows;
  
      } catch (error) {
        console.log('err getproduct' + error);
        return null;
      }
    }