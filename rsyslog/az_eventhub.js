#!/usr/bin/nodejs
//================================
// Simple EventHub publisher:
// - protocol: should never be set, defaults to amqps
// - SASKeyName: name of your SAS key which should allow send/receive
// - SASKey: actual SAS key value
// - serviceBusHost: name of the host without suffix (e.g. https://foobar-ns.servicebus.windows.net/foobar-hub => foobar-ns)
// - eventHubName: name of the hub (e.g. https://foobar-ns.servicebus.windows.net/foobar-hub => foobar-hub)
// - partitions: number of partitions (see node-sbus-amqp10 for a wrapper client that will figure this out for you and connect appropriately)
//
// By default, will set up a receiver on each partition, then send a message and exit when that message is received.
// Passing in a final argument of (send|receive) causes it to only execute one branch of that flow.
//================================

'use strict';

var protocol = 'amqps';
var serviceBusHost = '<servicebus name here>' + '.servicebus.windows.net';
var sasName = "<key name>";
var sasKey = "<key>";
var eventHubName = "<event hub name>";

var uri = protocol + '://' + encodeURIComponent(sasName) + ':' + encodeURIComponent(sasKey) + '@' + serviceBusHost;
var sendAddr = eventHubName;

// Setup the AMQP client
var amqp10 = require('amqp10');
var AMQPClient = amqp10.Client;
var client = new AMQPClient(amqp10.Policy.EventHub);

// Setup readline to read from stdin
var readline = require('readline');
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

// connect and wire it all together
console.log("connect");
client.connect(uri)
  .then(function(){
    console.log("create a sender");
    // create a sender
    return client.createSender(sendAddr);
  })
  .then(function(sender) {
    // wire the sender into readline
    console.log("wire sender to readline");
    return rl.on('line', function(line){
      // for every message we get, send it
      console.log(line);
      sender.send(line)
    })
    .on('close', function() {
      console.log("closing");
      process.exit(0);
    });
  })
  .error(function (e) {
    console.warn('connection error: ', e);
  });
