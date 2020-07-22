/**
 *  Simple Menu Template
 * 
 *  This Function builds a simple IVR menu. Learn more about <Gather> at:
 *  https://www.twilio.com/docs/api/twiml/gather
 */

exports.handler = function(context, event, callback) {
  const twiml = new Twilio.twiml.VoiceResponse();

  switch (event.Digits) {
    case '1':
        twiml
          .enqueue({workflowSid: context.WORKFLOW_SID})
          .task({}, JSON.stringify( {'selected_language': 'es'})); 
      break;
    case '2':
        twiml
          .enqueue({workflowSid: context.WORKFLOW_SID})
          .task({}, JSON.stringify( {'selected_language': 'en'})); 
      break;
    case '3':
      twiml.say('Leave a message');
      twiml.record();
      break;
    default:
      const gather = twiml.gather({numDigits: 1});
      
      gather.say({language: 'es-MX'}, "Para Espanol oprime el uno.");
      gather.pause({length: 1});
      gather.say("For English press 2.  To leave a message press 3");
  }
  callback(null, twiml);
};
