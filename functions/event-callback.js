exports.handler = function(context, event, callback) {
    let response = {'status':204, 'Content-Type':'application/json'};

    console.log(event)
  
    callback(null, response);
  };