var net = require('net');

var CONFIG = require('./config');

var socket = new net.Socket();

var client = socket.connect({ port: CONFIG.PORT }, function() {
  console.log("You are logged in:)");
  client.write("\nMessage from client: 'World :)'");

  //client.end();
  client.on('data', function(data) {
    console.log("\nReceiving from server: ");
    console.log(data.toString());
    //client.end();
  });

  client.on('end', function() {
    console.log("You have logged off:)");
  });
});
