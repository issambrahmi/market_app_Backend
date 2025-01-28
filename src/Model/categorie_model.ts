import {db} from '../db config/db';

export  interface Categorie {
 id : number,
 name : string
}

export const addCategorieToDB  = async (name: string): Promise<Categorie | null> => {
  try {
    const query = `INSERT INTO categories (name) VALUES (?)`;
    const [rows]: any = await db.execute(query , [name]);
    return { 'id' : rows.insertId , 'name' : name } as Categorie ;

  } catch (error) {
    console.log('err addCategorie' + error);
    return null;
  }
}

export const deleteCategorieFromDB  = async (id : string): Promise<boolean> => {
  try {
    const query = `DELETE FROM categories WHERE id = ?`;
    const [rows]: any = await db.execute(query , [id]);
    return true ;

  } catch (error) {
    console.log('err deleteCategorie' + error);
    return false;
  }
}

export const updateCategorieOnDB = async (id: string , name : string): Promise<Categorie | null> => {
  try {
    const query = `UPDATE categories SET name = ? WHERE id = ?`;
    const [rows]: any = await db.execute(query , [name,id]);
    return rows as Categorie ;

  } catch (error) {
    console.log('err updateCategorie' + error);
    return null;
  }
}

export const getCategoriesFromDB  = async (): Promise<[Categorie] | null> => {
    try {
      const query = `SELECT * FROM categories`;
      const [rows]: any = await db.execute(query);
      return rows;

    } catch (error) {
      console.log('err getCategorie' + error);
      return null;
    }
  }

  export const searchForCategorieFromDB  = async (name : string): Promise<[Categorie] | null> => {
    try {
      const query = `SELECT * FROM categories LIMIT 16 WHERE name LIKE %?%`;
      const [rows]: any = await db.execute(query , [name]);
      return rows;

    } catch (error) {
      console.log('err searchCategorie' + error);
      return null;
    }
  }

export const VerifyCategorieExcisting = async(name : string) : Promise<boolean> => {
   try {
     const query = `SELECT * FROM categories WHERE name = ?`;
     const [row] : any[] = await db.execute(query , [name]);
     console.log(row.length);
     if(row.length != 0){
      return true;
     }
     return false;
   } catch (error) {
      console.log('err verify categorie');
      console.log(error);
      return true;
   }
  }