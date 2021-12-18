const {sequelize_conn} = require("./database");
const { DataTypes } = require('sequelize');

const User = sequelize_conn.define('User', {
    // Model attributes are defined here
    githubUserID: {
        type: DataTypes.STRING,
        allowNull: true
    },
    installationID: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    githubUserName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    slackUserID: {
        type: DataTypes.STRING,
        allowNull: true
    },
    slackBotToken: {
        type: DataTypes.TEXT,
        allowNull: true
    },
}, {
    // Other model options go here
});


sequelize_conn.sync({force: false})
.then(() => {
    console.log("Database table User created successfully!")
})

module.exports = {User}
