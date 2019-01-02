'use strict';

// First Party Modules
const EventEmitter = require('events');
const net = require('net');

// Third Party Modules
const uuid = require('uuid/v4');

const port = process.env.PORT || 3001;
const server = net.createServer();
const socketPool = {};
const commands = {};

// user constructor
function User(socket){
    let id = uuid();
    this.id = id;
    this.nickname = `User-${id}`;
    this.socket = socket;
}

server.on('connection', (socket) => {
    let user = new User(socket);
    socketPool[user.id] = user;
    socket.on('data', (buffer) => dispatchAction(id, buffer));
});

let parse = (buffer) => {
  let text = buffer.toString().trim();
  if ( !text.startsWith('@') ) { return null; }
  let [command,payload] = text.split(/\s+(.*)/);
  let [target,message] = payload.split(/\s+(.*)/);
  return {command,payload,target,message};
};

let dispatchAction = (userId, buffer) => {
  let entry = parse(buffer);
  if ( entry && typeof commands[entry.command] === 'function' ) {
    commands[entry.command](entry, userId);
  }
};

commands['@all'] =  (data, userId) => {
  for( let connection in socketPool ) {
    let user = socketPool[connection];
    user.socket.write(`<${socketPool[userId].nickname}>: ${data.payload}\n`);
  }
};

commands['@nick'] =  (data, userId) => {
  socketPool[userId].nickname = data.target;
};

server.listen(port, () => {
  console.log(`Chat Server up on ${port}`);
});