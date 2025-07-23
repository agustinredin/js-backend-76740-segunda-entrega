const socket = io()

const productListElement = document.getElementById('products-list')
const productForm = document.getElementById('product-form')

//le pido al socket en real-time la lista de productos
socket.emit('getProducts')

//respuesta de getProducts
socket.on('products', (products) => {
    productForm.innerHTML = '';
    products.forEach((product) => {
        const li = document.createElement('li');
        li.textContent = `${product.name}: $${product.price}`;
        productForm.appendChild(li);
    });
})