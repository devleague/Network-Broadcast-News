var net = require('net');

var CONFIG = require('./config');

var socket = new net.Socket();

var client = socket.connect({ port: CONFIG.PORT }, function() {

  var clientAddress = client.address().address;
  var clientPort = client.address().port;
  console.log("CONNECTED TO: " + clientAddress + ":" + CONFIG.PORT);

  process.stdin.on('data', function(data) {
    client.write(clientAddress + ":" + clientPort + ': "' + data + '"');
  });

  //socket.pipe(socket);

  //client.end();
  client.on('data', function(data) {
    console.log(data.toString());
  });

  client.on('end', function() {
    console.log("You have logged off:)");
    client.end("you have logged off:)");
  });
});
