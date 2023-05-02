import CartsMongooseDao from "../daos/CartsMongooseDao.js"

class CartsManager {
    constructor() {
        this.cartsDao = new CartsMongooseDao();
    }

    async find() {
        return this.cartsDao.find();
    }

    async getOne(id) {
        return this.cartsDao.getOne(id);
    }

    async create(data) {
        return await this.cartsDao.create(data);
    }

    async updateOne(id, data) {
        return this.cartsDao.updateOne(id, data);
    }

    async deleteOne(id) {
        return this.cartsDao.deleteOne(id);
    }
}

export default CartsManager;