//Set up Passport.js and related middleware
const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

//Upgrade Login and Registration:
passport.use(new LocalStrategy(
    (username, password, done) => {
      const user = users.find(user => user.username === username);
      if (!user) return done(null, false);
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) return done(null, user);
        return done(null, false);
      });
    }
  ));

//app.post('/login', 
passport.authenticate('local', { successRedirect: '/dashboard', failureRedirect: '/login' })
);

//app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword });
    res.redirect('/login');
  });

//passport.serializeUser((user, done) => {
    done(null, user.username);
});

passport.deserializeUser((username, done) => {
  const user = users.find(user => user.username === username);
  done(null, user);
});


//Logout Functionality
app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
  });

//Bonus: Profile Management
app.get('/profile', (req, res) => {
    if (req.isAuthenticated()) {
      res.send(`Welcome to your profile, ${req.user.username}!`);
    } else {
      res.redirect('/login');
    }
  });
  
  app.post('/profile/update', async (req, res) => {
    if (req.isAuthenticated()) {
      const { newPassword } = req.body;
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      req.user.password = hashedPassword;
      res.send('Password updated successfully!');
    } else {
      res.redirect('/login');
    }
  });
  