const config = {
  server: {
    httpPort: 3003,
    httpsPort: 3004
  },
  // front:{
  //   localPort: 3005
  // },
  crypto: {
    saltLength: 10
  },
  jwt:{
    secret: 'verysecretword'
  },
  mongoConnect: {
    path: 'mongodb://localhost/test',
    config: {
      poolSize: 5
    },
  }
}

export default config;


