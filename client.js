
/*jshint esversion: 6 */
const net = require('net');

var client = net.createConnection(6969, 'localhost', () => {
  client.setEncoding('utf8');
  process.stdin.on('data', data  => {
    client.write(data);
  });

  client.on('data', function( data ) {
    console.log(data);
  });

});


