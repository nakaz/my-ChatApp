var chai = require('chai');
var expect = chai.expect;

var fs = require('fs');

var chatModule = require('../app/lib/chatroom.js');

describe('Chat Module', function () {
  it('should know where to find Chatroom', function () {
    expect(chatModule.setDirectory( './test/data' ) ).to.be.true;
    expect(chatModule.getDirectory(), 'directory was not set').to.equal('./test/data');
  });

  it('should be able to create a new Chatroom', function () {
    var messages = chatModule.createRoom( 'secret' );
    expect( messages ).to.be.an.instanceof(Array);
    expect( messages ).to.have.length(0);
    fs.existsSync('./data/secret.json', function (exists){
      expect( exists, 'secret.json file does not exist' ).to.be.true;
    });
  });

  it('should get all messages from Chatroom', function(){
    expect( chatModule.readChatroom( 'secret' ) ).to.deep.equal( [] );
  });

  it('should post a message to a Chatroom', function(){
    var firstMessage = {
      name: "Bob",
      message: "Hello"
    };

    var messages = chatModule.postMessage( firstMessage, 'secret');
    expect( messages ).to.be.an.instanceof(Array);

    expect( messages ).to.have.length(1);
    expect( messages[0] ).to.have.property('name', 'Bob');
    expect( messages[0] ).to.have.property('message', 'Hello');
    expect( messages[0] ).to.have.property('id', 1);
    expect( messages[0] ).to.have.property('timestamp');
    expect( messages ).to.deep.equal( chatModule.readChatroom( 'secret' ));


    var secondMessage = {
      name: "Alice",
      message: "RABBITS!"
    };

    messages = chatModule.postMessage( secondMessage, 'secret');

    expect( messages ).to.have.length(2);
    expect( messages[1] ).to.have.property('name', 'Alice');
    expect( messages[1] ).to.have.property('message', 'RABBITS!');
    expect( messages[1] ).to.have.property('id', 2);
    expect( messages[0] ).to.have.property('timestamp');
    expect( messages ).to.deep.equal( chatModule.readChatroom( 'secret' ));
  });

});