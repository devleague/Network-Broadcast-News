# Network Broadcast News
A NodeJS broadcast server for the largest media conglomerate in the world

slides

https://slides.com/devleague/events-and-emitters

https://slides.com/devleague/streams-in-node


## Goals

`server.js`

Use the [**net**](https://nodejs.org/api/net.html) module to create a new server that listens on a specified address `0.0.0.0` and port `6969` and listens for and accepts socket connections.

Manage which sockets are connected, and maintain your sockets so that it removes any sockets that disconnect from your server.

Each connected socket is a **Duplex** stream, when it emits a 'data' event, broadcast the data to all sockets.

`client.js`

Create a new **net.Socket** and connect to your running socket server.

Once connected, pipe your terminal's standard input stream to write to your connected socket.

Whenever the connected socket (client) emits a 'data' event, then data is being broadcasted from the server, pipe that data out to your terminal's standard output stream.

## example

![example](example.gif)

### Additional Features

1. add username registration  
   once connected, the new client will be prompted to enter a username, store the username and then allow them to broadcast messages with all messages prepended with their username.
1. add admin broadcast  
   the admin (server.js) can broadcast messages and each message will be prepended with `[ADMIN]`
1. prevent users to set their name as `[ADMIN]` or any other user's name
1. [bonus] admin can enter a command to kick a client `\kick username` and `kick ip:port` will both disconnect the client
1. [bonus] add a rate limiter that if a client reaches the allowed 'writes per second' limet, automatically kick that user.
1. [bonus] add private message support between two clients.
1. [bonus] add rooms feature. A client can invite other clients to a private room.
1. [bouns] add ability for a client to mute all messages from another.
1. [bonus] write a client that floods another server, perhaps with a command `\flood "message"`

---

![NBN](http://vignette3.wikia.nocookie.net/ancur/images/f/f9/NBN_Logo.png/revision/latest/scale-to-width/150?cb=20141010171752)
_Someone is Always Watching_
