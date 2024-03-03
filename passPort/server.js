const express = require('express');
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
require('./gglauth')
require('./githubb')
const app = express();
const path = require ('path');
const bcrypt = require('bcrypt')
const passport = require('passport');
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const { checkAuthenticated, checkNotAuthenticated } = require('./middelle/auth')

// Initialize Passport
const initializePassport = require('./passport-config');
const { name } = require('ejs');
initializePassport(
    passport, 
    email => users.find(user => user.email === email),
    id => users.find(user => user.id ===id)
)

// Session Configuration
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    // cookie: { secure: false}
}))

// Other Middleware
app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(methodOverride('_method'));
app.use(passport.initialize());
app.use(passport.session());
app.use (express.json ());
app.use (express.static (path.join (__dirname, 'client')));
// 
// gor google
function isLoggedIn (req, res, next) {
    req.user ? next () : res.sendStatus (401);
  }
  
  app.get ('/', (req, res) => {
    res.sendFile ('index.html');
  });
// Routes
app.get('/', checkAuthenticated, (req, res) => {
    res.render('index.ejs', { name: req.user.name }) 
})

app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login.ejs')
})

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))

app.get('/registers', checkNotAuthenticated, (req, res) => {
    res.render('register.ejs')
})

app.post('/register', checkNotAuthenticated, async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        res.redirect('/login')
    } catch {
        res.redirect('/register')
    }
    console.log(users)
})

app.delete('/logout', (req, res) => {
    req.logOut();
    res.redirect('/login')
})

app.get('/auth/google',
    passport.authenticate('google', { scope: ['email', 'profile'] })
);

app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/auth/protected',
        failureRedirect: '/auth/google/failure'
    })
);

app.get('/auth/protected', isLoggedIn, (req, res) => {
    let name = req.user.displayName;
    res.send (`Hello ${name}`);
})

app.get('/auth/google/failure', (req, res) => {
    res.send("Something went wrong")
})
app.get('/offline', (req, res) => {
    req.logOut((err)=>{});
    res.send('See you again')
})
// for git hub
app.get('/auth/error', 
(req, res) =>
 res.send('Unknown Error'))

app.get('/auth/github',passport.authenticate('github',
{ scope: [ 'user:email' ] }));

app.get('/auth/github/callback',passport.authenticate('github', { failureRedirect: '/auth/error' }),
function(req, res) {
  res.send('Successfuly login with Githubaccount');
;
});
const users = []
const PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
