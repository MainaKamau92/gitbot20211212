const {User} = require("./syncDB");

const createInitialGithubData = (githubUserID, githubUserName, installationID) => {
    return User.findAll({ where: {githubUserID: githubUserID.toString()} })
        .then(data => {
            if(data.length < 1){
                User.create({
                    githubUserID: githubUserID,
                    installationID: installationID,
                    githubUserName: githubUserName,
                    slackUserID: null,
                    slackBotToken: null
                }).then((data) => data)
                    .catch((err) => console.error(err))
            } else {
                console.info(data)
            }
        })
        .catch(err => {
            console.error(err)
        });
}

const fetchInitialData = async (installationID) => {
  try {
        let initialData;
        initialData = await User.findAll({ where: { installationID: installationID.toString() } });
        return initialData;
    } catch (err) {
        return console.error(err);
    }
}
const installDeletionQuery = async (installationID) => {
    try {
        let initialData;
        initialData = await User.destroy({ where: { installationID: installationID.toString() } });
        return initialData;
    } catch (err) {
        return console.error(err);
    }
}

const updateUserData = async (githubUserID, slackUserID, slackBotToken) => {
    try {
        let initialData;
        initialData = await User.update({ slackUserID: slackUserID, slackBotToken: slackBotToken }, { where: { githubUserID: githubUserID.toString() } });
        return initialData;
    } catch (err) {
        return console.error(err);
    }
}

const githubUserQuery = async (installationID) => {
    try {
        let userData;
        userData = await User.findAll({ where: { installationID: installationID.toString() } });
        return userData;
    } catch (err) {
        return console.error(err);
    }
}

module.exports = {createInitialGithubData, fetchInitialData, installDeletionQuery, updateUserData , githubUserQuery};
