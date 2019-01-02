'use strict';
const event = require('../events');
const socketPool = require('../socketPool');


let changeNickname = (data, userId) =>{
  socketPool[userId].nickname = data.target;
}

event.on('@nick', changeNickname);

module.exports = changeNickname;
