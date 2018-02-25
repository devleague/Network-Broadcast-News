const net = require('net');
const PORT = 6969;
let people = [];
let person = "";

function ask(question, callback) {
    var stdin = process.stdin,
        stdout = process.stdout;

    stdin.resume();
    stdout.write(`${question}: `);

    stdin.once('data', function (data) {
        data = data.toString().trim();

        if (!data || data === '') {
            stdout.write('Please enter some data bro... \n');
            ask(question, callback);
        } else {
            callback(data);
        }
    });
}

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

    client.on('error', (error) => {
        console.log("this is the error " + error);
    });

    // if (client.user === "Anon3") {
    //     client.on('close');
    // }

});

server.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
});