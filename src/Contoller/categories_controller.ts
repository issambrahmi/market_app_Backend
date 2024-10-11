import { Request , Response } from 'express';
import { addCategorieToDB, deleteCategorieFromDB, getCategoriesFromDB, searchForCategorieFromDB, updateCategorieOnDB } from '../Model/categorie_model';
import { error } from 'console';

export const addCategorie = async(req: Request , res: Response): Promise<Response> => {
 const {name} = req.body;
    try {
        const categorie = await addCategorieToDB(name);
        if(categorie === null){
           throw error;
        }
        return res.status(200).json({message  : 'categorie added'});
    } catch (error) {
      return res.status(500).json({ message: 'Database error', error: error });      
    }
}
export const deleteCategorie = async(req: Request , res: Response ): Promise<Response> => {
  const {id} = req.body;
     try {
         const result = await deleteCategorieFromDB(id);
         if(!result){
            throw error;
         }
         return res.status(200).json({message  : 'categorie deleted'});
     } catch (error) {
       return res.status(500).json({ message: 'Database error', error: error });      
     }
 }

 export const updateCategorie = async(req: Request , res: Response ): Promise<Response> => {
  const { id, name } = req.body;
     try {
         const categorie = await updateCategorieOnDB(id,name);
         if(categorie === null){
            throw error;
         }
         return res.status(200).json({message  : 'categorie updated'});
     } catch (error) {
       return res.status(500).json({ message: 'Database error', error: error });      
     }
 }


export const getCategories = async(req: Request , res: Response): Promise<Response> => {
    const offset: string = req.params.offSet;
       try {
           const categorie = await getCategoriesFromDB(offset);
           if(categorie === null){
              throw error;
           }
           return res.status(200).json({categorie : categorie});
       } catch (error) {
         return res.status(500).json({ message: 'Database error', error: error });      
       }
   }
   
export const searchForCategorie = async(req: Request , res: Response): Promise<Response> => {
    const name: string = req.params.name;
    
    if(!name){
      return res.status(400).json({ message: 'Please fill in all fields' });
    }
       try {
           const categorie = await searchForCategorieFromDB(name);
           if(categorie === null){
              throw error;
           }
           return res.status(200).json({categorie : categorie});
       } catch (error) {
         return res.status(500).json({ message: 'Database error', error: error });      
       }
   }
   
