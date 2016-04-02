module.exports = {

  development: {
    client: 'postgresql',
    connection: 'postgres://localhost/book-catalogue'
  },

  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL
  }

};
