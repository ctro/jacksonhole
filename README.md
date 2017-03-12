# Jackson Locals Google Actions

## Google API Registration
Dashboard:
https://console.developers.google.com/projectselector/apis/api/actions.googleapis.com/overview

Review Status: https://console.developers.google.com/apis/api/actions.googleapis.com/deployments?project=wired-victor-155621&organizationId=271313418688

## Development

[Install the client](https://cloud.google.com/sdk/)
[Install the gactions cli](https://developers.google.com/actions/tools/gactions-cli)

## NodeJS

Ubuntu instructions:
```sh
sudo apt-get install nodejs npm nodejs-legacy
```

### Setup
```
gcloud auth login
gcloud config set project wired-victor-155621
```

### Deploy the app
```
gcloud app deploy
```

### Deploy the API, which is different?
This increments the version of the deployed Action and sets it to Review.
Use Preview below for dev.
```
gactions deploy --action_package action.json --project wired-victor-155621
```

### Preview
```
gactions preview -action_package=action.json -invocation_name="jackson locals"
gactions simulate
# apple-click on the link, or type `talk to jackson locals`
```

**Note:** You need to say "talk to jackson locals" before every query.

### Logs
```
gcloud app logs read -s default
```

### Tests
- [semistandard lint](https://github.com/Flet/semistandard)
- Mocha/Chai specs in `test.js`

Run tests
```
npm install semistandard
npm install
npm test
```

Don't be surprised: `semistandard --fix` changes things for you.
## TODO
- [x] Simple text answer
- [x] Woody's forecast
- [ ] Road Conditions ?
- [ ] Avy Conditions ?
- [ ] I wonder if BlueText is interested in this stuff?  Food Deals?  "Lunch Special Right Now"?
