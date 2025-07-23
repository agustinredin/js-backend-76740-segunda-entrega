import express from 'express';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';

import viewsRouter from './src/routes/views.router.js';

const app = express();
const PORT = 8080;

app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', './views');
app.use(express.static('./public'));

app.use('/', viewsRouter);

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const products = [];

const io = new Server(server);

io.on('connection', (socket) => {
    console.log('New Client connected: ', socket.id)

    socket.on('addProduct', (data) => {
        products.push({...data})
        socket.emit('products', products)
    })

    socket.on('getProducts', () => {
        socket.emit('products', products)
    })
})