var express = require('express');
var router = express.Router();

var chatroom = require('../lib/chatroom.js');

module.exports = router;

router.get('/:username', function (req, res){
  var username = req.params.username;
});

router.get('/:username/:chatroom', function (req, res){
  var username = req.params.username;
  var chatroom = req.params.chatroom;

});
