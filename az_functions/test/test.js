var assert = require('assert');
var testFunction = require('../az_function.js')
var fs = require('fs');

function Context() {
    this.messages = [];
    this.donecalled = false;
};

Context.prototype.log = function(message) {
    this.messages.push(message);
};

Context.prototype.bindings = {};

Context.prototype.done = function() {
    this.donecalled = true;
};
Context.prototype.isdone = function() {
    return this.donecalled;
};

function getTestData() {
  var testRecords = [];
  var data = fs.readFileSync("./test/example.log", "utf-8");
  for (const row of data.split("\r\n")) {
    if (row.trim().length > 0) {
      testRecords.push(row);
    }
  }
  return testRecords;
};

describe('testFunction', function() {
  it('should parse all these messages', function() {
    var testRecords = getTestData();
    var context = new Context();
    testFunction(context, testRecords);
    assert.equal(context.bindings.documents.length, testRecords.length, "returned # parsed messages different to input # messages");
    context.bindings.documents.forEach(message => {
      assert.ok(message.type, "This message did not match: " + message);
      console.log(message);
    });
    assert.ok(context.isdone(),"context.done was not called")
  });
});
