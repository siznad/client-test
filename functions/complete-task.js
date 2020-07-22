exports.handler = function(context, event, callback) {
    const response = new Twilio.Response();
    const client = context.getTwilioClient()

    const workspaceSid = context.WORKSPACE_SID
    
    client.taskrouter.workspaces(workspaceSid)
                 .tasks(event.currentTask)
                 .update({
                    assignmentStatus: 'completed'
                  })
                 .then(task => {
                    response.appendHeader('Access-Control-Allow-Origin', '*');
                    response.appendHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
                    response.appendHeader('Access-Control-Allow-Headers', 'Content-Type');
                
                    response.appendHeader("Content-Type", "application/json");
                
                    callback(null, response);
                 })
                 .catch(error => {
                    callback(null, response);
                 });
  };