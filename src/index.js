const Express = require('express');
const porductsRouter = require('./routes/productsRouter.js');
const cartRouter = require('./routes/cartRouter.js');
const PORT = 8083;

const app = Express();

app.use(Express.json());
app.use(Express.urlencoded({extended:true}));

app.use('/api/porducts',porductsRouter);
app.use('/api/cart',cartRouter);





app.listen(PORT,()=>{
    console.log(`Server listenig on port ${PORT}`);
})