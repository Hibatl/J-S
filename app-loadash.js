// app.js

const http = require('http');
const axios = require('axios');
const _ = require('lodash'); // Import Lodash

const server = http.createServer(async (req, res) => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
    const title = _.get(response.data, 'title', 'No Title'); // Use Lodash to safely access nested properties
    
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`Post Title: ${title}`);
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
