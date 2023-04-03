import { Router, json } from 'express'
import productManager from '../../productManager.js'
const productsRouter = Router()

// const { Router } = require('express')
// const Express = require('express')
// const app = Router();
// const productManager = require('../../productManager.js')

const pM = new productManager();
// const produtcs = await pM.loadProducts();

productsRouter.get('/', async (req, res) => {
    let consulta = req.query
    let { limit } = consulta

    const products = await pM.getProducts()
    const newListProducts = []
    if (limit){
        for (let i = 0; i < limit; i++) {
            if (!products[i]) {
                i = limit
            } else {
                newListProducts.push(products[i])
            }
        }
    }else{
        newListProducts.push(...products);
    }
    
    res.send(newListProducts)
})

productsRouter.get('/:pId', async (req, res) => {
    const productId = +req.params.pId
    const product = await pM.getProductsById(productId)

    if (!product) {
        res.send({ error: "Producto no encontrado" })
    }
    res.send(product)
})


productsRouter.post('/new',async (req,res)=>{
    await pM.addproduct(req.body);
    res.send(req.body)
})

productsRouter.put('/:pId',async (req,res)=>{
    await pM.updateProduct(req.params.pId,req.body)
})

productsRouter.delete('/:pId',async (req,res)=>{
    await pM.deleteProduct(req.params.pId)
})

export default productsRouter