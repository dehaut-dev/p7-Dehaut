const express = require('express');

const users = express.Router();
const userCtrl = require('../controllers/user');

users.post('/signup',  userCtrl.signup);
users.post('/login', userCtrl.login);

module.exports = users;
