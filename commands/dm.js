'use strict';
const event = require('../events');
const socketPool = require('../socketPool');

let sendDm = (data, userId) =>{
    if(socketPool[data.target]){
        let user = socketPool[data.target];
        user.socket.write(`<${socketPool[userId].nickname}>: ${data.payload}`);
      } else { console.log('user does not exist');}
}

event.on('@dm', sendDm);

module.exports = sendDm;