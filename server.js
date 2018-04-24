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
    connections.push({socket:socket, userName:'', writeLimit: 3});
    socket.write('Connected to ' + CONFIG.PORT + '\n', 'utf8');
    socket.write('Please enter username \n', 'utf8');
    socket.writeLimit = 3;
    socket.startMessage = null;
    socket.endMessage = null;
    socket.totalTime = 0;
    socket.on('data', function(chunk){
      if(connections.length > userCount){
        var validName = 1;
          if(chunk.toString() === '[ADMIN]\n'){
            validName = 0;
            socket.write('Not allowed to set username as admin \n', 'utf8');
          }
        for(var k = 0; k < userCount; k++){
          if(chunk.toString() === connections[k].userName.toString()){
            validName = 0;
            socket.write('Username is already taken \n', 'utf8');
          }
        }
        if(validName === 1){
          connections[userCount].userName = chunk;
          userCount++;
        }
      }
      else{
          var isSpam = 0;
          if(socket.writeLimit === 3){
            socket.startMessage = new Date();
          }
          socket.writeLimit--;
          if(socket.writeLimit < 0){
            if(socket.totalTime < 1000){
              for(var t  = 0; t < connections.length; t++){
                if(connections[t].socket.remotePort === socket.remotePort){
                  console.log('Someone got kicked');
                  connections.splice(t, 1);
                  userCount--;
                  socket.end();
                  isSpam = 1;
                }
              }
            }
            else{
              socket.startMessage = new Date();
              socket.writeLimit = 3;
              socket.totalTime = 0;
            }
          }
          if(isSpam === 0){
          var senderName;
          for(var y = 0; y < connections.length; y++){
            if(connections[y].socket.remotePort === socket.remotePort)
              senderName = connections[y].userName.toString().replace(/(\r\n|\n|\r)/gm,"");
          }
          b.write('Server Bcast from'  + socket.remoteAddress + ': ' + socket.remotePort +  ': ' + chunk + '\n','utf8');
          for(var i = 0; i < connections.length; i++){
            connections[i].socket.write( senderName + ': '  + chunk + '\n','utf8');
          }
          socket.endMessage = new Date();
          var spamTime = socket.endMessage.getTime() - socket.startMessage.getTime();
          socket.totalTime += spamTime;
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
          userCount--;
        }
      }
      for(var x = 0; x < connections.length;x++){
         connections[x].socket.write( closedPort + ' left \n','utf8');
      }
    });
});


a.on('data', function(chunk){
  var myRegexp = /(\\kick) (.*)/;
  var match = myRegexp.exec(chunk);
  if(match !== null){
      if(match.length === 3){
      for(var k = 0; k < connections.length; k++){
        if(isNaN(match[2])){
          var checkName = connections[k].userName.toString().replace(/(\r\n|\n|\r)/gm,"");
          console.log(match[2]);
          if(match[2].toString() === checkName){
            console.log('User got kicked');
            connections[k].socket.end();
            connections.splice(k,1);
            userCount--;
          }
        }
        else{
          if(parseInt(match[2]) === connections[k].socket.remotePort){
            console.log('User got kicked');
            connections[k].socket.end();
            connections.splice(k,1);
            userCount--;
          }
        }
      }
    }
  }
  else{
    for(var i = 0; i < connections.length; i++){
      connections[i].socket.write('[ADMIN]' + ': '  + chunk + '\n','utf8');
    }
    b.write('[ADMIN]' + ': '  + chunk);
  }
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