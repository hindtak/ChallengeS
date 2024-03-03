const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser')
const csurf = require('csurf');
const { body, validationResult } = require('express-validator');


const app = express();

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: false }));
app.use(cookieParser());
app.set('view engine', 'ejs');
app.use(csurf({ cookie: true }));
let database = {};

// Routes
app.get('/', (req, res) => {
  res.render('index', { csrfToken: req.csrfToken() });
});
// code added
app.post('/login', 
  body("username", "password").isLength({ min: 1, max:10}).trim().escape(),
  (req, res) => {
    const  errors = validationResult(req);
    if(!errors.isEmpty()){
      res.status(400).json({ errors: errors.array()});
    }

  const { username, password } = req.body;
  console.log(req.csrfToken());
  if(req.csrfToken() !== req.body._csrf) {
    return res.status(403).send("Invalid CSRF token");
  }

  if (username === 'admin' && password === 'password') {
    req.session.isAuthenticated = true;
    res.redirect('/dashboard');
  } else {
    res.redirect('/');
  }
});

app.get('/dashboard', (req, res) => {
  // Secure the dashboard route to only allow authenticated users
  if (req.session.isAuthenticated) {
    res.render('dashboard');
  } else {
    res.redirect('/');
  }
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
