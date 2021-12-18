
const pullRequestMessage = (slackUserID, requesterUserName, prUrl) => {
    return `<@${slackUserID}>, ${requesterUserName} has requested a review on <${prUrl}|Pull Request.>`
}

module.exports = {pullRequestMessage}
