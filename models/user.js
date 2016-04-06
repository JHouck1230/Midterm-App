'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var jwt = require('jwt-simple');
var request = require('request');

require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;
const BREWERY_DB_API = process.env.BREWERY_DB_API;

var User;

var userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  image: String,
  beers: [{
    id: { type: String, required: true },
    name: { type: String, required: true },
    sampled: { type: String, default: "" },
    rating: Number,
    comments: String
  }]
});

userSchema.statics.authMiddleware = function(req, res, next) {
  var token = req.cookies.appCookie;
  try {
    var payload = jwt.decode(token, JWT_SECRET);
  } catch(err) {
    return res.clearCookie('appCookie').status(401).send();
  }

  User.findById(payload.userId).select({password: 0}).exec(function(err, user) {
    if(err || !user) {
      return res.clearCookie('appCookie').status(401).send(err);
    }
    req.user = user;
    next();
  });
};


userSchema.methods.generateToken = function () {
  var payload = {
    userId: this._id,
    iat: Date.now()
  };
  var token = jwt.encode(payload, JWT_SECRET);
  return token;
};

userSchema.statics.authenticate = function(userObj, cb) {
  User.findOne({email: userObj.email}, function(err, dbUser) {
    if(err || !dbUser) {
      return cb("Authentication failed.");
    }
    bcrypt.compare(userObj.password, dbUser.password, function(err, isGood) {
      if(err || !isGood) {
        return cb("Authentication failed.");
      }
      dbUser.password = null;
      cb(null, dbUser);
    });
  });
};

userSchema.statics.register = function(userObj, cb) {
  bcrypt.hash(userObj.password, 10, function(err, hash) {
    if(err) {
      return cb(err);
    }
    User.create({
      email: userObj.email,
      name: userObj.name,
      password: hash
    }, function(err, user) {
      if(err) {
        cb(err);
      } else {
        user.password = null;
        cb(err, user);
      }
    });
  });
};

userSchema.statics.randomBeer = function(user, cb) {
  request.get(`http://api.brewerydb.com/v2/beer/random/?key=${BREWERY_DB_API}`, function(err, res, body) {
    // if(user.beers.length) { 
    //   user.beers.forEach(beer => {
    //     if (beer.id === body.data.id) {
    //       User.randomBeer();
    //     } else {
          cb(err, body);
    //     }
    //   })
    // }
  })
}

User = mongoose.model('User', userSchema);

module.exports = User;
