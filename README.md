# Jackson Locals Google Actions

## You can ask

- What's Woody's forecast?

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
# then "talk to jackson locals"
```

### Logs
```
gcloud app logs read -s default
```

## TODO

- [ ] Road Conditions
- [ ] Avy Conditions
