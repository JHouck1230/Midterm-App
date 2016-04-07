'use strict';

var express = require('express');
var router = express.Router();
var request = require('request');

require('dotenv').config();

var User = require('../models/user');

const BREWERY_DB_API = process.env.BREWERY_DB_API;

router.get('/', function(req, res) {
  User.find({}, function(err, users) {
    res.status(err ? 400 : 200).send(err || users);
  });
});

router.get('/beers/:page', function(req, res) {
  request.get(`https://api.brewerydb.com/v2/beers/?ibu="+0"&p=${req.params.page}&key=${BREWERY_DB_API}`, function(err, resp, body) {
    res.status(err ? 400 : 200).send(err || body);
  });
});

router.get('/beerDetail/:id', User.authMiddleware, function(req, res) {
  request.get(`https://api.brewerydb.com/v2/beer/${req.params.id}?key=${BREWERY_DB_API}`, function(err, resp, body) {
    res.status(err ? 400 : 200).send(err || body);
  });
});

router.post('/saveDetails/', User.authMiddleware, function(req, res) {
  User.findById(req.user.id, function(err, user) {
    user.beers.push(req.body);
    user.save(function(err, user) {
    res.status(err ? 400 : 200).send(err || user);
    });
  });
});

router.get('/profile', User.authMiddleware, function(req, res) {
  res.send(req.user);
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
