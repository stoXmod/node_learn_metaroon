import express from "express";
import itemRoutes from "./routes/item-routes";

const app = express()

// json serialize
app.use(express.json())

// routes
app.use('/api/v1/items', itemRoutes)

export default app;