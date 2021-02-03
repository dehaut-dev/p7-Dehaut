const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.signup = (req, res, next) => {

  const userData = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
  };

  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((user) => {
      if (!user) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {  
          userData.password = hash;  
          User.create(userData)  
            .then((userCreated) => {
              res.json({ status: `${userCreated.email} enregistré!` });
            })
            .catch((error) => {
              res.send(`error: ${error}`);
            });
        });
      } else {
        res.json({ error: `${req.body.email} existe déjà!` });
      }
    })
    .catch((error) => {
      res.send(`error: ${error}`);
    });
};

exports.login = (req, res, next) => { 
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur ou mot de passe erroné' });
      }
      bcrypt.compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: 'Utilisateur ou mot de passe erroné' });
          }
          res.status(200).json({
            token: jwt.sign(
              { id: user.id }, 
              'b04f899078d8405c8a9dc8531f1a98d2',
              { expiresIn: '24h' },
            ),
            userId: user.id,
            email: user.email,
            
          });
          console.log(`${user.email} s'est connecté`);
        });
    })
    .catch((err) => {
      res.status(400).json({ error: err });
    });
};
