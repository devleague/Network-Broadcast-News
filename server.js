const net = require('net');
const PORT = 6969;
let people = [];
let person = "";

const server = net.createServer((client) => {

    client.user = "Anon" + people.length;
    people.push(client);
    console.log(`${client.user} connected to the server!`);

    client.write("You have connected to Mark's comp!");
    client.on('data', (data) => {
        console.log(data.toString());

        people.forEach((key, index) => {

            person = "Anon" + index;
            if (client.user !== person) {
                key.write(`${client.user}: ${data}`);
            }
        });
    });

    //this event occurs only after a user disconnects from the server
    client.on('close', () => {
        console.log(`${client.user} closed the socket`);
    });

    

});

server.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
});