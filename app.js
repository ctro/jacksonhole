// [START app]
'use strict';

// Speech Synthesis Markup Language
// SSML Ref: https://developers.google.com/actions/reference/ssml

// Jim updates his forecast most mornings here:
// http://www.mountainweather.com/forecast/forecast.mp3

// I think audio source has to be https. Neither of the following seem to work :(
// 1. https google url shortener to above url
// 2. upload of one forecast mp3 to google equiv of S3

var QA = require('./qa');

process.env.DEBUG = 'actions-on-google:*';

let ActionsSdkAssistant = require('actions-on-google').ActionsSdkAssistant;
let express = require('express');
let bodyParser = require('body-parser');

let app = express();
app.set('port', (process.env.PORT || 8080));
app.use(bodyParser.json({
  type: 'application/json'
}));

app.post('/', function (request, response) {
  console.log('handle post');

  // QA runs the show.
  var qa = new QA();

  const assistant = new ActionsSdkAssistant({
    request: request,
    response: response
  });

  function mainIntent (assistant) {
    console.log('mainIntent');
    let inputPrompt = assistant.buildInputPrompt(true, qa.greeting, qa.no_inputs);
    assistant.ask(inputPrompt);
  }

  function rawInput (assistant) {
    console.log('rawInput');
    var command = assistant.getRawInput();
    var response = qa.map[command];

    if (response) {
      assistant.tell(response);
    } else {
      let inputPrompt = assistant.buildInputPrompt(true, '<speak>You said ' + assistant.getRawInput() + '</speak>', qa.no_inputs);
      assistant.ask(inputPrompt);
    }
  }

  let actionMap = new Map();
  actionMap.set(assistant.StandardIntents.MAIN, mainIntent);
  actionMap.set(assistant.StandardIntents.TEXT, rawInput);

  assistant.handleRequest(actionMap);
});

// Start the server
let server = app.listen(app.get('port'), function () {
  console.log('App listening on port %s', server.address().port);
  console.log('Press Ctrl+C to quit.');
});
// [END app]
