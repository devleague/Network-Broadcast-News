var net = require('net');
var CONFIG = require('./config');
var readline = require ('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var name = ' ';
var socket = new net.Socket();

socket.setEncoding('utf8');

username();

function username () {
  rl.question("Yo! What's your username? ", function (answer) {
    name += answer;
    console.log('Welcome ' + answer + '!');
    rl.close();
    process.stdin.resume();
    connect();
  });
}

socket.on('error', function (error) {
  socket.destroy();
  console.log('ERROR: connection could not be opened.');
});

function connect () {
  socket.connect({ port: CONFIG.PORT}, function () {
    console.log('Connection opened succesfully.');
  });

  process.stdin.on('data', function (data) {
    socket.write(name + ': ' + data);
  });

  socket.on('data', function (data) {
    process.stdout.write(data);
  });

  socket.on('end', function () {
    console.log('Goodbye!');
  });
}
