const config  = {
  crypto: {
    saltLength: 10
  },
  mongoConnect : {
    path: 'mongodb://localhost/test',
    config:{
      server: {
        socketOptions: {
          keepAlive: 1
        },
        poolSize: 5
      }
    },
  }
}

export default config;


