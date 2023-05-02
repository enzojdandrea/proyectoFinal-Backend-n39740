import ProductsMongooseDao from "../daos/ProductsMongooseDao.js"

class ProductsManager {
    constructor() {
        this.productsDao = new ProductsMongooseDao();
    }

    async find() {
        return this.productsDao.find();
    }

    async getOne(id) {
        return this.productsDao.getOne(id);
    }

    async create(data) {
        return await this.productsDao.create(data);
    }

    async updateOne(id, data) {
        return this.productsDao.updateOne(id, data);
    }

    async deleteOne(id) {
        return this.productsDao.deleteOne(id);
    }
}

export default ProductsManager;