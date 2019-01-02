'use strict';
const event = require('../events');
const socketPool = require('../socketPool');

let sendToAll = (data, userId) =>{
  for( let connection in socketPool ) {
    let user = socketPool[connection];
    user.socket.write(`<${socketPool[userId].nickname}>: ${data.payload}\n`);
  }
};

event.on('@all', sendToAll);

module.exports = sendToAll;