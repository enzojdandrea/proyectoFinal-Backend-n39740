const Express = require('express')
const app = Express();

const productsManager = require('./productManager')
const pM = new productsManager();


app.get('/', async (req, res) => {
    const products = await pM.getProducts()
    res.send(products)
})

app.use(Express.urlencoded({ extended: true }))

app.get('/products', async (req, res) => {
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

app.get('/products/:pId', async (req, res) => {
    const productId = +req.params.pId
    const product = await pM.getProductsById(productId)

    if (!product) {
        res.send({ error: "Producto no encontrado" })
    }
    res.send(product)
})

app.listen(8084, () => {
    console.log("Servidor Escuchando")
})