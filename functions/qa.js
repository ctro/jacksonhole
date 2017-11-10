module.exports = function QA () {
  this.greeting = '<speak>Howdy, Say help if you\'re new here.</speak>';

  this.map = {
    'play the forecast': '<speak><audio src="https://www.mountainweather.com/forecast/forecast.mp3">MountainWeather Forecast</audio></speak>',
    'what\'s a good place for breakfast': '<speak>Try Persephone in Jackson or Nora\'s in Wilson.</speak>',
    'what\'s a good place for lunch': '<speak>Try Sweetwater or Snake River Brewing in Jackson </speak>',
    'what\'s a good place for dinner': '<speak>Try Trio in Jackson</speak>',
    'tell an elk joke': '<speak>At what elevation do deer turn into elk?<break time="1"/>Typically around 8000 feet, but as low as 6000 feet in areas where the doe-zone layer has been depleted</speak>',
    'bye': '<speak>Peace out river trout</speak>'
  };

  // Don't auto-build help now, so we can hide the forecast :)
  // Build help message from keys
  // var help = '<speak>You can ask ';
  // for (var key in this.map) {
  //  help += (key + '<break time="1"/> ');
  // }
  // help += '</speak>';

  this.map['help'] = "<speak>You can ask what's a good place for breakfast, what's a good place for lunch, what's a good place for dinner, or tell an elk joke";

  // max 3: https://developers.google.com/actions/reference/ActionsSdkAssistant#buildInputPrompt
  this.no_inputs = ['I don\'t think I heard you', 'Are you still there?', 'Quick, or I\'ll go skiing!'];
};
