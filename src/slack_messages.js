
const blockKitMsg = (prTitle, repoName, prDate, slackUser, prUrl, requesterUserName, review) =>
    `{
        "blocks": [
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": "${slackUser}"
            }
        },
        {
            "type": "header",
            "text": {
                "type": "plain_text",
                "text": ":loudspeaker:  New review request :tada: :confetti_ball:"
            }
        },
        {
            "type": "context",
            "elements": [
                {
                    "text": "${new Date(prDate)}",
                    "type": "mrkdwn"
                }
            ]
        },
        {
            "type": "divider"
        },
        {
            "type": "header",
            "text": {
                "type": "plain_text",
                "text": "${prTitle}"
            }
        },
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": "You have a new ${review} request on repo \`${repoName}\`"
            },
            "accessory": {
        "type": "button",
            "text": {
            "type": "plain_text",
            "text": "Review PR"
            },
            "url": "${prUrl}"
            }
        },
        {
            "type": "divider"
        },
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": "Pull request review was sent by ${requesterUserName}"
            }
        }
            
    ]
    }`



const pullRequestMessage = (slackUserID, requesterUserName, prUrl, payload) => {
    let prTitle, repoName, updateDate, requesterProfile;
    [prTitle, repoName, updateDate, requesterProfile] = [payload.pull_request.title, payload.repository.full_name, payload.pull_request.updated_at, payload.sender.html_url]
    const blockMessage = blockKitMsg(prTitle, repoName, updateDate, `<@${slackUserID}>`,
        prUrl, `<${requesterProfile}|${requesterUserName}.>`, `<${prUrl}|review>`)
    const textMessage = `New Pull Request Review`
    return [blockMessage, textMessage]

}

module.exports = {pullRequestMessage}
