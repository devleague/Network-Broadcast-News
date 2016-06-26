var net = require('net');

var CONFIG = require('./config');

var socket = new net.Socket();

var client = socket.connect({ port: CONFIG.PORT }, function() {
  console.log("YOU'RE IN THE SERVER!!!!!");

});

client.on('end', function() {
  console.log("Logged off:)");
});