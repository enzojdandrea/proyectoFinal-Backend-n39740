import productsSchema from "../models/productsSchema.js"

class ProductsMongooseDao {
    async find() {
        const productsDocument = await productsSchema.find();
        return productsDocument.map(doc => ({
            id: doc._id,
            title: doc.title,
            description: doc.description,
            code: doc.code,
            price: doc.price,
            status: doc.status,
            stock: doc.stock,
            category: doc.category,
            thumbnails: doc.thumbnails
        }))
    }

    async getOne(id) {
        const productDocument = await productsSchema.findOne({ _id: id });

        if (!productDocument) {
            throw new Error('Product dont exist.');
        }

        return {
            id: productDocument?._id,
            title: productDocument?.title,
            description: productDocument?.description,
            code: productDocument?.code,
            price: productDocument?.price,
            status: productDocument?.status,
            stock: productDocument?.stock,
            category: productDocument?.category,
            thumbnails: productDocument?.thumbnails
        }
    }

    async create(data) {
        const productDocument = await productsSchema.create(data);

        return {
            id: productDocument._id,
            title: productDocument.title,
            description: productDocument.description,
            code: productDocument.code,
            price: productDocument.price,
            status: productDocument.status,
            stock: productDocument.stock,
            category: productDocument.category,
            thumbnails: productDocument.thumbnails
        }
    }

    async updateOne(id, data) {
        const productDocument = await productsSchema.findOneAndUpdate({ _id: id }, data, { new: true });

        if (!productDocument) {
            throw new Error('Product dont exist.');
        }

        return {
            id: productDocument._id,
            title: productDocument.title,
            description: productDocument.description,
            code: productDocument.code,
            price: productDocument.price,
            status: productDocument.status,
            stock: productDocument.stock,
            category: productDocument.category,
            thumbnails: productDocument.thumbnails
        }
    }

    async deleteOne(id) {
        return productsSchema.deleteOne({ _id: id });
    }

}

export default ProductsMongooseDao;