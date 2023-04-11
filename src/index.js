import Express from 'express';
import { engine } from 'express-handlebars';
import { resolve } from 'path';
import { Server } from 'socket.io';

import productsRouter from './routes/productsRouter.js';
import cartRouter from './routes/cartRouter.js'

void (async () => {

    try {
        const PORT = 8083;
        const app = Express();
        app.use(Express.json());
        app.use(Express.urlencoded({ extended: true }));

        const viewsPath = resolve('src/views');
        app.engine('handlebars', engine({
            layoutsDir: `${viewsPath}/layouts`,
            defaultLayout: `${viewsPath}/layouts/main.handlebars`,
        }))
        app.set('view engine', 'handlebars')
        app.set('views', viewsPath)

        app.use('/api/products', productsRouter);
        app.use('/api/cart', cartRouter);

        // app.get('/', function (req, res) {
        //     res.render('greetings', { name: "enzo", title: "Hola" })
        // })


        const httpServer = app.listen(PORT, () => {
            console.log(`Server listenig on port ${PORT}`);
        })

        const socketServer = new Server(httpServer)

        socketServer.on('connection', socket => {
            console.log("Nuevo Cliente Conectado");

            socket.on('message', (data) => {
                console.log('DATA Desde Cliente: ' + data)
            })

            socket.emit('evento_individual', "Conectado al Servidor");

            socket.on('chatRoom1', (data) => {
                console.log("ChatRoom1 "+data);
                socket.broadcast.emit('chatRoom1', data);
            });

            socketServer.emit('evento_global',"todos los sockets")
        })
    } catch (error) {
        console.log({ Error: error });
    }
})();