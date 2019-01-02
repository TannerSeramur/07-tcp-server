'use strict';

const uuid = require('uuid/v4');
const net = require('net');

// my exports
const event = require('./events');
const socketPool = require('./socketPool');
const requireDirectory = require('require-directory')(module,'./commands');

const port = process.env.PORT || 3001;
const server = net.createServer();
const commands = {};

// user constructor
/**
 *
 *
 * @param {*} socket
 */
function User(socket){
  let id = uuid();
  this.id = id;
  this.nickname = `User-${id}`;
  this.socket = socket;
}

server.on('connection', (socket) => {
  let user = new User(socket);
  socketPool[user.id] = user;
  socket.on('data', (buffer) => dispatchAction(user.id, buffer));
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
    event.emit(entry.command, entry, userId);
  };
  
  server.listen(port, () => {
    console.log(`Chat Server up on ${port}`);
  });

  module.exports = {server, parse, dispatchAction, socketPool, commands};
  

