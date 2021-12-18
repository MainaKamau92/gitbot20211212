const {App} = require("@slack/bolt");


const sendSlackMessage = (slackBotToken, slackUserID, message, channel=null) => {
    const app = new App({ token: slackBotToken, signingSecret: process.env.SLACK_SIGNING_SECRET });
    app.client.chat.postMessage({
        text: message,
        channel: channel !== null ? channel : slackUserID,
    }).then(res => res).catch(err => console.error(err))
}

module.exports = { sendSlackMessage }
