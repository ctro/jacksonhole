// [START app]
'use strict';

// Speech Synthesis Markup Language
// SSML Ref: https://developers.google.com/actions/reference/ssml

// Jim updates his forecast most mornings here:
// http://www.mountainweather.com/forecast/forecast.mp3

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

    if (command === 'help') {
      let helpPrompt = assistant.buildInputPrompt(true, response, qa.no_inputs);
      assistant.ask(helpPrompt);
    } else if (response) {
      assistant.tell(response); // close the mic
    } else {
      let inputPrompt = assistant.buildInputPrompt(true, '<speak>I don\'t understand ' + assistant.getRawInput() + ', try again</speak>', qa.no_inputs);
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
