'use strict';
const{server,dispatchAction, parse}=require('./socket.js');
const commands = require('./commands')

const port = process.env.PORT || 3001;

server;
dispatchAction;
parse;

commands['@all'];
commands['@nick'];
commands['@list'];

server.listen(port, () => {
  console.log(`Chat Server up on ${port}`);
});
