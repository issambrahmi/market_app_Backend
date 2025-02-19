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
    try {
      const query = `UPDATE products SET name=? , categorie_id=? , price_d=? , price_g=? , price_sg=? , min_qnt_g=? , min_qnt_sg=?
      WHERE id=?`;
      
      const [rows]: any = await db.execute(query , [product.name , product.categorieId , product.priceD ,
         product.priceG , product.priceSG , product.minQntG , product.minQntSG , product.id]);
      return rows as Product ;
  
    } catch (error) {
      console.log('err updateProduct' + error);
      return null;
    }
  }
  
  export const getProductsFromDB  = async (offSet : string , limit : number): Promise<[Product] | null> => {

    const query = `SELECT p.* , categories.name AS categorie_name ,
                   CASE WHEN f.product_id IS NOT NULL THEN true ELSE false END AS is_favorite
                   FROM products p
                   LEFT JOIN favorites f ON f.product_id = p.id
                   LEFT JOIN categories ON p.categorie_id = categories.id
                   LIMIT ${limit}
                   OFFSET ?`;
    
      try {
        const [rows]: any = await db.execute(query , [offSet]);
        return rows;
      } catch (error) {
        console.log('err getproduct' + error);
        return null;
      }
    }

    export const searchForProductFromDB  = async (name : string , offSet : string ): Promise<[Product] | null> => {
     
      const query = `SELECT products.* , categories.name AS categorie_name 
         FROM products 
         JOIN categories ON products.categorie_id = categories.id
         WHERE products.name LIKE ? 
         LIMIT 16
         OFFSET ?`;

      try {
        const [rows]: any = await db.execute(query , [`%${name}%` , offSet]);
        return rows;
  
      } catch (error) {
        console.log('err getproduct' + error);
        return null;
      }
    }

    export const searchForProductNamesFromDB  = async (name : string ): Promise<[Product] | null> => {
     
      const query = `SELECT name  
         FROM products
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


    export const addProductToFavoritesOnDB  = async (productId : string , clientId : string ): Promise<[Product] | null> => {
     
      const query = `INSERT INTO favorites   
        (client_id , product_id) 
        VALUES ( ? , ? )`;
         
      try {
        const [rows]: any = await db.execute(query , [clientId , productId]);
        return rows;
  
      } catch (error) {
        console.log('err getproduct' + error);
        return null;
      }
    }

    export const deleteProductToFavoritesOnDB  = async (productId : string , clientId : string ): Promise<[Product] | null> => {
     
      const query = `DELETE FROM favorites   
       WHERE client_id = ? 
       AND product_id = ?`;
         
      try {
        const [rows]: any = await db.execute(query , [clientId , productId]);
        return rows;
  
      } catch (error) {
        console.log('err getproduct' + error);
        return null;
      }
    }

