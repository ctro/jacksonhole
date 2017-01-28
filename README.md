# Jackson Locals Google Actions

## Development

### Setup
```
gcloud auth login
gcloud config set project wired-victor-155621
```

### Deploy
```
gcloud app deploy
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
npm install
npm test
```

Don't be surprised: `semistandard --fix` changes things for you.
## TODO
- [x] Simple text answer
- [ ] Woody's forecast
- [ ] Road Conditions ?
- [ ] Avy Conditions ?
- [ ] I wonder if BlueText is interested in this stuff?  Food Deals?  "Lunch Special Right Now"?b
