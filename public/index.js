const socket = io()

const productListElement = document.getElementById('products-list')
const productForm = document.getElementById('products-form')

//le pido al socket en real-time la lista de productos
socket.emit('getProducts')

//respuesta de getProducts
socket.on('products', (products) => {
    productListElement.innerHTML = '';
    products.forEach((product) => {
        const li = document.createElement('li');
        li.textContent = `${product.name}: $${product.price}`;
        productListElement.appendChild(li);
    });
})

productForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;

    if(!name || !price) {
        notify('ingrese nombre y precio', true) 
        return
    }
    socket.emit('addProduct', { name: name, price: price });
    notify('producto añadido')
});

const notify = (msg, error = false) => {
    const div = document.getElementById('notif') ?? document.createElement('div')
    div.id = 'notif'

    div.style = 'position: absolute; bottom: 10px; right: 10px; padding: 20px; color: white; border-radius: 5px; border-color: #2c2c2c; border-width:1px; background:limegreen'

    if (error) div.style.background = 'red'

    div.textContent = msg

    document.body.appendChild(div)
    setTimeout(() => {
        document.body.removeChild(div)
    }, 3000)
}