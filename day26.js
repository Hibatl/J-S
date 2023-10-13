
const express = require('express');
const app = express();
const port = 3000;

// This is the route handler for the root URL
app.get('/', (req, res) => {
  res.send('Welcome to my Express.js server!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});