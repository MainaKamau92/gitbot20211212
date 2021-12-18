const {githubUserQuery} = require('../db/queries');
const {sendSlackMessage} = require("./slack");
const {pullRequestMessage} = require("./slack_messages");



const handleUserMessaging = (githubUserData, payload) => {
    switch(payload.action) {
        case 'review_requested':
            if(payload.sender.id.toString() !== githubUserData.githubUserID){
                let requesterUserName = payload.sender.login
                let prUrl = payload.pull_request.html_url
                let prMessage = pullRequestMessage(githubUserData.slackUserID, requesterUserName, prUrl)
                sendSlackMessage(githubUserData.slackBotToken, githubUserData.slackUserID, prMessage)
            }
            break;
    }
}

const routeUserMessaging = (context) => {
    let payload = context.payload
    const installationID = payload.installation.id
    const githubUser = githubUserQuery(installationID)
    githubUser.then(data => {
        let githubUserData = data[0]
        handleUserMessaging(githubUserData, payload)
    })
    .catch(err => {
        console.error(err)
    })
}


module.exports = {  routeUserMessaging }
