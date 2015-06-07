var config = require('./config.json');

var express = require('express');

var app = express();

var bodyParser = require('body-parser');

var chatroom = require('./app/lib/chatroom.js');
console.log(chatroom);

app.use(express.static(__dirname + '/public'));

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(bodyParser.json());

app.get('/', function (req, res){
  res.render('index');
});

// app.get('/greet/:name', function (request, response){
//   // console.log(request.params);
//   var name = request.params.name;
//   name = name[0].toUpperCase() + name.slice(1);
//   response.render('index', {name: name});
// });

app.get('/:chatname', function (req, res){

  //check if directory does not exist
    //create Chatroom
  // return read directory (use: res.json)


  var chatname = req.params.chatname;
  if (chatname === '' | !chatroom.hasOwnProperty(chatname)){
    res
      .status(404)
      .json({message: "Chatroom not found"})
  }
  var messages = chatroom[chatname];
  res.json(messages);
});

app.post('/:chatroom', function (req, res){
  console.log(req.body);
  res.send(req.body);
});

// app.get('/users', function (resqust, response){
//   response.json(users);
// });

// app.post('/', function(request, response){
//   response.send({"message": "Hello, World!"});
// });

var server = app.listen(config.port, displayServerInfo);

function displayServerInfo(){
  var host = server.address().address;
  var port = server.address().port;
  console.log('Listening at http://%s:%s', host, port);
};


// app.listen(config.port);