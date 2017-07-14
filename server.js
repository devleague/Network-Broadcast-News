/*jshint esversion :6*/
const net = require('net');
var clients = [];
const server = net.createServer((socket) => {
  process.stdout.write('connected');
  clients.push(socket);
  socket.on('close', () => {
    process.stdout.write('client disconnected');
  });
  socket.on('data', (data) => {
    clients.forEach((client) => {
      if(client !== socket){
        client.write(data);
     }
   });
  });


});
server.listen(6969, "0.0.0.0", () => {
  process.stdout.write('listening for port 6969');
});
