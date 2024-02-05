import {Request, Response} from "express";
import ItemsSchemaModel from "../models/item-model";
import {v4 as uuid} from 'uuid'

export class ItemController {
    public static async createItem(req: Request, res: Response) {
        const {name} = req.body
        if(!name) return res.status(400).json({message: 'Name is required!'})

        try{
            const newItem = new ItemsSchemaModel({
                name: name,
                id: uuid(),
            })

            const result = await newItem.save()

            // const result  = await itemsCollection.insertOne({name, id: uuid()})
            res.status(200).json({message: 'Item added successfully', result})
        }catch(ex){
            res.status(400).json({message: 'Error occurred'})
        }
    }

    public static async getAllItems(req: Request, res: Response) {
        try{
            const result = await ItemsSchemaModel.find()
            res.status(200).json({message: 'Get all items successfully', result})
        }catch(ex){
            res.status(400).json({message: 'Error occurred'})
        }
    }
    public static async getItemById(req: Request, res: Response) {
        const itemId = req.params.id;

        try {
            const item = await ItemsSchemaModel.findById(itemId);
            if (!item) {
                return res.status(404).json({ message: 'Item not found' });
            }

            res.status(200).json({ message: 'Get item by ID successfully', item });
        } catch (ex) {
            res.status(400).json({ message: 'Error occurred' });
        }
    }

    public static async updateItem(req: Request, res: Response) {
        const itemId = req.params.id;
        const { name } = req.body;

        try {
            const updatedItem = await ItemsSchemaModel.findByIdAndUpdate(
                itemId,
                { name },
                { new: true }
            );

            if (!updatedItem) {
                return res.status(404).json({ message: 'Item not found' });
            }

            res.status(200).json({ message: 'Item updated successfully', updatedItem });
        } catch (ex) {
            res.status(400).json({ message: 'Error occurred' });
        }
    }

    public static async deleteItem(req: Request, res: Response) {
        const itemId = req.params.id;

        try {
            const deletedItem = await ItemsSchemaModel.findByIdAndDelete(itemId);

            if (!deletedItem) {
                return res.status(404).json({ message: 'Item not found' });
            }

            res.status(200).json({ message: 'Item deleted successfully', deletedItem });
        } catch (ex) {
            res.status(400).json({ message: 'Error occurred' });
        }
    }

}