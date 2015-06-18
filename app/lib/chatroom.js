console.log('loading chatroomssssss');
module.exports = {
  setDirectory: setDirectory,
  getDirectory: getDirectory,
  createRoom: createRoom,
  readChatroom: readChatroom,
  postMessage: postMessage,
  getUserMessages: getUserMessages
};

var fs = require('fs');
var path = require('path');

var _chatDirectory = null;

function setDirectory ( directoryPath ) {
  var directory = null;
  var dirPath = path.resolve(directoryPath);

  try {
    directory = fs.statSync( dirPath );
  } catch (err) {
    fs.mkdirSync( dirPath );
    directory = fs.statSync( dirPath );
  }
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
  fs.writeFileSync( filepath, JSON.stringify(messages));

  return messages;
}

function readChatroom ( roomName, username ){

  var filepath = path.resolve(_chatDirectory, roomName + '.json');
  var fileString = null;

  try {
    fileString = fs.readFileSync( filepath ).toString();
    fileString = JSON.parse(fileString);
  } catch (err){
    fileString = createRoom ( roomName );
  }

  if (username === undefined){
    return fileString;
  }else{
    return fileString.filter(function (message){
      if (message.name === username){
        return true;
      }
    });
  }


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

function getUserMessages (username){
  var userArray = [];
  fs.readdirSync(_chatDirectory).forEach(function (roomName){
    userArray = userArray.concat(readChatroom(roomName.slice(0, -5), username));
  });
  console.log(userArray);
  return userArray;
}