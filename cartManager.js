import { json } from 'express'
import fs from 'fs'

class cartsManager {
    id = 1
    constructor() {
        this.carts = []
        this.path = 'cart.json'
    }

    async loadCarts() {
        try {
            const carts = await fs.promises.readFile(this.path, 'utf-8')
            if (carts.length != 0) {
                this.carts = JSON.parse(carts)
                const lengt = this.carts.length
                this.id = this.carts[lengt - 1].id
            }
        } catch (error) {
            const carts = await fs.promises.writeFile(this.path, JSON.stringify(this.carts))
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
        if (!cart) {
            throw Error("Carrito no encontrado")
        }
        return cart;
    }

    async addcart(cart) {
        await this.loadCarts();
        const products = [...cart]
        try {
            if (this.carts.length != 0) {
                this.id = this.id + 1
            }
            this.carts.push(
                {
                    "products": products,
                    "id": this.id
                })
            await fs.promises.writeFile(this.path, JSON.stringify(this.carts))
            return 'Carrito agregado'
        }
        catch (error) {
            console.log(error)
        }
    }

    async addProductToCart(idCart, idProduct, quantity) {
        await this.loadCarts()
        const cartFind = this.carts.find((cart) => cart.id === idCart)
        if (!cartFind) {
            throw Error("ID de Carrito Invalido")
        }
        let indexCart;
        let indexProd;
        for (let index = 0; index < this.carts.length; index++) {
            if (this.carts[index].id === idCart) {
                indexCart = index;
                index = this.carts.length
            } else {
                indexCart = false
            }
        }

        let productsStorage = this.carts[indexCart].products;
        const productsFind = productsStorage.find((prod) => prod.id == idProduct)

        if (productsFind) {
            for (let i = 0; i < productsStorage.length; i++) {
                if (productsStorage[i].id === idProduct) {
                    indexProd = i;
                    i = productsStorage.length
                } else {
                    indexProd = false
                }
            }
            productsStorage[indexProd].quantity=productsStorage[indexProd].quantity+quantity
        } else {
            this.carts[indexCart].products.push({
                "id": idProduct,
                "quantity": quantity
            })
        }
            await fs.promises.writeFile(this.path, JSON.stringify(this.carts))
    }

    async deleteProduct(id) {
        const cart = await fs.promises.readFile(this.path, 'utf-8')
        const cartParse = JSON.parse(cart)
        const newCart = cartParse.filter((cart) => cart.id != id)
        await fs.promises.writeFile(this.path, JSON.stringify(newCart))
    }
}
export default cartsManager;