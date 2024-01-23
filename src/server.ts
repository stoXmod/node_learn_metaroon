import dotenv from 'dotenv';
import app from "./app";
import {connectMongoDB} from "./configs/mongodb";

dotenv.config({path: './config.env'});

const PORT = process.env.PORT;
let DB;
if(process.env.DATABASE && process.env.PASSWORD) {
    DB = process.env.DATABASE.replace('<PASSWORD>', process.env.PASSWORD);
    (async () => connectMongoDB(DB))();
}
// Start the express app
app.listen(PORT, ()=> {
    console.log(`🚀 Server is running on port ${PORT}`)
})

