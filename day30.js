app.use(express.static('public'));
const products = [
    { id: 1, name: 'Product 1', price: 10, description: 'Description 1', image: 'product1.jpg' },
    { id: 2, name: 'Product 2', price: 20, description: 'Description 2', image: 'product2.jpg' },
    // ... more products
  ];
  app.use(express.static('public', { maxAge: 86400000 }));
  body {
    font-family: Arial, sans-serif;
    background-color: #f0f0f0;
  }
  
  img {
    max-width: 100%;
    height: auto;
  }
