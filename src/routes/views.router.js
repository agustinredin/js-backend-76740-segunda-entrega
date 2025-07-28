import { Router } from "express";

const router = Router();

let products = []

router.get('/', (req, res) => {
    let io = req.app.get('io')
    io.on('connection', (socket) => {
    console.log('New Client connected: ', socket.id)
    socket.emit('products', products)

    socket.on('addProduct', (data) => {
        products.push({...data})
        socket.emit('products', products)
    })

    socket.on('deleteProduct', (id) => {
        products = products.filter(i => i.id !== id)
        socket.emit('products', products)
    })

    socket.on('getProducts', () => {
        socket.emit('products', products)
    })
})

  res.render('home', { products });
});

router.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts')
})


export default router;