var net = require('net');

var CONFIG = require('./config');

//Connection listener
var server = net.createServer(function (socket) {
  //Connection listener
  console.log("SOMEONE'S INSIDE:O :O ");

  socket.on('end', function() {
    console.log("THEY'RE GONE");
  });

  socket.write("hi");
  socket.pipe(socket);

});

server.listen(CONFIG.PORT, function () {
  var PORT = server.address().port;
  console.log('This is working!:D Listening on port', PORT);
});

server.on('error', function (err) {
  console.log(err);
});
