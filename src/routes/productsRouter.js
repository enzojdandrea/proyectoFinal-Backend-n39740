import { Router } from 'express'
import productsManager from '../../productManager.js'
const productsRouter = Router()

// const { Router } = require('express')
// const Express = require('express')
// const app = Router();
// const productsManager = require('../../productManager.js')

const pM = new productsManager();

productsRouter.get('/', async (req, res) => {
    const products = await pM.getProducts()
    res.send(products)
})

productsRouter.get('/', async (req, res) => {
    let consulta = req.query
    let { limit } = consulta

    const products = await pM.getProducts()
    const prodructsLimit = []

    for (let i = 0; i < limit; i++) {
        if (!products[i]) {
            i = limit
        } else {
            prodructsLimit.push(products[i])
        }
    }

    res.send(prodructsLimit)
})

productsRouter.get('/:pId', async (req, res) => {
    const productId = +req.params.pId
    const product = await pM.getProductsById(productId)

    if (!product) {
        res.send({ error: "Producto no encontrado" })
    }
    res.send(product)
})

productsRouter.post('/',async (req,res)=>{
    await pM.addproduct(req.body);
})

productsRouter.put('/:pId',async (req,res)=>{
    await pM.updateProduct(req.params.pId,req.body)
})

productsRouter.delete('/:pId',async (req,res)=>{
    await pM.deleteProduct(req.params.pId)
})

export default productsRouter