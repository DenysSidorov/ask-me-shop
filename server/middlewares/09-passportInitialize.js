// const passport = require('../libs/passport');

// - инициализовать ctx.req._passport (вспомогательный контекст, нам не понадобится)
// - сделать на ctx методы
//   ctx.login(user)
//   ctx.logout()
//   ctx.isAuthenticated()
// @see https://github.com/rkusa/koa-passport/blob/master/lib/framework/koa.js
// @see https://github.com/jaredhanson/passport/blob/master/lib/middleware/initialize.js

// module.exports = passport.initialize();

// const passport = require('koa-passport'); //реализация passport для Koa
const LocalStrategy = require('passport-local'); //локальная стратегия авторизации
const JwtStrategy = require('passport-jwt').Strategy; // авторизация через JWT
const ExtractJwt = require('passport-jwt').ExtractJwt; // авторизация через JWT

const jwtsecret = "mysecretkey"; // ключ для подписи JWT
const jwt = require('jsonwebtoken'); // аутентификация по JWT для hhtp
const socketioJwt = require('socketio-jwt'); // аутентификация по JWT для socket.io

// TODO ТУТ ЗАКОНЧИЛ!!!
const passport = require('../auth/index');
export default passport.initialize(); // сначала passport