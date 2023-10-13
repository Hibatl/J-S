const express = require('express');
const app = express();
const port = 3000;

let products = [
  { id: 1, name: 'iPhone 12 Pro', price: 1099.99 },
  { id: 2, name: 'Samsung Galaxy S21', price: 999.99 },
  { id: 3, name: 'Sony PlayStation 5', price: 499.99 },
  { id: 4, name: 'MacBook Pro 16', price: 2399.99 },
  { id: 5, name: 'DJI Mavic Air 2', price: 799.99 },
];

// Route to get a list of all products
app.get('/products', (req, res) => {
  res.json(products);
});
app.get('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const product = products.find(item => item.id === productId);
  });
  
  app.get('/products/search', (req, res) => {
    const { q, minPrice, maxPrice } = req.query;
  
    let filteredProducts = products;
  
    if (q) {
      filteredProducts = filteredProducts.filter(product =>
        product.name.toLowerCase().includes(q.toLowerCase())
      );
    }
  
    if (minPrice) {
      filteredProducts = filteredProducts.filter(
        product => product.price >= parseFloat(minPrice)
      );
    }
  
    if (maxPrice) {
      filteredProducts = filteredProducts.filter(
        product => product.price <= parseFloat(maxPrice)
      );
    }
  
    res.json(filteredProducts);
  });
  // Route to create a new product
app.post('/products', (req, res) => {
    const newProduct = req.body;
    newProduct.id = products.length + 1; // Assign a new ID
    products.push(newProduct);
    res.status(201).json(newProduct);
  });
  
  // Route to update details of a specific product by ID
  app.put('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const updatedProduct = req.body;
  
    let productIndex = products.findIndex(item => item.id === productId);
  
    if (productIndex !== -1) {
      products[productIndex] = { ...products[productIndex], ...updatedProduct };
      res.json(products[productIndex]);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  });
  
  // Route to delete a specific product by ID
  app.delete('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    products = products.filter(item => item.id !== productId);
    res.json({ message: 'Product deleted successfully' });
  });
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
