var net = require('net');
var a = process.stdin;
a.setEncoding('utf-8');
var b = process.stdout;
var CONFIG = require('./config');

var PORT = 6969;
var count = 0;
var connections = [];
var server = net.createServer(function(socket){
    b.write( socket.remoteAddress + ': ' + socket.remotePort + ' connected \n');
    connections.push(socket);
    socket.write('Connected to ' + CONFIG.PORT + '\n', 'utf8');
    socket.on('data', function(chunk){
      b.write('Server Bcast from'  + socket.remoteAddress + ': ' + socket.remotePort +  ': ' + chunk + '\n','utf8');
      for(var i = 0; i < connections.length; i++){
        connections[i].write( connections[i].remoteAddress + ': ' +connections[i].remotePort + ': '  + chunk + '\n','utf8');
      }
    });
    count++;

    socket.on('close', function(){
      var closedPort;
      for(var z = 0; z < connections.length; z++){
        if(connections[z].remotePort === socket.remotePort){
          closedPort = connections[z].remotePort;
          b.write('Closed' + connections[z].remotePort + '\n');
          connections.splice(z, 1);
        }
      }
      for(var x = 0; x < connections.length;x++){
         connections[x].write( closedPort + ' left \n','utf8');
      }
    });
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