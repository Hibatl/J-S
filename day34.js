//set express middleware
const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

// Set up sessions
app.use(session({
  secret: 'secret-key', // Change this to a more secure secret key
  resave: false,
  saveUninitialized: true
}));
//handle registration
const users = [];

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });
  res.redirect('/login');
});
//handle login and set session
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username);
  
    if (user && await bcrypt.compare(password, user.password)) {
      req.session.userId = username; // Set a session variable
      res.cookie('sessionId', req.sessionID); // Set a cookie
      res.redirect('/protected');
    } else {
      res.send('Invalid username or password.');
    }
  });
//create a protected route
app.get('/protected', (req, res) => {
    if (req.session.userId) {
      res.send(`Welcome, ${req.session.userId}! This is a protected route.`);
    } else {
      res.redirect('/login');
    }
  });
//implement logout
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.clearCookie('sessionId');
    res.redirect('/login');
  });
//serve registration and login forms
app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/registrationForm.html');
  });
  
  app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/loginForm.html');
  });
//start the sever
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
  