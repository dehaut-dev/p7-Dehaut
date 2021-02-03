const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/user');

const app = express();

app.use(cors())
app.use(express.json())

var mysql = require('mysql');

var con = mysql.createConnection({
  database: 'defaults',
  host: 'localhost',
  user: 'root',
  password: 'toor'
  
});
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.use(bodyParser.json());

app.use('/api/auth', userRoutes);


module.exports = app;
