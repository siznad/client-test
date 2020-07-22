exports.handler = function(context, event, callback) {
    const twiml = new Twilio.twiml.VoiceResponse();
    const client = context.getTwilioClient();
    const service = context.VERIFY_SERVICE_SID
    const to = event.Caller;

    if (event.Digits) {
      client.verify.services(service)
      .verificationChecks
      .create({
        to: to,
        code: event.Digits
      })
      .then(check => {
        if (check.status === "approved") {
          twiml.redirect({
            method: 'POST'
        }, 'https://client-test-7448-dev.twil.io/simple-menu');
          callback(null, twiml);
        } else {
          twiml.say('Get out of here loser!')
          callback(null, twiml);
        }
      })
      .catch(error => {
        console.log(error);
        callback(null, twiml);
      });
    } else {
      client.verify.services(service)
      .verifications
      .create({
        to: to,
        channel: 'sms'
      })
      .then(verification => {
        console.log(`Sent verification: '${verification.sid}'`);
        const gather = twiml.gather({numDigits:6});
        gather.say("Please enter the code that was sent to your phone.");
        callback(null, twiml);
      })
      .catch(error => {
        console.log(error);
        callback(null, twiml);
      });
    };
  };
