var express = require('express');
var router = express.Router();

var chatroom = require('../lib/chatroom.js');

module.exports = router;

router.use(function(req, res, next){
  console.log("chatroom router");
  next();
});

router.route('/:chatroom')
  .get(function (req, res){
    var chatname = req.params.chatname;

    var messages = chatroom.readChatroom(chatname);
    res.json(messages);
  })
  .post(function (req, res){
    var chatroomName = req.params.chatroom;
    var message = {
      name: req.body.name,
      message: req.body.message
    };
    var messages = chatroom.postMessage( message, chatroomName);
    res.json(messages);
});
