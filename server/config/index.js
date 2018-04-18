const config  = {
  crypto: {
    saltLength: 10
  },
    mongoConnect : {
    path: 'mongodb://localhost/test',
    config:{
      poolSize: 5
    },
  }
}

export default config;


