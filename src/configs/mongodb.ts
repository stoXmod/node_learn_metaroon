import mongoose from "mongoose";

export async function connectMongoDB(uri: string){

    try{
        if(!uri) throw new Error('🛑 Need a connection string');

        await mongoose.connect(uri);
        console.log("✅ Connected to the database successfully");
    }catch(ex){
        console.error('🔴 Error occurred while connecting to MongoDB!', ex)
        process.exit()
    }
}