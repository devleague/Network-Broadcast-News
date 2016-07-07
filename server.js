var net = require('net');
var CONFIG = require('./config');
var user = [];

var server = net.createServer (function (socket) {

  var remoteAddress = socket.remoteAddress + ' PORT: ' + socket.remotePort;

  console.log('Somebody connected!');
  console.log('Connection data from: ' + remoteAddress);

  // Connection Listener

  server.on('error', function (error) {
  if (error.code === 'EADDRINUSE') {
    console.log('Adress already in use. Trying to reconnect...');
    setTimeout (function () {
    server.close();
    server.listen(PORT);
    }, 1000);
  }
});

  socket.setEncoding('utf8');

  user.push(socket);

  socket.on('data', function (data) {
    process.stdout.write(data);
    user.forEach(function (person) {
      person.write(data);
    });
  });

  socket.on('end', function () {
    console.log(remoteAddress + ' just disconnected.');
  });

  socket.on('error', function (error) {
    console.log('Error from' + remoteAddress + error);
  });

});

process.stdin.on('data', function (data) {
  user.forEach(function(person) {
    person.write('[ADMIN]: ' + data);
  });
});

server.listen(CONFIG.PORT, function () {
  var PORT = server.address().port;
  console.log('Listening on port:', PORT);
});

server.on('close', function () {
  server.close();
});





