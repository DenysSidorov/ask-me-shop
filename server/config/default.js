const defer = require('config/defer').deferConfig;
// const path = require('path');

module.exports = {
  // secret data can be moved to env variables
  // or a separate config
  secret:   'mysecret',
  mongoose: {
    uri:     'mongodb://localhost/app',
    options: {
      server: {
        socketOptions: {
          keepAlive: 1
        },
        poolSize:      5
      }
    }
  },
  crypto: {
    hash: {
      length:     128,
      iterations: process.env.NODE_ENV == 'production' ? 1200 : 1
    }
  },
  // template: {
  //   // template.root uses config.root
  //   root: defer(function(cfg) {
  //     return path.join(cfg.root, 'templates');
  //   })
  // },
  // root:     process.cwd()
};

