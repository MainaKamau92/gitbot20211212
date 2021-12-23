const {githubUserQuery} = require('../db/queries');
const { handlePullRequests, handleIssues } = require('./_api');



const handleUserMessaging = (githubUserData, payload, contextAction) => {
    switch(contextAction) {
        case 'pull_request':
            handlePullRequests(payload, githubUserData);
            break;
        case 'issues':
            handleIssues(payload, githubUserData);
            break;
    }
}

const routeUserMessaging = (context, contextAction) => {
    let payload = context.payload
    const installationID = payload.installation.id
    const githubUser = githubUserQuery(installationID)
    githubUser.then(data => {
        let githubUserData = data[0]
        handleUserMessaging(githubUserData, payload, contextAction)
    })
    .catch(err => {
        console.error(err)
    })
}


module.exports = {  routeUserMessaging }
