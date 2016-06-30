var net = require('net');
var fs = require ('fs');
var CONFIG = require('./config');
var readline = require ('readline');

/*var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});*/

var socket = new net.Socket();

socket.setEncoding('utf8');

socket.on('error', function (error) {
  socket.destroy();
  console.log('ERROR: connection could not be opened.');
});

socket.connect({ port: CONFIG.PORT}, function () {
  console.log('Connection opened succesfully.');
});

process.stdin.on('data', function (data) {
  socket.write(data);

});

socket.on('data', function (data) {
  process.stdout.write(data);

});

socket.on('end', function () {
  console.log('Goodbye!');
});





