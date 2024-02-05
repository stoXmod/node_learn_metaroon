import mongoose from "mongoose";
import {MongoClient} from "mongodb";

// export async function connectMongoDB(uri:string){
//     let mongoClient;
//     try{
//         if (!uri){
//             console.log('🛑 MongoDB uri is not defined')
//             throw new Error('🛑 MongoDB uri is not defined')
//         }
//         mongoClient = new MongoClient(uri)
//         console.log('connecting to MongoDB...')
//         console.log('connected to MongoDB! ✅')
//         await mongoClient.connect()
//         return mongoClient
//     }catch (error){
//         console.log('🛑 Error happened during connecting to DataBase',error)
//         process.exit()
//     }
// }
export const connectToMongoDB = (uri: string) => {
    return mongoose.connect(uri);
};