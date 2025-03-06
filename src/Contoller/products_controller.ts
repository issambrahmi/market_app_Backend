import { Request , Response } from 'express';
import { error } from 'console';
import { addProductToDB, addProductToFavoritesOnDB, deleteProductFromDB, deleteProductToFavoritesOnDB, getCategorieProductsFromDB, getProductsFromDB, Product, searchForProductFromDB, searchForProductNamesFromDB, updateProductOnDB } from '../Model/product_model';
import { off } from 'process';

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

 export const updateProduct = async(req: Request , res: Response): Promise<Response> => {
    const {id, name , categorieId , priceD , priceG , priceSG , minQntG , minQntSG } = req.body;

    if( !id || !name || !categorieId || !priceD || !priceG || !priceSG || !minQntG || !minQntSG){
      return res.status(400).json({message : 'please fill all fileds'});
    }

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


export const getProducts = async(req: Request , res: Response, client : boolean): Promise<Response> => {
    const offset: string = req.params.offset;

    if( !offset){
      return res.status(400).json({message : 'please fill all fileds'});
    }
       try {
           const products = await getProductsFromDB(offset , client == true ? 30 : 16);
           if(products === null){
              throw error;
           }
           return res.status(200).json({products : products});
       } catch (error) {
         return res.status(500).json({ message: 'Database error', error: error });      
       }
   }

   export const getCategorieProducts = async(req: Request , res: Response): Promise<Response> => {
    const offset: string = req.params.offset;
    const categorieId : string = req.params.categorieId

    if( !offset || !categorieId){
      return res.status(400).json({message : 'please fill all fileds'});
    }
       try {
           const products = await getCategorieProductsFromDB(offset, categorieId);
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
  const offset: string = req.params.offset;
  if(!name){
    return res.status(400).json({ message: 'Please fill in all fields' });
  }
     try {
         const products = await searchForProductFromDB(name , offset);
         if(products === null){
            throw error;
         }
         return res.status(200).json({products : products});
     } catch (error) {
       return res.status(500).json({ message: 'Database error', error: error });      
     }
 }

 export const searchForProductsNames  = async(req: Request , res: Response): Promise<Response> => {
  const name: string = req.params.name;
  if(!name){
    return res.status(400).json({ message: 'Please fill in all fields' });
  }
     try {
         const products = await searchForProductNamesFromDB(name);
         if(products === null){
            throw error;
         }
         return res.status(200).json({products : products});
     } catch (error) {
       return res.status(500).json({ message: 'Database error', error: error });      
     }
 }

 
 export const addProductToFavorite  = async(req: Request , res: Response): Promise<Response> => {
  
  const { productId , clientId } = req.body;
  console.log(productId);
  console.log(clientId);


  if(!productId || !clientId){
    return res.status(400).json({ message: 'Please fill in all fields' });
  }
     try {
         const product = await addProductToFavoritesOnDB(productId , clientId);
         console.log(1);
         if(product === null){
            throw error;
         }
         return res.status(200).json({products : product});
     } catch (error) {
       return res.status(500).json({ message: 'Database error', error: error });      
     }
 }



 export const deleteProductToFavorite  = async(req: Request , res: Response): Promise<Response> => {
  
  const { productId , clientId } = req.body;

  if(!productId || !clientId){
    return res.status(400).json({ message: 'Please fill in all fields' });
  }
     try {
         const product = await deleteProductToFavoritesOnDB(productId , clientId);
         if(product === null){
            throw error;
         }
         return res.status(200).json({products : product});
     } catch (error) {
       return res.status(500).json({ message: 'Database error', error: error });      
     }
 }


