'use strict';
const event = require('../events');
const socketPool = require('../socketPool');

  let list = (data,userId) => {
    for (let connection in socketPool){
        socketPool[userId].socket.write(socketPool[connection].nickname)
      }
  }

  event.on('@list', list);

  module.exports = list;