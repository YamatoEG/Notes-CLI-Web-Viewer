//creating some utilities function to help us to interact with db file 
import fs from 'node:fs/promises'
import { fileURLToPath } from 'url';
import path from 'node:path';
const DB_PATH = path.join(path.dirname(fileURLToPath(import.meta.url)), '../db.json');

//create function that get entire db
export const getDB = async() =>{
   const db =  await fs.readFile(DB_PATH,'utf-8') 
   return JSON.parse(db);
}
//save DB
export const saveDB = async(db) =>{
    await fs.writeFile(DB_PATH,JSON.stringify(db,null,2))
    //json.stringify takes the string and print it in good format insted of 1 line 
    return db
}
//insert into DB
//mean to insert inside the json file we have 2 method
//first turn json to js then insert into it then turn it back to json
//using regex 


export const insertDB = async(note) =>{
    const db = await getDB();
    db.notes.push(note);
    await saveDB(db);
    return note;
}