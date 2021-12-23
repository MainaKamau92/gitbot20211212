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


const handleIssueMessages = (payload, preText, issueType) => {
    const issueUrl = payload.issue.html_url
    const issueTitle = payload.issue.title
    const issueSender = payload.issue.user.login
    const repoName = payload.repository.full_name
    const repoUrl = payload.repository.html_url
    const senderImageURL = payload.sender.avatar_url
    const authorLink = payload.sender.html_url
    const repoLink = `<${repoUrl}|${repoName}>`
    const issueTS = new Date(payload.issue.updated_at).getTime()
    
    if(issueType === 'opened'){
        return `
        {
            "attachments": [
                {
                    "fallback": "${preText}",
                    "color": "#00a74b",
                    "pretext": "${preText}",
                    "author_name": "${issueSender}",
                    "author_link": "${authorLink}",
                    "author_icon": "${senderImageURL}",
                    "title": "${issueTitle}",
                    "title_link": "${issueUrl}",
                    "footer": "${repoLink}",
                    "footer_icon": "https://cdn.pixabay.com/photo/2021/09/11/12/17/github-6615451_1280.png",
                    "ts": ${issueTS}
                }
            ]
        }
        `
    } else if(issueType === 'closed'){
        return `
        {
            "attachments": [
                {
                    "fallback": "${preText}",
                    "color": "#8355cc",
                    "pretext": "${preText}",
                    "author_name": "${issueSender}",
                    "author_link": "${authorLink}",
                    "author_icon": "${senderImageURL}",
                    "title": "${issueTitle}",
                    "title_link": "${issueUrl}",
                    "footer": "${repoLink}",
                    "footer_icon": "https://cdn.pixabay.com/photo/2021/09/11/12/17/github-6615451_1280.png",
                    "ts": ${issueTS}
                }
            ]
        }
        `
    }

}

const pullRequestMessage = (slackUserID, requesterUserName, prUrl, payload) => {
    let prTitle, repoName, updateDate, requesterProfile;
    [prTitle, repoName, updateDate, requesterProfile] = [payload.pull_request.title, payload.repository.full_name, payload.pull_request.updated_at, payload.sender.html_url]
    const blockMessage = blockKitMsg(prTitle, repoName, updateDate, `<@${slackUserID}>`,
        prUrl, `<${requesterProfile}|${requesterUserName}.>`, `<${prUrl}|review>`)
    const textMessage = `New Pull Request Review`
    return [JSON.parse(blockMessage).blocks, textMessage]
}

const issueOpenedMessage = (payload) => {
    const attachmentSection = handleIssueMessages(payload, preText="Issue opened.", issueType="opened")
    return [null, null, JSON.parse(attachmentSection).attachments];
}


const issueClosedMessage = (payload) => {
    const attachmentSection = handleIssueMessages(payload, preText="Issue closed.", issueType="closed")
    return [null, null, JSON.parse(attachmentSection).attachments];
}

module.exports = {pullRequestMessage, issueOpenedMessage, issueClosedMessage}
