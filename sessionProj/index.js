const express = require('express');
const sessions = require('express-session');
const ProcessLoginHandler = require('./models/processLog');

const router = require('./controle/registerControle')
const { validateUser } = require('./models/user');



const app = express();

app.use(
  sessions({
    secret: 'some secret',
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 24 hours
    },
    resave: true,
    saveUninitialized: false,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// @todo register routes

app.get('/login', LoginHandler);
app.post('/process-login', ProcessLoginHandler);

app.listen(3000, () => {
  console.log(`Server Running at port 3000`);
});