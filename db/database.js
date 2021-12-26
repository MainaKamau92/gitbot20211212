const { Sequelize } = require('sequelize');

const sequelize_conn = new Sequelize('postgres://user:password@localhost:5432/githubbot')
sequelize_conn.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
    })

module.exports = {sequelize_conn}
