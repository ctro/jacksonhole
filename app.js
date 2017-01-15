// Copyright 2016, Google, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

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
    let inputPrompt = assistant.buildInputPrompt(true, '<speak>Jackson here,<break time="1"/> ' +
          'You can say mountain weather forecast</speak>',
          ["Sorry, I didn't hear you", "Are you still there?", "Later, I'm going skiing"]);
    assistant.ask(inputPrompt);
  }

  //http://www.mountainweather.com/forecast/forecast.mp3

  function rawInput (assistant) {
    console.log('rawInput');
    if (assistant.getRawInput() === 'bye') {
      assistant.tell('<speak>Peace out river trout</speak>');
    }
    else if (assistant.getRawInput() === 'mountain weather forecast') {
      assistant.tell('<speak><audio src="https://goo.gl/nGE42R">MountainWeather Forecast</audio></speak>');
    } else {
      let inputPrompt = assistant.buildInputPrompt(true, '<speak>You said ' + assistant.getRawInput() + '</speak>',
          ["I didn't catch that", "Uhhhhhhhhh", "Come again"]);
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
