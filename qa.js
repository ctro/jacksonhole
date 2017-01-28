module.exports = function QA () {
  this.greeting = '<speak>Howdy,<break time="1"/>Say help if you\'re new here.</speak>';

  this.map = {
    'later': '<speak>Peace out river trout</speak>',
    'elk joke': '<speak>At what elevation do deer turn into elk?<break time="1"/>Typically around 8000 feet, but as low as 6000 feet in areas where the doe-zone layer has been depleted</speak>',
    'mountain weather forecast': '<speak><audio src="https://goo.gl/nGE42R">MountainWeather Forecast</audio></speak>',
    'mountain weather forecast two': '<speak><audio src="https://00e9e64bac7279dd2fcc34da9fa061dbab148e2791dd8c3016-apidata.googleusercontent.com/download/storage/v1/b/mountain-weather-forecast/o/forecast.mp3?qk=AD5uMEumUEc8T6VwRw0GwYi-lAHQFuwgVdxMlbvBBYeIS2kCWQx03c2W14Mbg0QvmmnsHTPhLkR3mNmwHBDNNZYxVwRns--YQPfjl4-kowRbMlt6_bjqIBvWWqiB166SuZK0K_7w3QMQVJ5JrCxxVMEDZHwhyuat5DmqZwbCYm8sogS31q4AHzdaOr_oNHrtpwX96zk0kaqbd6RLuHj3aIYQeC6J_UlgI2AjiAXL7UBK1FHGahPaCHd1xpAi5hEM6t3ld4JHPtYDpieJIgKkiDxnTrdT_bUIxjhlFNXbEG5dTUw1PVq7KByR3CwC3ZvLfKN_wmneOAgZeFFRD4C5qrfJe4ZFFwCuQBiIbnoUqZpbR6-68g7y8uZwPM_-1C97zoP0CBysSMigewXo7UOl7B7Q7Uw9Z85NTDu0nhMvIbY6rHS5k7if3rGu_SZItOHcbZd4ALnzHb0IRzSuLluvDM-cnYKltIo-bb1jBWuykzX34hHTrBtWKu53xr_C_IB1HMn6hNtQ3y6r0-jEn20tLA313l1SyD5XiiTcdKwolBZV-GMKFYAQC63xaWiU3lPefofxkHk4EHuN8Ce4FuMi5EWAJlfUXYxSS-BN3EVy31e0HzYIUOgALlOva3LlCKy5-tB9k-mLkTkhfseBk_849VZ-ies69IZU-rX-6Ni7EmSd-SUKjD3n7swMKJjvHnWAmHlm4jJAzueUecLEvaafpFVUGzpKmxgVjTcQJWWG5ZzrWDrxh8SlGXuOIH91RwOBMylWBQfX5G2naksBd5yFgW2JnDgKdjhCKQYM7AA9CtrSXGH0GQBuS8M">MountainWeather Forecast</audio></speak>',
    'what about me': '<speak>we love you too</speak>'
  };

  // Build help message from keys
  var help = '<speak>You can say ';
  for (var key in this.map) {
    help += (key + '<break time="1"/>,');
  }
  help += '</speak>';
  this.map['help'] = help;

  // max 3: https://developers.google.com/actions/reference/ActionsSdkAssistant#buildInputPrompt
  this.no_inputs = ['Come again', 'Are you still there?', 'Later, I\'m going skiing'];

};
