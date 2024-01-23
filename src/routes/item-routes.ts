import express from "express";
import {ItemController} from "../controllers/item-controller";

const router = express.Router()

router.post('/add-item', ItemController.createItem);

// TODO: Move the all routes from the server.ts to this
router.get('/get-items', ItemController.getItems);
router.patch('/update-item/:id', ItemController.updateItems);
router.delete('/delete-item/:id',  ItemController.deleteItems);

export default router