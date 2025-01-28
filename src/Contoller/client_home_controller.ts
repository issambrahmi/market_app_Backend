import { Request , Response } from 'express';
import { getCategoriesFromDB } from '../Model/categorie_model';
import { getProductsFromDB } from '../Model/product_model';


export const clientHome = async(req: Request , res: Response): Promise<Response> => {
 
    try {
        const categories = await getCategoriesFromDB();
        const products = await getProductsFromDB('0');

        return res.status(200).json({categories : categories , products : products});
    } catch (error) {
        return res.status(500).json({ message: 'Database error', error: error });      
    }
}