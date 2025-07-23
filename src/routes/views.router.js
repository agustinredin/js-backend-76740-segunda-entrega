import { Router } from "express";

const router = Router();

let products = []

//PREGUNTA: Acá mapeo los eventos del socket y guardo el array de productos?

//o lo hago en el index.js donde creo el server(new Server()) y guardo los eventos ahi?

router.get('/', (req, res) => {
  res.render('home', {});
});

router.post('/add-product', (req, res) => {
//PREGUNTA: si incluyo el array aca lo guardo aca directamente o lo exporto de algun archivo?

    // const {name, price, description} = req.body

    // const newProduct = {
    //     id: products.length + 1,
    //     name,
    //     price,
    // }
    // products.push(newProduct)

    // req.io.emit('newProduct', products)
    // Vincular el endpoint con el socket

    res.status(201).json({
        message: "Producto creado con éxito",
        product: products
    })
})


router.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts', {products})
})

export default router;