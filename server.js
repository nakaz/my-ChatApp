var config = require('./config.json');

var express = require('express');

var app = express();

var bodyParser = require('body-parser');

var chatroom = require('./app/lib/chatroom.js');
chatroom.setDirectory('./app/data');
console.log(chatroom);

app.use(express.static(__dirname + '/public'));

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(bodyParser.json());

app.get('/chatrooms', function (req, res){
  res.render('index');
});

// Require the chatroom and user routes
app.use('/chatrooms', require('./app/routes/chatrooms.js'));
app.use('/users', require('./app/routes/users.js'));

var server = app.listen(config.port, displayServerInfo);

function displayServerInfo(){
  var host = server.address().address;
  var port = server.address().port;
  console.log('Listening at http://%s:%s', host, port);
}