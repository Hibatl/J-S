// app.js

const http = require('http');
const axios = require('axios'); // Import Axios

const server = http.createServer(async (req, res) => {
  try {
    // Make a GET request to an example API using Axios
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
    
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(response.data)); // Respond with the fetched data
  } catch (error) {
    console.error('Error fetching data:', error.message);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Internal Server Error');
  }
});

const port = 3000;
const ip = '127.0.0.1';

server.listen(port, ip, () => {
  console.log(`Server running at http://${ip}:${port}/`);
});
