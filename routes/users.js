'use strict';

var express = require('express');
var router = express.Router();

var User = require('../models/user');

router.get('/', function(req, res) {
  User.find({}, function(err, users) {
    res.status(err ? 400 : 200).send(err || users);
  });
});

router.get('/randomBeer', User.authMiddleware, function(req, res) {
  User.randomBeer(req.user, function(err, beer) {
    res.send(beer);
  });
});

router.post('/authenticate', function(req, res) {
  User.authenticate(req.body, function(err, user) {
    if(err) {
      res.status(400).send(err);
    } else {
      var token = user.generateToken();
      res.cookie('appCookie', token).send(user);
    }
  });
});

router.post('/register', function(req, res) {
  User.register(req.body, function(err, user) {
    var token = user.generateToken();
     if(err) {
      res.status(400).send(err);
    } else {
      var token = user.generateToken();
      res.cookie('appCookie', token).send(user);
    }
  });
});

router.delete('/authenticate', function(req, res) {
  res.clearCookie('appCookie').send();
});

module.exports = router;
