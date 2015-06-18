//jQuery Chat w/ login - FINAL
var $body = $('body')
            .css({
              background: 'black',
            });

var $title = $('<h1>d@rkNetz Chatterz</h1>')
             .css({
               color: '#9544C2',
               fontFamily: 'helvetica',
               textAlign:'center',
             });
$body.append($title);

var $login = $('<form>')
             .css({
               textAlign: 'center',
               margin: '0 auto',
               marginBottom: '.8em',
             });

var $chatContainer = $('<div id="chatRoom">')
                 .css({
                   border: '.5em solid #3149B8',
                   background: '#222',
                   width: '95%',
                   height:'30em',
                   overflowY: 'auto',
                   padding: '.5em',
                   margin: '0 auto',
                   marginBottom: '.8em'
                 });

var $inputRoom = $('<input name="room" id="room" class="fancyLog"  placeholder="Netz Target">');
var $inputName = $('<input name="name" id="name" class="fancyLog" placeholder="Namesake">');

var store = [];

function appendData(data){
  $.each(data, function(key, value){
    var $message = $('<p>');
    $message.html('<span class="username">[' + value.name + ']</span> ' + value.message + '<span class="end"> /END</span')
    .css({
      fontFamily: 'courier',
      color: '#1EBA73',
    });
    $chatContainer.append($message);
  });
}

$.fn.login = function () {
  var $submitLogin = $('<button id="submitLogin" class="niceBtn">')
                     .attr('type', 'submit')
                     .text('Enter Netz');

  $login.on('submit', function(event){
    event.preventDefault();
    var room = $('#room').val();
    var name = $('#name').val();
    function newRequest(){
      $.ajax({
        url: 'http://localhost:8080/chatrooms/' + room,
        type: 'GET',
        data: JSON.stringify(),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        async: true,
        success: function(data){
          $('#chatRoom').empty();
          $('#room').replaceWith(function(){
            return '<span class="front">~/.netz: </span>'+'<span class="nameAfter" id="thisRoom">'+this.value+'</span>';
          });

          $('#name').replaceWith(function(){
             return '<span class="frontU">@user: </span>'+'<span class="nameAfter" id="finalName">'+this.value+'</span>';
          });

          $('#submitLogin').hide();

          if (store.length < data.length){
        $('#chatRoom').animate({scrollTop: $('#chatRoom')[0].scrollHeight});
          }

          store = data;

          appendData(store);

          newRequest();
        }

      });
    }
    newRequest();
  });
  $body.append($login, $chatContainer);
  $login.append($inputRoom, $inputName, $submitLogin);
};

$.fn.login();

var $form = $('<form>')
        .css({
          textAlign: 'center',
          margin: '0 auto',
        });
$body.append($form);

$.fn.enterRoom = function (){
  var $inputMsg = $('<input name="message" id="msg" class="fancy" placeholder="Write Message Here!">');
  var $button = $('<button class="niceBtn">')
              .attr('type', 'submit')
              .text('Send Message');

  $form.append($inputMsg, $button);

  $form.on('submit', function(event){
    event.preventDefault();
    var room = $('#thisRoom').html();
    var name = $('#finalName').html();
    var msg = $('#msg').val();
    var newMsg = {name: name, message: msg};
    $.ajax({
      url: 'http://localhost:8080/chatrooms/' + room,
      type: 'POST',
      data: JSON.stringify(newMsg),
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      async: false,
      success: function(data){
        $('#msg').val('');
        var $filtered = data.filter(isNew);
        appendData($filtered);
        $('#chatRoom').animate({scrollTop: $('#chatRoom')[0].scrollHeight}, 1000);
        store = data;
      }
    });
  });
};

$.fn.enterRoom();

function isNew(element, index, array){
  if (store.length <= index){
    return true;
  }
  if (element.id === store[index].id){
    return false;
  }
  return true;
}
