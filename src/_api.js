const { sendSlackMessage } = require("./slack")
const { pullRequestMessage, issueOpenedMessage, issueClosedMessage, pullRequestAssignedMessage } = require("./slack_messages")


const handlePullRequests = (payload, githubUserData) => {
    switch(payload.action) {
        case 'review_requested':
            if(payload.sender.id.toString() !== githubUserData.githubUserID){
                let requesterUserName = payload.sender.login
                let prUrl = payload.pull_request.html_url
                let prBlockMessage = pullRequestMessage(githubUserData.slackUserID, requesterUserName, prUrl, payload)[0]
                let prTextMessage = pullRequestMessage(githubUserData.slackUserID, requesterUserName, prUrl, payload)[1]
                sendSlackMessage(slackBotToken=githubUserData.slackBotToken, blockMessage=prBlockMessage, textMessage=prTextMessage, channelID=githubUserData.slackUserID)
            } else {
                console.error("User is requesting their own review!")
            }
            break;
        case 'assigned':
            let assignedPRBlockMessage = pullRequestAssignedMessage(payload)[0]
            let assignedPRTextMessage = pullRequestAssignedMessage(payload)[1]
            let assignedPRAttachmentBlock = pullRequestAssignedMessage(payload)[2]
            sendSlackMessage(slackBotToken=githubUserData.slackBotToken, blockMessage=assignedPRBlockMessage,
                textMessage=assignedPRTextMessage, channelID=githubUserData.slackUserID, attachmentSection=assignedPRAttachmentBlock)
            break;

    }
}

const handleIssues = (payload, githubUserData) => {
    switch(payload.action) {
        case 'opened':
            const issueOpenedMsg = issueOpenedMessage(payload)
            const issueBlockMessage = issueOpenedMsg[0]
            const issueTextMessage = issueOpenedMsg[1]
            const attachmentBlock = issueOpenedMsg[2]
            sendSlackMessage(slackBotToken=githubUserData.slackBotToken, blockMessage=issueBlockMessage,
                textMessage=issueTextMessage, channelID=githubUserData.slackUserID, attachmentSection=attachmentBlock)
            break;
        case 'closed':
            const issueClosedMsg = issueClosedMessage(payload)
            const issueClosedBlockMessage = issueClosedMsg[0]
            const issueClosedTextMessage = issueClosedMsg[1]
            const attachmentIssueClosedBlock = issueClosedMsg[2]
            sendSlackMessage(slackBotToken=githubUserData.slackBotToken, blockMessage=issueClosedBlockMessage,
                textMessage=issueClosedTextMessage, channelID=githubUserData.slackUserID, attachmentSection=attachmentIssueClosedBlock)
            break;

    }
}


module.exports = { handlePullRequests, handleIssues }