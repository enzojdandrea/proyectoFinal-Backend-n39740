//[{"products":[{"id":4,"quantity":10},{"id":2,"quantity":10},{"id":3,"quantity":12},{"id":12,"quantity":2},{"id":11,"quantity":12}],"id":1},

import mongoose, { Schema, model } from "mongoose";

const cartsCollection = 'products';

const CartsSchema = new Schema({
    products:{type: Schema.Types.String, default : []}
});

export default mongoose.model(cartsCollection,CartsSchema);