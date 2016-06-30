var net = require('net');
var Stream = require('stream');
var WriteableStream = Stream.Writable;
var ReadableStream = Stream.Readable;
var CONFIG = require('./config');
var socket = new net.Socket();

var a = process.stdin;
var b = process.stdout;

a.setEncoding('utf-8');

socket.connect({port:CONFIG.PORT});


a.on('data', function(chunk){
  socket.write(chunk,'utf8');
});


socket.on('data', function(chunk){
  b.write(chunk, 'utf8');
});