'use strict';

const uuid = require('uuid/v4');
const net = require('net');
const server = net.createServer();

const socketPool = {};
const commands = {};

server.on('connection', (socket) => {
    let id = uuid();
    socketPool[id] = {
      id:id,
      nickname: `User-${id}`,
      socket: socket,
    };
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

  module.exports = {server, parse, dispatchAction, socketPool, commands};
  
