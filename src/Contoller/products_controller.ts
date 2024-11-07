import { Request , Response } from 'express';
import { error } from 'console';
import { addProductToDB, deleteProductFromDB, getProductsFromDB, Product, searchForProductFromDB, updateProductOnDB } from '../Model/product_model';

export const addProduct = async(req: Request , res: Response): Promise<Response> => {
 const { name , categorieId , image , priceD , priceG , priceSG , minQntG , minQntSG } = req.body;
   
  if( !name || !categorieId || !priceD || !priceG || !priceSG || !minQntG || !minQntSG){
    return res.status(400).json({message : 'please fill all fileds'});
  }
  try {
        const product: Product = {
            id: 0,
            name: name,
            categorieId: categorieId,
            image: image != undefined ? image : '',
            priceD: priceD,
            priceG: priceG,
            priceSG: priceSG,
            minQntG: minQntG,
            minQntSG: minQntSG
        }; 
        const result = await addProductToDB(product);
        console.log(result);
        if(result === null){
           throw error;
        }
        return res.status(200).json({message  : 'product added' , product : result});
    } catch (error) {
      return res.status(500).json({ message: 'Database error', error: error });      
    }
}


export const deleteProduct = async(req: Request , res: Response ): Promise<Response> => {
  const {id} = req.body;
     try {
         const result = await deleteProductFromDB(id);
         if(!result){
            throw error;
         }
         return res.status(200).json({message  : 'product deleted'});
     } catch (error) {
       return res.status(500).json({ message: 'Database error', error: error });      
     }
 }

 export const updateProduct = async(req: Request , res: Response ): Promise<Response> => {
    const {id, name , categorieId , priceD , priceG , priceSG , minQntG , minQntSG } = req.body;
  const product: Product = {
    id: id,
    name: name,
    categorieId: categorieId,
    image: '',
    priceD: priceD,
    priceG: priceG,
    priceSG: priceSG,
    minQntG: minQntG,
    minQntSG: minQntSG
} 
     try {
         const result = await updateProductOnDB(product);
         if(result === null){
            throw error;
         }
         return res.status(200).json({message  : 'product updated', product : result});
     } catch (error) {
       return res.status(500).json({ message: 'Database error', error: error });      
     }
 }


export const getProducts = async(req: Request , res: Response): Promise<Response> => {
    const offset: string = req.params.offSet;
       try {
           const products = await getProductsFromDB(offset);
           if(products === null){
              throw error;
           }
           return res.status(200).json({products : products});
       } catch (error) {
         return res.status(500).json({ message: 'Database error', error: error });      
       }
   }

    
export const searchForProducts = async(req: Request , res: Response): Promise<Response> => {
  const name: string = req.params.name;
  if(!name){
    return res.status(400).json({ message: 'Please fill in all fields' });
  }
     try {
         const products = await searchForProductFromDB(name);
         if(products === null){
            throw error;
         }
         return res.status(200).json({products : products});
     } catch (error) {
       return res.status(500).json({ message: 'Database error', error: error });      
     }
 }


   
