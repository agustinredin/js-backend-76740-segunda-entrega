const socket = io();

const productList = document.getElementById('productList');
const addForm = document.getElementById('products-add-form');
const deleteForm = document.getElementById('products-delete-form');

addForm.addEventListener('submit', e => {
  e.preventDefault();
  const data = {
    name: addForm.name.value,
    price: addForm.price.value,
    id: Date.now().toString()
  };
  socket.emit('addProduct', data);
  addForm.reset();
});

deleteForm.addEventListener('submit', e => {
  e.preventDefault();
  socket.emit('deleteProduct', deleteForm.id.value);
  deleteForm.reset();
});

socket.on('products', data => {
  productList.innerHTML = '';
  data.forEach(p => {
    console.log(p)
    const li = document.createElement('li');
    li.textContent = `${p.name} - ${p.price} (ID: ${p.id})`;
    productList.appendChild(li);
  });
});