// [START app]
'use strict';

let greeting = '<speak>Jackson here,<break time="1"/>You can say ' +
  'mountain weather forecast,<break time="1"/>' +
  'mountain weather forecast two,<break time="1"/>' +
  'at what elevation do deer turn into elk<break time="1"/>' +
  '</speak>';

function respond (command) {
  if (command === 'later') {
    return ('Peace out river trout');
  } else if (command === 'at what elevation do deer turn into elk') {
    return ('Typically around 8000 feet, but as low as 6000 feet in areas where the doe-zone layer has been depleted');
  } else if (command === 'mountain weather forecast') {
    return ('<speak><audio src="https://goo.gl/nGE42R">MountainWeather Forecast</audio></speak>');
  } else if (command === 'mountain weather forecast two') {
    return ('<speak><audio src="https://00e9e64bac7279dd2fcc34da9fa061dbab148e2791dd8c3016-apidata.googleusercontent.com/download/storage/v1/b/mountain-weather-forecast/o/forecast.mp3?qk=AD5uMEumUEc8T6VwRw0GwYi-lAHQFuwgVdxMlbvBBYeIS2kCWQx03c2W14Mbg0QvmmnsHTPhLkR3mNmwHBDNNZYxVwRns--YQPfjl4-kowRbMlt6_bjqIBvWWqiB166SuZK0K_7w3QMQVJ5JrCxxVMEDZHwhyuat5DmqZwbCYm8sogS31q4AHzdaOr_oNHrtpwX96zk0kaqbd6RLuHj3aIYQeC6J_UlgI2AjiAXL7UBK1FHGahPaCHd1xpAi5hEM6t3ld4JHPtYDpieJIgKkiDxnTrdT_bUIxjhlFNXbEG5dTUw1PVq7KByR3CwC3ZvLfKN_wmneOAgZeFFRD4C5qrfJe4ZFFwCuQBiIbnoUqZpbR6-68g7y8uZwPM_-1C97zoP0CBysSMigewXo7UOl7B7Q7Uw9Z85NTDu0nhMvIbY6rHS5k7if3rGu_SZItOHcbZd4ALnzHb0IRzSuLluvDM-cnYKltIo-bb1jBWuykzX34hHTrBtWKu53xr_C_IB1HMn6hNtQ3y6r0-jEn20tLA313l1SyD5XiiTcdKwolBZV-GMKFYAQC63xaWiU3lPefofxkHk4EHuN8Ce4FuMi5EWAJlfUXYxSS-BN3EVy31e0HzYIUOgALlOva3LlCKy5-tB9k-mLkTkhfseBk_849VZ-ies69IZU-rX-6Ni7EmSd-SUKjD3n7swMKJjvHnWAmHlm4jJAzueUecLEvaafpFVUGzpKmxgVjTcQJWWG5ZzrWDrxh8SlGXuOIH91RwOBMylWBQfX5G2naksBd5yFgW2JnDgKdjhCKQYM7AA9CtrSXGH0GQBuS8M">MountainWeather Forecast</audio></speak>');
  } else {
    return false;
  }
}

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
  const assistant = new ActionsSdkAssistant({
    request: request,
    response: response
  });

  // SSML Ref: https://developers.google.com/actions/reference/ssml
  function mainIntent (assistant) {
    console.log('mainIntent');
    let inputPrompt = assistant.buildInputPrompt(true, greeting, ['Sorry, I didn\'t hear you', 'Are you still there?', 'Later, I\'m going skiing']);
    assistant.ask(inputPrompt);
  }

  // http://www.mountainweather.com/forecast/forecast.mp3

  function rawInput (assistant) {
    console.log('rawInput');
    var command = assistant.getRawInput();
    var response = respond(command);

    if (response) {
      assistant.tell(response);
    } else {
      let inputPrompt = assistant.buildInputPrompt(true, '<speak>You said ' + assistant.getRawInput() + '</speak>', ['I didn\'t catch that', 'Uhhhhhhhhh', 'Come again']);
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
