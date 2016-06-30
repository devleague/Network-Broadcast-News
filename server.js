var net = require('net');
var b = process.stdout;
var CONFIG = require('./config');

var PORT = 6969;
var count = 0;
var connections = [];
var server = net.createServer(function(socket){
    console.log('someone connected \n');
    connections.push(socket);
    socket.write('Connected to ' + CONFIG.PORT + '\n', 'utf8');
    socket.on('data', function(chunk){
      b.write('Server Bcast from'  +socket.remoteAddress + ': ' + socket.remotePort +  ': ' +chunk,'utf8');
      for(var i = 0; i < connections.length; i++){
        connections[i].write( connections[i].remoteAddress + ': ' +connections[i].remotePort + ': '  + chunk,'utf8');
      }
    });
    count++;
});



server.listen(CONFIG.PORT, function(){
  var finalPort = server.address().port;
  console.log('listening on port \n', finalPort);
});

server.on('error', function(err){
  this.listen(CONFIG.PORT, function(){
    var finalPort =  server.address().port;
    console.log('listening on port \n', finalPort);
  });
});