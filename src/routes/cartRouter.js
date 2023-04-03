import { Router } from 'express'
import cartsManager from '../../cartManager.js';
const cartsRouter = Router()

// const Express = require('express')
// const app = Express();
// const cartsManager = require('../../cartManager.js')

const cM = new cartsManager();

cartsRouter.get('/', async (req, res) => {
    const carts = await cM.getProducts()
    res.send(carts)
})

cartsRouter.get('/', async (req, res) => {
    let consulta = req.query
    let { limit } = consulta

    const carts = await cM.getProducts()
    const newCartsList = []

    if(limit){
        for (let i = 0; i < limit; i++) {
            if (!carts[i]) {
                i = limit
            } else {
                newCartsList.push(carts[i])
            }
        }
    }else{
        newCartsList.push(...carts)
    }    
    res.send(newCartsList)
})

cartsRouter.get('/:pId', async (req, res) => {
    const productId = +req.params.pId
    const product = await pM.getProductsById(productId)

    if (!product) {
        res.send({ error: "Producto no encontrado" })
    }
    res.send(product)
})

export default cartsRouter