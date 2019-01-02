'use strict';
const {parse, socketPool, commands} = require('sockets');
const event = require('events');

// let commands = {};

commands['@all'] =  (data, userId) => {
    for( let connection in socketPool ) {
      let user = socketPool[connection];
      user.socket.write(`<${socketPool[userId].nickname}>: ${data.payload}\n`);
    }
  };
  
  commands['@nick'] =  (data, userId) => {
    socketPool[userId].nickname = data.target;
  };
  
  commands['@list'] = (data,userId) =>{
    for (let connection in socketPool){
      socketPool[userId].socket.write(socketPool[connection].nickname)
    }
  };
    // @quit to disconnect
  // @nickname <new-name> to change their nickname
  // @dm <to-username> <message> to send a message directly to another user by their nickname
  module.exports={commands};