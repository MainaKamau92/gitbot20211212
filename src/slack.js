const {App} = require("@slack/bolt");


const appInstance = (slackBotToken) => new App({ token: slackBotToken, signingSecret: process.env.SLACK_SIGNING_SECRET });


const sendSlackMessage = (slackBotToken, blockMessage, textMessage, channelID, attachmentSection=null) => {
    const app = appInstance(slackBotToken)
    app.client.chat.postMessage({
        text: textMessage,
        channel: channelID,
        blocks: blockMessage,
        attachments: attachmentSection
    }).then(res => res).catch(err => console.error(err))
}

const deleteSlackMessage = (slackBotToken, slackMessageID, channelID) => {
    try {
        const app = appInstance(slackBotToken)
        const result = app.client.chat.delete({
            channel: channelID,
            ts: slackMessageID
        });
        console.log(result);
    }
    catch (error) {
        console.error(error);
    }
}

const getSlackMessages = (slackBotToken, channelId) => {
    try {
        const app = appInstance(slackBotToken)
        const result = app.client.conversations.history({ channel: channelId });
        const conversationHistory = result.messages;
        console.log(conversationHistory.length + " messages found in " + channelId);
        return conversationHistory
    }
    catch (error) {
        console.error(error);
    }
}
module.exports = { sendSlackMessage, deleteSlackMessage, getSlackMessages }
