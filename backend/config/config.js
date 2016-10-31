var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'backend'
    },
    port: process.env.PORT || 3001,
    db: process.env.MONGODB || 'mongodb://localhost/festival-backend-development',
    jwt: {
      secretOrKey: 'secret',
      authScheme: 'Bearer'
    },
    github: {
      admin: {
        clientId: '',
        clientSecret: ''
      }
    },
    cors: {
      origin: [
        'http://localhost:3000',
        'http://localhost:3003',
      ]
    }
  },

  test: {
    root: rootPath,
    app: {
      name: 'backend'
    },
    port: process.env.PORT || 3030,
    db: process.env.MONGODB || 'mongodb://db/festival-backend-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'backend'
    },
    port: process.env.PORT || 3030,
    db: process.env.MONGODB || 'mongodb://db/festival-backend-production'
  }
};

module.exports = config[env];
