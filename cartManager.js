const fs = require('fs')

class cartManage {
    id = 1
    constructor() {
        this.carts = []
        this.path = 'cart.json'
    }

    async loadCarts() {
        try {
            const carts = await fs.promises.readFile(this.path, 'utf-8')
            if (carts.length != 0) {
                this.carts = JSON.parse(cart)
                const lengt = this.carts.length
                this.id = this.carts[lengt - 1].id
            }
        } catch (error) {
            await fs.promises.writeFile(this.path, JSON.stringify(this.cart))
            console.log(error)
        }

    }

    async getCart() {
        const cart = await fs.promises.readFile(this.path, 'utf-8')
        return JSON.parse(cart)
    }

    async getCartById(id) {
        const carts = await fs.promises.readFile(this.path, 'utf-8')
        const cartParse = JSON.parse(carts)
        const cart = cartParse.find((car) => car.id === id);
        if(!cart){
            throw Error("Carrito no encontrado")
        }
        return cart;
    }

    async addcart(cart) {
        try {
            if (this.cart.length != 0) {
                this.id = this.id + 1
            }
            this.cart.push(
                {
                    ...cart,
                    id: this.id
                })
            await fs.promises.writeFile(this.path, JSON.stringify(this.cart))
            return 'Carrito agregado'
        }
        catch (error) {
            console.log(error)
        }
    }

    async addProductToCart(idCart, idProduct,quantity) {
        const cart = await fs.promises.readFile(this.path, 'utf-8')
        const cartParse = JSON.parse(cart)
        const cartFind = cartParse.find((cart) => cart.id === idCart)
        if (!cartFind) {
            throw Error("ID de Carrito Invalido")
        }
        const porductsStorage = cartParse.products;
        const productsFind = porductsStorage.find((prod) => prod.id === idProduct)
        if (productsFind) {
            productsFind.quantity = productsFind.quantity + quantity;
        } else {
            cartParse.products.push({
                idProduct,
                quantity
            })
        }
        await fs.promises.writeFile(this.path, JSON.stringify(cartParse))
    }

    async deleteProduct(id) {
        const cart = await fs.promises.readFile(this.path, 'utf-8')
        const cartParse = JSON.parse(cart)
        const newCart = cartParse.filter((cart) => cart.id != id)
        await fs.promises.writeFile(this.path, JSON.stringify(newCart))
    }
}
module.exports = cartManage;