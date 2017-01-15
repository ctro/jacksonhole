// [START app]
'use strict';

process.env.DEBUG = 'actions-on-google:*';

let ActionsSdkAssistant = require('actions-on-google').ActionsSdkAssistant;
let express = require('express');
let bodyParser = require('body-parser');

let app = express();
app.set('port', (process.env.PORT || 8080));
app.use(bodyParser.json({type: 'application/json'}));

app.post('/', function (request, response) {
  console.log('handle post');
  const assistant = new ActionsSdkAssistant({request: request, response: response});

  // SSML Ref: https://developers.google.com/actions/reference/ssml
  function mainIntent (assistant) {
    console.log('mainIntent');
    let inputPrompt = assistant.buildInputPrompt(true,
      '<speak>Jackson here,<break time="1"/>You can say ' +
      'mountain weather forecast,<break time="1"/>' +
      'at what elevation do deer turn into elk<break time="1"/>' +
      '</speak>',
          ['Sorry, I didn\'t hear you', 'Are you still there?'', 'Later, I\'m going skiing']);
    assistant.ask(inputPrompt);
  }

  //http://www.mountainweather.com/forecast/forecast.mp3

  function rawInput (assistant) {
    console.log('rawInput');
    if (assistant.getRawInput() === 'goodbye') {
      assistant.tell('<speak>Peace out river trout</speak>');
    }
    else if (assistant.getRawInput() === 'at what elevation do deer turn into elk') {
      assistant.tell('<speak>Typically around 8000 feet, but as low as 6000 feet in areas where the doe-zone layer has been depleted</speak>');
    }
    else if (assistant.getRawInput() === 'mountain weather forecast') {
      assistant.tell('<speak><audio src="https://goo.gl/nGE42R">MountainWeather Forecast</audio></speak>');
    } else {
      let inputPrompt = assistant.buildInputPrompt(true, '<speak>You said ' + assistant.getRawInput() + '</speak>',
          ['I didn\'t catch that', 'Uhhhhhhhhh', 'Come again']);
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
