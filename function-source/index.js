'use strict';
 
const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');
const axios = require('axios');
 
process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements
 
exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
 
  function welcome(agent) {
    agent.add("Welcome to my agent!");
  }
 
  function fallback(agent) {
    agent.add("Desculpe, não compreendi sua pergunta. Por favor, poderia escrever a frase com sua dúvida para eu tentar ajudá-lo de outra forma?");
  }
   
  function cadastro(agent){
    const {
    	name, phone, email
    } = agent.parameters;
    
    const data = [{
      Nome: name,
      Telefone: phone,
      Email: email
    }];
    axios.post("https://sheet.best/api/sheets/9beb0305-d677-41e3-8e9a-2275c954f23e" , data)
  	agent.add("Qual seria sua dúvida?")};

  // Run the proper function handler based on the matched Dialogflow intent name
  let intentMap = new Map();
  intentMap.set("Default Welcome Intent", cadastro);
  intentMap.set("Default Fallback Intent", fallback);
// intentMap.set('INTENT', cadastro);
// intentMap.set('your intent name here', yourFunctionHandler);
// intentMap.set('your intent name here', googleAssistantHandler);
  agent.handleRequest(intentMap);

});  
