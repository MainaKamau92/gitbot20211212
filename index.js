const {createInitialGithubData, fetchInitialData, updateUserData, installDeletionQuery} = require("./db/queries");
const path = require('path');

const express = require('express');

const app_express = express();
app_express.use(express.static(path.join(__dirname, 'public')))
app_express.set('view engine', 'pug');
app_express.set('views', path.join(__dirname, 'views'));

const fetch = require('node-fetch');
const FormData = require('form-data');
const { routeUserMessaging } = require("./src/utils");

async function postData(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'POST',
    body: data,
  });
  return response.json();
}


module.exports = (app, { getRouter }) => {

  const router = getRouter("/github-bot");
  router.use(app_express);

  app.log.info(`Server started at ${new Date()}`);
  app.on(['pull_request.review_requested'], async (context) => routeUserMessaging(context))



  router.get("/setup", (req, res) => {
    const installationID = req.query.installation_id
    setTimeout(() => {
      console.log("This get called on setup called!")
      const querySet = fetchInitialData(installationID)
      querySet.then(data => {
        if(data.length === 1){
          let githubUserID = data[0].githubUserID
          res.render("slack-setup", {githubUserID: githubUserID});
        } else {
          res.send("Account already exists!")
        }
      })
      .catch((err) => console.error(err))
    }, 1000)

  });

  router.get("/done", (req, res) => {
    let githubUserID = req.query.state
    let form = new FormData();
    form.append('client_id', process.env.CLIENT_ID);
    form.append('client_secret', process.env.CLIENT_SECRET);
    form.append('code', req.query.code);
    form.append('grant_type', 'authorization_code');
    form.append('redirect_uri', process.env.REDIRECT_URI);
    const slackResponse = postData(process.env.SLACK_OAUTH, form).then(data => data).catch(error => console.error(error));
    slackResponse.then(data => {
      let slackBotToken = data.access_token
      let slackUserID = data.authed_user.id
      updateUserData(githubUserID, slackUserID, slackBotToken).then(data => data).catch(error => console.error(error))
      res.render("success");
    })
    .catch(error => {
      console.error(error)
      res.render("error");
    })
  })

  router.post("/slack/events", (req, res) => {
    console.log(res)
  })


  app.on("installation.created", async (context) => {
    let userDetails = context.payload.installation.account
    let githubUserID = userDetails.id
    let githubUserUsername = userDetails.login
    let installationID = context.payload.installation.id
    let newUser = createInitialGithubData(githubUserID, githubUserUsername, installationID)
    newUser.then(data => {
      console.log(`New user created, data: ${data}`)
    })
    .catch(err => {
      console.error(err + "Error creating new user!")
    })
    return console.info("Successfully ran the on installation webhook!");
  });

  app.on("installation.deleted", async (context) => {
    let installationID = context.payload.installation.id
    let user = await installDeletionQuery(installationID)
    console.log(user)
    return console.info("Successfully ran the on uninstall webhook!");
  })
};
