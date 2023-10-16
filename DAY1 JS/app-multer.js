const http = require('http');
const axios = require('axios');
const multer = require('multer');
const path = require('path'); // Import path module

const upload = multer({ dest: 'uploads/' });

const server = http.createServer(async (req, res) => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
    
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(response.data));
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Internal Server Error');
  }
});

const port = 3000;
const ip = '127.0.0.1';

server.listen(port, ip, () => {
  console.log(`Server running at http://${ip}:${port}/`);
});

app.post('/upload', upload.single('file'), (req, res) => {
  const file = req.file;
  
  if (!file) {
    const error = new Error('Please upload a file');
    error.statusCode = 400;
    return next(error);
  }

  res.send('File uploaded successfully.');
});

app.use((error, req, res, next) => {
  console.error(error.message);
  res.status(error.statusCode || 500).send(error.message);
});
