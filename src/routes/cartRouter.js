import { Router } from 'express'
import cartsManager from '../../cartManager.js';
const cartRouter = Router()

// const Express = require('express')
// const app = Express();
// const cartsManager = require('../../cartManager.js')

const cM = new cartsManager();

cartRouter.get('/', async (req, res) => {
    let consulta = req.query
    let { limit } = consulta

    const carts = await cM.getCart()
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

cartRouter.get('/:cId', async (req, res) => {
    const cartId = +req.params.cId
    const cart = await cM.getCartById(cartId)

    if (!cart) {
        res.send({ error: "Producto no encontrado" })
    }
    res.send(cart)
})

cartRouter.post('/',async (req,res)=>{
    const products = req.body;
    const cart = []
    function isObject(val) {
        return (typeof val === 'object');
    }

    if(!Array.isArray(products)){
        if(!isObject(products)){
            return res.status(400).send({ status: "error", error: "Valores incorrectos." });
        }
        if((!products.hasOwnProperty("id"))&&(!products.hasOwnProperty("quantity"))){
            return res.status(400).send({ status: "error", error: "El Objeto no posee las propiedades id o quantity"});
        }
        cart.push({
            "id":products.id,
            "quantity":products.quantity
        })
    }else{
        products.forEach(element => {
            if(!isObject(element)){
                return res.status(400).send({ status: "error", error: "Valores incorrectos." });
            }
            if((!element.hasOwnProperty("id"))&&(!element.hasOwnProperty("quantity"))){
                return res.status(400).send({ status: "error", error: "El Objeto no posee las propiedades id o quantity"});
            }
            cart.push({
                "id":element.id,
                "quantity":element.quantity
            })
        });
    }
    await cM.addcart(cart)
    return res.status(200).send({status:"OK",OK:cart})
})

cartRouter.post('/:cId/product/:pId', async (req,res)=>{
    const cId = parseInt(req.params.cId)
    const pId = parseInt(req.params.pId)
    const { quantity } =  req.body
    if(!quantity){
        return res.status(400).send({status:"error",error: "No se a ingresado quantity"})
    }
    await cM.addProductToCart(cId,pId,quantity)
    req.send({message:'Producto agregado con exito'})
})

export default cartRouter