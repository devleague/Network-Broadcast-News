var net = require('net');

var CONFIG = require('./config');

//Connection listener
var server = net.createServer(function (socket) {
  //Connection listener
  console.log("\nA client logged in:)");

  socket.on('end', function() {
    console.log("\nA client has logged out.");
  });

  socket.write("\nMessage from server: 'Hello' ");
  socket.pipe(socket);


  socket.on('data', function(data) {
    console.log("\nReceiving from client: ");
    console.log(data.toString());
    //socket.write("Data is: " + data);
    //client.end();
  });
});

server.listen(CONFIG.PORT, function () {
  var PORT = server.address().port;
  console.log('You are in the server', PORT);
});

server.on('error', function (err) {
  console.log(err);
});
