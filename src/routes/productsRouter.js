import { Router, json } from 'express'
import productManager from '../../productManager.js'

const productsRouter = Router()

const pM = new productManager();

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
    res.render('greetings',newListProducts)
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

productsRouter.post('/',async (req,res)=>{
    await pM.addproduct(req.body);
    req.send({message:'Producto agregado con exito'})
})

productsRouter.put('/:pId',async (req,res)=>{
    const id =parseInt(req.params.pId)
    await pM.updateProduct(id,req.body)
    req.send({message:'Producto modificado con exito'})
})

productsRouter.delete('/:pId',async (req,res)=>{
    await pM.deleteProduct(req.params.pId)
    req.send({message:'Producto borrado con exito'})
})

export default productsRouter