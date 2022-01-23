## Welcome to gitbot20211212

gitbot20211212 is a github app built with the Probot framework and linking with Slack. It functions pretty much, the same way the official github slack app does.

## Setting up
- Create a Github app
- Clone the Repo locally and install all required packages with either yarn or npm
- The probot framework should handle a good chuck of the setup for you. if lost check there site
- Create a slack app and fetch all thre required configs
- Authorize on github by installing the Github app

Your `.env` file should look something similar to this:
```
#github configs
WEBHOOK_PROXY_URL=https://smee.io/7MNwSL9LZ1z63jJ8
APP_ID=158111
PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----fdrwerwerwerwer-----END RSA PRIVATE KEY-----\n" #you generate this from the Github app
WEBHOOK_SECRET=xxxxxxxxxx #get from github as well
#slack configs
SLACK_SIGNING_SECRET=xxxxxxxxxx 
SLACK_BOT_TOKEN=xoxb-xxxx-xxxx-xxx 
CLIENT_ID=xxxxx.xxxx 
CLIENT_SECRET=0000000xxxx0000 
REDIRECT_URI=https://xxxxx.ngrok.io/github-bot/done
SLACK_OAUTH=https://slack.com/api/oauth.v2.access
#configs for the DB(postgres)
DB_USER=xxxx 
DB_PASSWORD=xxxx
DB_NAME=xxxx
```

### What can this app do:

- [x] Send slack notification when an issue is opened and closed with details
- [x] Send slack notification when asssigned a PR


### Support or Contact

- [x] [LinkedIn](https://www.linkedin.com/in/kamau-maina-7b6a1b178/)
- Email : lewiikamaa8@gamil.com
