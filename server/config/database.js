const config = {
  development: {
    username: 'postgres',
    password: null,
    database: 'more-recipes',
    host: '127.0.0.1',
    dialect: 'postgres',
    logging: false
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql'
  },
  production: {
    username: 'bqjpeeca',
    password: 'RSjTU1TvgCmX34JnLboYYNiKSstDr0WQ',
    database: 'bqjpeeca',
    host: 'stampy.db.elephantsql.com',
    dialect: 'postgres',
    logging: false
  }
};

module.exports = config;