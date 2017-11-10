// [START app]
'use strict';
const { DialogflowApp } = require('actions-on-google');
const functions = require('firebase-functions');

// Speech Synthesis Markup Language
// SSML Ref: https://developers.google.com/actions/reference/ssml

// Jim updates his forecast most mornings here:
// http://www.mountainweather.com/forecast/forecast.mp3

var QA = require('./qa');

process.env.DEBUG = 'actions-on-google:*';


/**
 * The entry point to handle a http request
 * @param {Request} request An Express like Request object of the HTTP request
 * @param {Response} response An Express like Response object to send back data
 */
const jacksonLocals = functions.https.onRequest((request, response) => {
  const assistant = new DialogflowApp({ request, response });
  console.log(`Request headers: ${JSON.stringify(request.headers)}`);
  console.log(`Request body: ${JSON.stringify(request.body)}`);

  // QA runs the show.
  var qa = new QA();

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

module.exports = {
  jacksonLocals
};
