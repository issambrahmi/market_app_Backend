import {db} from '../db config/db';

export interface User{
 id : number,
 username : string,
 email : string,
 password : string,
 phoneNumber : string,
 image : string
}

export const findUserByEmail = async (email : String , role: String) : Promise<User | null> => {
    try {
        const query = `SELECT * FROM ${role} WHERE email = ?`;
        const userDb : any = await db.execute(query , [email]);
        if(userDb === 0){
            return null;
        }
        return userDb[0] as User;

    } catch (error) {
        console.log('err findUserByEmail' + error);
        return null;
    }
}

export const getUsersFromDB = async (offSet: string , role: string) : Promise<User[] | null> => {
    try {
        const query: string = `SELECT * FROM ${role} LIMIT 16 OFFSET ${offSet}`;
        const [rows] : any = await db.execute(query);

        if(rows.length === 0){
          return [];
        }
        return rows;
    } catch (error) {
        console.log('err getUsers' + error);
        return null;
    }
}

export const getUsersFromDBWithoutOffset = async (role: string) : Promise<User[] | null> => {
    try {
        const query: string = `SELECT * FROM ${role}`;
        const [rows] : any = await db.execute(query);

        if(rows.length === 0){
          return [];
        }
        return rows;
    } catch (error) {
        console.log('err getUsers' + error);
        return null;
    }
}

export const searchForUsersFromDB = async (username : string , role: string) : Promise<User | null> => {
    try {
        const query: string = `SELECT * FROM ${role} WHERE username LIKE ? LIMIT 16`;
        const [rows] : any = await db.execute(query , [`%${username}%`]);
        return rows;
    } catch (error) {
        console.log('err getUsers' + error);
        return null;
    }
}

