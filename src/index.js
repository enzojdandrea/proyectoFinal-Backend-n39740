import Express from 'express';
import productsRouter from './routes/productsRouter.js';
import cartRouter from './routes/cartRouter.js'

// const porductsRouter = require('./routes/productsRouter.js');
// const cartRouter = require('./routes/cartRouter.js');
const PORT = 8083;

const app = Express();

app.use(Express.json());
app.use(Express.urlencoded({extended:true}));

app.use('/api/products',productsRouter);
app.use('/api/cart',cartRouter);





app.listen(PORT,()=>{
    console.log(`Server listenig on port ${PORT}`);
})