![CF](http://i.imgur.com/7v5ASc8.png) LAB
=================================================

## Project Name 07-tcp-server

### Author: Tanner Seramur

### Links and Resources
* [repo](https://github.com/TannerSeramur/07-tcp-server)
* [travis](http://xyz.com)


### Modules
#### `uuid`
#### `net`
##### Exported Values and Methods

###### `commands['@all'] =  (data, userId)`
type `@all <message-here>` to send a message in the chat for all users to see.

###### `commands['@nick'] =  (data, userId)`
type `@nick <new-name-here>` to change you user ID to something custom. 

###### `commands['@list'] = (data,userId)`
type `@list all` to list all users currently in the chat. 

##### `commands['@quit']`
type @quit to disconnect from chat

##### `commands['@quit']`
type `@dm <to-username> <message>` to send a direct message to a user. 

