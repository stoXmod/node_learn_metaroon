import express, {Express} from 'express'
import itemRoutes from "./routes/item-routes";
import { connectToMongoDB} from "./configs/mongodb";
import dotenv from 'dotenv'
import {v4 as uuid} from 'uuid'
import path from "path";
import {Server} from "http";
import mongoose from "mongoose";
import ItemsSchemaModel from "./models/item-model";
dotenv.config()

const PORT = 5000
const app = express()
let server: Server

// json serialize
app.use(express.json())

// Serve static files from the "public" directory
// app.use(express.static(path.join(__dirname, 'public')));

//connect Local database(row)
// const mongoClient = connectMongoDB('mongodb://127.0.0.1:27017/')

//connect Local database(using mongoose)
mongoose.connect('mongodb://127.0.0.1:27017/metaroon').then(()=>{
    console.log('✅ mongoDB connected')
}).catch((ex)=>{
    console.log('🛑 Connection Failed with mongoDB',ex)
})
// routes
app.get('/', (req, res)=> {
    res.status(200).json({message: 'Hello Metaroon 2024!'})
    // res.sendFile(path.join(__dirname, 'public/index.html'));
})
app.use('/api/v1/items', itemRoutes)

// Start the express app
// connectToMongoDB('mongodb+srv://stoXmod:5VJbnUadD3lLZPJu@cluster0.avfm1yl.mongodb.net/test?retryWrites=true&w=majority').then(()=> {
//     console.log('✅ Mongodb Connected!')
//     server = app.listen(PORT, ()=> {
//         console.log(`🚀 Server is running on port ${PORT}`)
//     })
// }).catch((ex)=> {
//     console.log('🔴 Connection failed with MongoDB!', ex)
// })
// Creat POST method
// app.post('/add-item',async (req,res)=>{
//     const {name} = req.body
//     if(!name) return res.status(400).json({message:'Name is required!'})
//     try{
//         const client = await mongoClient
//         const db = client.db('metaroon')
//         const itemsCollection = db.collection('items')
//         const result = await itemsCollection.insertOne({name, id: uuid()})
//         res.status(200).json({message:'Item added successfully ',result})
//     }catch(ex){
//         res.status(400).json({message:'Error occurred'})
//     }
// })

// Creat POST method(mongoose)
app.post('/add-item',async (req,res)=>{
    const {name} = req.body
    if(!name) return res.status(400).json({message:'Name is required!'})
    try{
        const newItem = new ItemsSchemaModel({
            name: name,
            id: uuid(),
        })
        const result = await newItem.save()
        res.status(200).json({message:'Item added successfully ',result})
    }catch(ex){
        res.status(400).json({message:'Error occurred'})
    }
})
app.listen(PORT,()=>{
    console.log(`🚀 Server running on port ${PORT}`)

})
export {app,server}

