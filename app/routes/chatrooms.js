var express = require('express');
var router = express.Router();

var chatroom = require('../lib/chatroom.js');

var validator = require('../lib/validator.js');

module.exports = router;

router.use(function(req, res, next){
  // console.log("running router use");
  next();
});

router.route('/:chatroom')
  .get(function (req, res){
    var chatname = req.params.chatroom;

    var messages = chatroom.readChatroom(chatname);
    res.json(messages);
  })
  .post(
    validator.stringCheck,
    validator.checkNameLength,
    validator.checkMessageLength,
    function (req, res){
      var chatroomName = req.params.chatroom;
      var message = {
        name: req.body.name,
        message: req.body.message
      };
      var messages = chatroom.postMessage( message, chatroomName);
      res.json(messages);
  });
