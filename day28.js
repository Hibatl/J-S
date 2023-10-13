const express = require('express');
const app = express();
const port = 3000;

// Logging Middleware
app.use((req, res, next) => {
  const currentDate = new Date().toISOString();
  console.log(`[${currentDate}] ${req.method} ${req.url}`);
  next();
});

// Dummy array of products (simulating a database)
let products = [
  { id: 1, name: 'iPhone 12 Pro', price: 1099.99 },
  { id: 2, name: 'Samsung Galaxy S21', price: 999.99 },
  { id: 3, name: 'Sony PlayStation 5', price: 499.99 },
  { id: 4, name: 'MacBook Pro 16', price: 2399.99 },
  { id: 5, name: 'DJI Mavic Air 2', price: 799.99 },
];

// Routes...

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong! Please try again later.');
});

// Route to get a list of all products
app.get('/products', (req, res) => {
  res.json(products);
});

// Route to get details of a specific product by ID
app.get('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find(item => item.id === productId);

  if (product) {
    res.json(product);
  } else {
    const error = new Error('Product not found');
    error.status = 404;
    next(error);
  }
});

// Route to search for products based on query parameters
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
app.put('/products/:id', (req, res, next) => {
  const productId = parseInt(req.params.id);
  const updatedProduct = req.body;

  let productIndex = products.findIndex(item => item.id === productId);

  if (productIndex !== -1) {
    products[productIndex] = { ...products[productIndex], ...updatedProduct };
    res.json(products[productIndex]);
  } else {
    const error = new Error('Product not found');
    error.status = 404;
    next(error);
  }
});

// Route to delete a specific product by ID
app.delete('/products/:id', (req, res, next) => {
  const productId = parseInt(req.params.id);
  products = products.filter(item => item.id !== productId);
  res.json({ message: 'Product deleted successfully' });
});

// Intentional Error to Test Error Handling Middleware
app.get('/error', (req, res, next) => {
  const error = new Error('Intentional Error for Testing');
  next(error);
});

// Start Server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
