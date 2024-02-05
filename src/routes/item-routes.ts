import express from "express";
import {ItemController} from "../controllers/item-controller";

const router = express.Router()

router.post('/add-item', ItemController.createItem);
router.get('/', ItemController.getAllItems);
router.get('/:id',ItemController.getItemById);
router.put('/:id', ItemController.updateItem);
router.delete('/:id', ItemController.deleteItem);


export default router