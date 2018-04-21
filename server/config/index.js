const config = {
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


