console.log('loading chatroomssssss');
module.exports = {
  setDirectory: setDirectory,
  getDirectory: getDirectory,
  createRoom: createRoom,
  readChatroom: readChatroom,
  postMessage: postMessage
};

var fs = require('fs');
var path = require('path');

var _chatDirectory = null;

function setDirectory ( directoryPath ) {
  var directory = fs.statSync(path.resolve(directoryPath));
  var isDirectory = directory.isDirectory();

  if (isDirectory){
    _chatDirectory = directoryPath;
  }

  return isDirectory;
}

function getDirectory (){
  return _chatDirectory;
}

function createRoom ( roomName ){
  var messages = [];
  var filepath = path.resolve(_chatDirectory, roomName + '.json');
  fs.writeFileSync( filepath, JSON.stringify(messages) );

  return messages;
}

function readChatroom ( roomName ){
  var filepath = path.resolve(_chatDirectory, roomName + '.json');
  var fileString = fs.readFileSync( filepath ).toString();

  return JSON.parse( fileString );

}

function postMessage ( message, roomName ) {
  var messages = readChatroom( roomName );
  var newMessage = {
    name: message.name,
    message: message.message,
    id: messages.length + 1,
    timestamp: new Date().toString()
  };

  messages.push(newMessage);

  var filepath = path.resolve(_chatDirectory, roomName + '.json');
  fs.writeFileSync( filepath, JSON.stringify(messages) );

  return messages;
}