var net = require('net');
var a = process.stdin;
a.setEncoding('utf-8');
var b = process.stdout;
var CONFIG = require('./config');

var PORT = 6969;
var connections = [];
var userCount = 0;
var server = net.createServer(function(socket){
    b.write( socket.remoteAddress + ': ' + socket.remotePort + ' connected \n');
    connections.push({socket:socket, userName:''});
    socket.write('Connected to ' + CONFIG.PORT + '\n', 'utf8');
    socket.write('Please enter username \n', 'utf8');
    socket.on('data', function(chunk){
      if(connections.length > userCount){
        connections[userCount].userName = chunk;
        userCount++;
      }
      else{
        var senderName;
        for(var y = 0; y < connections.length; y++){
          if(connections[y].socket.remotePort === socket.remotePort)
            senderName = connections[y].userName.toString().replace(/(\r\n|\n|\r)/gm,"");
        }
      b.write('Server Bcast from'  + socket.remoteAddress + ': ' + socket.remotePort +  ': ' + chunk + '\n','utf8');
        for(var i = 0; i < connections.length; i++){
          connections[i].socket.write( senderName + ': '  + chunk + '\n','utf8');
        }
      }
    });

    socket.on('close', function(){
      var closedPort;
      for(var z = 0; z < connections.length; z++){
        if(connections[z].socket.remotePort === socket.remotePort){
          closedPort = connections[z].socket.remotePort;
          b.write('Closed ' + connections[z].socket.remotePort + '\n');
          connections.splice(z, 1);

        }
      }
      for(var x = 0; x < connections.length;x++){
         connections[x].socket.write( closedPort + ' left \n','utf8');
      }
    });
});


a.on('data', function(chunk){
  for(var i = 0; i < connections.length; i++){
    connections[i].write( '[ADMIN]' + ': '  + chunk + '\n','utf8');
  }
  b.write(chunk);
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