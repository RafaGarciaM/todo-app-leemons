const config = {
  port: Number(process.env.PORT) || 3000,

  database: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'leemons_app',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || '3306'
  }
}

module.exports = config
