import mongoose, {Schema} from "mongoose";

const itemSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    }
})

const ItemsSchemaModel = mongoose.model('items', itemSchema);

// Create an item
export const creteAnItem = (values: Record<string, any>) => new ItemsSchemaModel(values).save();

// Get items
export const getItems = () => ItemsSchemaModel.find();

// Update an item
export const updateAnItemById = (id: string, values: Record<string, any>) => ItemsSchemaModel.findByIdAndUpdate(id, values, {
    new: true,
    runValidators: true
});

// Delete an item
export const deleteAnItemById = (id: string) => ItemsSchemaModel.findByIdAndDelete(id);


export default ItemsSchemaModel