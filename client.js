const net = require('net');

const server = net.createConnection(6969, '10.0.1.106', () => {
    server.write("User connected to the server!");

    server.on('data', function (data) {
        console.log(data.toString());
    });

    process.stdin.on('data', (key) => {
        server.write(key);
    });

});