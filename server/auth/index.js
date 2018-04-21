let passport = require('koa-passport');

import localStrategy from './localStrategy';
import JWTStrategy from './JWTStrategy';

passport = localStrategy(passport);
passport = JWTStrategy(passport);

//const User = require('../models/user');

//require('./serialize');

//require('./localStrategy');
//require('./JWTStrategy');



module.exports =  passport;
