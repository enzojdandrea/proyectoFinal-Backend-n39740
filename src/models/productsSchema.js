import mongoose, { Schema, model } from "mongoose";

const productsCollection = 'products';

const ProductsSchema = new Schema({
    title:{type: Schema.Types.String, require :true},
    description:{type: Schema.Types.String, require :true},
    code:{type: Schema.Types.String, require: true},
    price:{type: Schema.Types.Number, require :true},
    status:{type: Schema.Types.Boolean, require :true},
    stock:{type: Schema.Types.Number, require :true},
    category:{type: Schema.Types.String, require :true},
    thumbnails:{type: Schema.Types.String, default : ""},
});

export default mongoose.model(productsCollection,ProductsSchema);
