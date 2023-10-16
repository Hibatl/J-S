const express = require('express');
const app = express();
const port = 3000;

// Assuming you have an array of products
const products = [
    { id: 1, name: 'Product 1', price: 10, description: 'Description 1' },
    { id: 2, name: 'Product 2', price: 20, description: 'Description 2' },
    // ... more products
];

app.set('view engine', 'ejs');

// Render the home page
app.get('/', (req, res) => {
    res.render('home', { products: products });
});

// Render the product details page
app.get('/products/:id', (req, res) => {
    const productId = req.params.id;
    const product = products.find(p => p.id == productId);
    res.render('productDetails', { product: product });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
