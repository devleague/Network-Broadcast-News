/*jshint esversion: 6 */
const net = require('net');

let serverArray = [];

var server = net.createServer( function ( connection ) {
  connection.write(`Hello. What is your name!`);

  let userName = null;

  if (!serverArray.some( list => list.socket === connection )){
    {
      userName = `User ${serverArray.length + 2}`;
      serverArray.push({ name: userName, socket: connection } ); }
      console.log(`You have ${serverArray.length} connections.`);

    }

  connection.on('data', data => {
    let handle = false;
    if (userName.includes('User')) {
      let oldName = userName;
      userName = String(data).replace(/\r?\n|\r/, '');

      for (let connections in serverArray){
        if (oldName === serverArray[connections].name) { serverArray[connections].name = userName; }
        serverArray[connections].socket.write(`${userName} has joined us!\n`);
        handle = true;
      }
    }
    if (handle === false){
      for (let connections in serverArray){
        if ( userName !== serverArray[connections].name) {
          serverArray[connections].socket.write(`[${userName}] ${data}`);
        }
      }
    }
    handle = false;
  });

  connection.on('end', ( packet ) => {
    let i = 0;
    for (let connections in serverArray){
      if ( userName === serverArray[connections].name) {
        serverArray.splice(i, 1);
        for (let connections in serverArray){
          serverArray[connections].socket.write(`[ADMIN] ${userName} abandoned us!`);
        }
      }
      i++;
    }
  });

});
server.listen({ port: 6969, address: '0.0.0.0' });
