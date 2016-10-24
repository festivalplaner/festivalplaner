var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'backend'
    },
    port: process.env.PORT || 3030,
    db: process.env.MONGODB || 'mongodb://db/festival-backend-development'
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
