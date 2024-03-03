// 
const express = require("express");
const router = express.Router();
const registration = require("../controle/registerControle");
const register = require("../controle/registerControle");

router.post('/login', register)