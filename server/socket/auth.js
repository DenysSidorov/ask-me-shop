const jwt = require('jsonwebtoken');
import config from '../config/index';

export default function(socket, next) {
  function getCookie(name) {
    var cookie = socket.handshake.headers.cookie;
    var matches = cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }
  var cookieToken = getCookie('t');

  try {
    var decoded = jwt.verify(cookieToken, config.jwt.secret);
    console.log(decoded, "(*)-(*)");
    next();
  } catch(err) {
    console.log(err);
    next(err)
  }
}