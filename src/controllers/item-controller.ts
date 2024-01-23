import {Request, Response} from "express";
import {creteAnItem, deleteAnItemById, getItems, updateAnItemById} from "../models/item-model";

export class ItemController {
    // Create (POST METHOD)
    public static async createItem(req: Request, res: Response) {
        const values = req.body
        if (!values.name || !values.price) return res.status(400).json({message: 'Name and price are required!'})
        try {
            const item = await creteAnItem(values);
            res.status(200).json({
                status: 'success',
                message: 'Item added successfully',
                data: item
            })
        } catch (ex) {
            res.status(400).json({message: 'Error occurred'})
        }
    }

    public static async getItems(req: Request, res: Response) {
        try {
            const items = await getItems();
            res.status(200).json({
                status: 'success',
                data: items
            })
        } catch (ex) {
            res.status(400).json({message: 'Error occurred'})
        }
    }

    public static async updateItems(req: Request, res: Response){
        const {id} = req.params
        const values = req.body

        if(!id || !values.name) return res.status(400).json({message: 'id and name is required'})

        try{
            const updatedItem = await updateAnItemById(id, values);
            res.status(200).json({
                status: 'success',
                message: 'Item updated successfully!',
                data: updatedItem
            })
        }catch(ex){
            res.status(400).json({message: 'Error occurred', error: ex})
        }
    }

    public static async deleteItems(req: Request, res: Response) {
        const {id} = req.params

        if(!id) return res.status(400).json({message: 'id is required'})

        try{
            const deletedItem = await deleteAnItemById(id);
            res.status(200).json({
                status: 'success',
                message: 'Item deleted successfully!',
                data: deletedItem
            })
        }catch(ex){
            res.status(400).json({message: 'Error occurred', error: ex})
        }
    }
}