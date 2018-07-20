var net = require('net');

var CONFIG = require('./config');

var listOfClients = [];

//Connection listener
var server = net.createServer(function (socket) {
  //Connection listener
  var clientAddress = socket.remoteAddress.slice(7);
  var clientPort = socket.remotePort;
  listOfClients.push(socket);

  console.log("CONNECTED: " + clientAddress + ":" + clientPort);

  socket.on('end', function() {
    console.log("CLOSED: " + clientAddress + clientPort);
  });

  process.stdin.on('data', function(data) {
    socket.write("[ADMIN]" + ' "' + data + '"');
    // if(socket.write() === "kick") {
    //   socket.end();
    // }
  });

  socket.on('data', function(data) {
    console.log("SERVER BCAST FROM " + data);

    listOfClients.forEach(function(client) {
      client.write(data);
    });
  });
  //socket.pipe(socket);
});

server.listen(CONFIG.PORT, function () {
  var PORT = server.address().port;
  console.log('Server listening on', PORT);
});

server.on('error', function (err) {
  console.log(err);
});
