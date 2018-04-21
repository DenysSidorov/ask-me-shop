let passport = require('koa-passport');
import localStrategy from './localStrategy';

passport = localStrategy(passport);
//const User = require('../models/user');

//require('./serialize');

//require('./localStrategy');
//require('./JWTStrategy');



module.exports =  passport;
