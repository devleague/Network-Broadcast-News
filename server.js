var net = require('net');

var CONFIG = require('./config');

//Connection listener
var server = net.createServer(function (socket) {
  //Connection listener
  console.log("CONNECTED: " + CONFIG.PORT);

  socket.on('end', function() {
    console.log("\nCLOSED: " + CONFIG.PORT);
  });

  socket.pipe(socket);

  process.stdin.on('data', function(data) {
    socket.write("HOST: " + data);
  });

  socket.on('data', function(data) {
    console.log(data.toString());
  });
});

server.listen(CONFIG.PORT, function () {
  var PORT = server.address().port;
  console.log('Server listening on', PORT);
});

server.on('error', function (err) {
  console.log(err);
});
