const Express = require('express')
const app = Express();

const productsManager = require('../../productManager.js')
const pM = new productsManager();
app.use(Express.json())
app.use(Express.urlencoded({ extended: true }))

app.get('/', async (req, res) => {
    const products = await pM.getProducts()
    res.send(products)
})

app.get('/', async (req, res) => {
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

app.get('/:pId', async (req, res) => {
    const productId = +req.params.pId
    const product = await pM.getProductsById(productId)

    if (!product) {
        res.send({ error: "Producto no encontrado" })
    }
    res.send(product)
})

app.post('/',async (req,res)=>{
    await pM.addproduct(req.body);
})

app.put('/:pId',async (req,res)=>{
    await pM.updateProduct(req.params.pId,req.body)
})

app.delete('/:pId',async (req,res)=>{
    await pM.deleteProduct(req.params.pId)
})

app.listen(8084, () => {
    console.log("Servidor Escuchando")
})