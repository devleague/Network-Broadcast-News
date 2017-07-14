/*jshint esversion: 6*/
const net = require('net');
const client = net.createConnection({port:6969}, () => {

});
process.stdin.on('data', (data) => {
  client.write(data.toString());
});

client.on('data', (data) => {
  process.stdout.write(data);
});