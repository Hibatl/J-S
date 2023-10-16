const express = require('express');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const app = express();



const secretKey = 'your-secret-key';
const users = [
    { id: 1, username: 'user1', password: 'password1', role: 'user' },
    { id: 2, username: 'admin', password: 'admin123', role: 'admin' },
  ];

// Identify any security vulnerabilities, such as weak passwords or lack of secure session management.
  function checkWeakPassword(password) {
    // You can customize this function to implement your password strength requirements
    const minLength = 8;
    const minUppercase = 1;
    const minLowercase = 1;
    const minDigits = 1;
    const minSpecialChars = 1;
    const specialChars = "!@#$%^&*()_+{}[]|;:,.<>?";
  
    if (
      password.length < minLength ||
      !/[A-Z]/.test(password) || // At least one uppercase letter
      !/[a-z]/.test(password) || // At least one lowercase letter
      !/\d/.test(password) ||    // At least one digit
      !new RegExp(`[${specialChars}]`).test(password) || // At least one special character
      password.includes(" ") // No spaces allowed
    ) {
      return "Weak Password";
    }
  
    return "Strong Password";
  }



// Middleware for parsing JSON requests
app.use(express.json());

// Define a route with input validation
// app.post(
//   '/create-user',
//   [
//     body('username').isLength({ min: 5 }).withMessage('Username must be at least 5 characters long'),
//     body('email').isEmail().withMessage('Invalid email address'),
//   ],
//   (req, res) => {
    //     const errors = validationResult(req);
    //     if (!errors.isEmpty()) {
        //       return res.status(400).json({ errors: errors.array() });
        //     }
        
        //     // Process the valid input and create the user
        //     const { username, email } = req.body;
        //     const sanitizedData = {
            //         name: xss(name),
            //         email: xss(email),
            //         password: xss(password),
            //       };
            
            //     res.status(200).json({ message: 'User created successfully' });
            //   }
            // );
            
            
            // Login route
            app.post(
    '/login', 
    // [
        //     body('username').isLength({ min: 5 }).withMessage('Username must be at least 5 characters long'),
        //     body('email').isEmail().withMessage('Invalid email address'),
        // ],
        (req, res) => {
            const { username, password } = req.body;
    // checking if password is strong using checkWeakPassword
    // ...
    
    const sanitizedData = {
        username: xss(username),
        // email: xss(email),
        password: xss(password),
    };
    // Find the user based on the provided username
    const user = users.find((u) => u.username === username);
    
    // Check if the user exists and the password is correct
    if (!user || user.password !== password) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Generate a JWT token with the user's ID and role
    const token = jwt.sign({ id: user.id, role: user.role }, secretKey);
    
    // Return the token as the login response
    return res.status(200).json({ token });
});

// Protected route
app.get('/protected', (req, res) => {
    // Extract the token from the Authorization header
    const token = req.headers.authorization.split(' ')[1];
    
    try {
        // Verify and decode the JWT token
        const decoded = jwt.verify(token, secretKey);
        
        // Access the user's ID and role from the decoded token
        const userId = decoded.id;
        const userRole = decoded.role;
        
        // Perform authorization based on the user's role
        if (userRole === 'admin') {
            return res.status(200).json({ message: 'Access granted for admin user' });
        } else {
            return res.status(403).json({ error: 'Access denied' });
        }
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }
});

// Initialize the session middleware with secure options
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    store: new MemoryStore(), // Replace with your session store
    cookie: {
        httpOnly: true, // Ensures cookies are not accessible via client-side JavaScript
        secure: true, // Requires HTTPS for cookie transmission in production
        maxAge: 3600000, // Session timeout in milliseconds (e.g., 1 hour)
    },
}));

// Sample usage
app.get('/check-session', (req, res) => {
    const sessionStatus = checkSessionManagement(req);
    res.json({ sessionStatus });
});



app.listen(3000, () => {
  console.log('Server is running on port 3000');
});