import cartsSchema from "../models/cartsSchema.js"

class CartsMongooseDao {
    async find() {
        const cartsDocument = await cartsSchema.find();
        return cartsDocument.map(doc => ({
            id: doc._id,
            prodcuts: doc.prodcuts,
        }))
    }

    async getOne(id) {
        const cartDocument = await cartsSchema.findOne({ _id: id });

        if (!productDocument) {
            throw new Error('Product dont exist.');
        }

        return{
            id:cartDocument?._id,
            products:cartDocument?.products
        }
    }

    async create(data) {
        const cartDocument = await cartsSchema.create(data);

        return{
            id:cartDocument._id,
            products:cartDocument.products
        }
    }

    async updateOne(id, data) {
        const cartDocument = await cartsSchema.findOneAndUpdate({ _id: id }, data, { new: true });

        if (!cartDocument) {
            throw new Error('Product dont exist.');
        }

        return{
            id:cartDocument._id,
            products:cartDocument.products
        }
    }

    async deleteOne(id) {
        return cartsSchema.deleteOne({ _id: id });
    }


}