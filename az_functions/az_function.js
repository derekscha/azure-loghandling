/**
* A very rough example of processing the syslog messages received in
* https://gist.github.com/jdcockrill/d9ca6c10ebaab26ade776ee1f19346d7
* Messages are assumed to be unix syslog. They are parsed with a regex
* (which doesn't always work) and written to Azure Blob Storage.
* If the regex matches, then the parsed output is written to Blob.
* If it doesn't match, then just the raw message is written.
**/

//var regex = /(\w+\s+\d+\s+\d+:\d+:\d+) (\w+) (\w+)(?:-|\[)?(\d*)?(?:\])?: (.*)/;
var syslogparser = require('glossy').Parse

var proc_regex = /^(\w+)(?:-|\[)?(\d*)?(?:\])?:/
function extractProcess(message) {
  // this function is currently redundant
  var matches = proc_regex.exec(message['message']);
  if (matches != null) {
    message.process = matches[1];
    if (matches.length == 3) {
      message.pid = matches[2];
    }
  }
  return message;
}

module.exports = function (context, eventHubMessage) {
    var syslogmsg = syslogparser.parse(eventHubMessage);
    if (syslogmsg.type != null) {
        // may use this block in future to do further parsing.
        //syslogmsg = extractProcess(syslogmsg);
    }
    //context.log(syslogmsg);
    context.bindings.outputDocument = syslogmsg;
    context.done();
};
