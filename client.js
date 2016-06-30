var net = require('net');

var CONFIG = require('./config');

var socket = new net.Socket();

var client = socket.connect({ port: CONFIG.PORT }, function() {
  console.log("CONNECTED TO: " + CONFIG.PORT);

  process.stdin.on('data', function(data) {
    client.write("SERVER BCAST FROM " + CONFIG.PORT + ": " + '"' + data + '"');
  });

  //client.end();
  client.on('data', function(data) {
    console.log(data.toString());
  });

  client.on('end', function() {
    console.log("You have logged off:)");
    client.end(console.log("You have logged off:)"));
  });
});
