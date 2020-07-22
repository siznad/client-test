exports.handler = function(context, event, callback) {
    let response = {"instruction": "dequeue", "from": "+19726452282", "post_work_activity_sid":context.POST_WORK_ACTIVITY_SID};
    
    callback(null, response);
  };