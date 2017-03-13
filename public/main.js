var app = app || {};

app.main = (function() {
  console.log('Your code starts here!');

  // Initialize variables
  var username;
  var connected = false;
  var socket = io();

  // All socket listeners go here
  var socketSetup = function(callback){
    // Socket events
    // Whenever the server emits 'login', log the login message
    socket.on('login', function (data) {
      connected = true;
      // Display the welcome message
      log("Welcome to Swerdz Chat");
      addParticipantsMessage(data);
    });

    // Whenever the server emits 'new message', update the chat body
    socket.on('new message', function (data) {
      console.log(data);
      addChatMessage(data);
    });


    // Whenever the server emits 'new message', update the chat body
    socket.on('new img', function (data) {
      addImage(data);
    });

    // Whenever the server emits 'user joined', log it in the chat body
    socket.on('user joined', function (data) {
      log(data.username + ' just joined');
      addParticipantsMessage(data);
    });

    // Whenever the server emits 'user left', log it in the chat body
    socket.on('user left', function (data) {
      // log(data.username + ' left the conversation');
      addParticipantsMessage(data);
    });

    // Call attachEvents
    callback();
  };

  // Log a message
  var log = function(message) {
    var $el = $('<li>').addClass('log').text(message);
    $('.messages').append($el);
    scrollToTop();
  }

  var scrollToTop = function() {
    $('.messages')[0].scrollTop = $('.messages')[0].scrollHeight;
  }

  var addParticipantsMessage = function(data) {
    var message = '';
    if (data.numUsers === 1) {
      // message += "Hmm.. there's no one else in this conversation. Invite them to chat!";
    } else {
      // message += "There are " + data.numUsers + " participants";
    }
    log(message);
  }

  // Provisional Code
  // $('#statementIcon').click(function (e) {
  //     e.preventDefault();
  //     window.location.hash = '#statement';
  //     var close = $('.close');
  //     close.addClass('visible');
  //   }); 

  // Keyboard events
  var attachEvents = function(){
    $('.usernameInput').keypress(function(e) {
      if (e.keyCode == 13) {
        setUsername();
      }
    });
    $('.inputMessage').keypress(function(e) {
      if (e.keyCode == 13) {
        sendMessage();
      }
    });
    $('.question').click(function(e) {
      e.preventDefault();
      renderQuestionPage();
    });
    $('.close').click(function(e) {
      e.preventDefault();
      renderClose();
    });
  };

  function renderQuestionPage(){
    var page = $('.help');
    page.removeClass('page');
    var question = $('.question');
    question.addClass('transparent');

    var vocabularyContent = [];
    var fetchData = $.getJSON("../temp/data.json", function(data){
      vocabularyContent.push(data);
}).done(function() {
        console.log( "second success" );
    })
    .fail(function() {
        console.log( "error" );
    })
    .always(function() {
        $("#vocabulary")[0].html = vocabularyContent;
    });
      // $( "<ul/>", {
      //   "class": "my-new-list",
      //   html: items.join( "" )
      // }).appendTo( "body" );
  
}

  function renderClose(){
    var close = $('.help');
    close.addClass('page');
    var question = $('.question');
    question.removeClass('transparent');
  }

      var newName = "";
      var iUser = "";
      var test = "";
      // var possible = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
      var words = ["Cat", "Dog", "Telephone", "Sven", "Light", "Dylan", "Paris", "Zahra", "Karla", "Merci", "Thanks", "Damn", "Beer", "Wine", "Everyone",
                  "is wet", "Guilt", "Ben", "Sin", "Nicolas", "Disnovation"];
      // var words = {};

      var text = "";
      var tempText = "";
      var newWord = "";
      var isWord = true;
      var isThere = false;
      var isImg = false;
      var isMus = false;
      var musCount = 2;

  // Sets the client's username
  var setUsername = function() {
    username = $('.usernameInput').val();

    // If the username is valid
    if (username) {
      // for(var i = 0; i<username.length; i++){
      //   test += possible.charAt(Math.floor(Math.random() * possible.length));
      // }
      // newName = test;
      $('.login.page').fadeOut();
      $('.chat.page').show();
      $('#bgMusic')[0].volume = 0.1;
      $('#bgMusic')[0].play();
      // Tell the server your username
      socket.emit('add user', username);
      iUser = username;
      // socket.emit('add user', newName);
    }
  }

  // Sends a chat message
  var sendMessage = function() {
      isWord = true;
      isThere = false;
    var message = $('.inputMessage').val();
      var isWord = true;

    // if there is a non-empty message and a socket connection
    if (message && connected) {
      $('.inputMessage').val('');
      isMus = false;
      newWord = "";

      // if(1){
      //   var xhr = $.get("http://api.giphy.com/v1/gifs/search?q="+message+"&api_key=dc6zaTOxFJmzC&limit=5");
      //   xhr.done(function(data) { 
      //     console.log(data.data[0].images.original.url);
      //     var img = data.data[0].images.original.url;
      //     var newDiv = "<img src='"+img+"''/>"
      // addImage({
      //   username: username,
      //   // message: message
      //   // username: newName,
      //   message: newDiv
      // });
      //     socket.emit('new img', newDiv);
      //   });
      // }

      for(var i = 0; i<message.length; i++){
        if(message.charAt(i)==' '){
          tempText += ' ';
            isWord = true;
        }else if(message.charAt(i)=='\,'||message.charAt(i)=='\.'||message.charAt(i)=='\?'||message.charAt(i)=='\!'||message.charAt(i)=='\''){
          tempText += message.charAt(i);
            isWord = true;
        }else{
          // tempText += possible.charAt(Math.floor(Math.random() * possible.length));
          if(isWord==true){
            if(newWord=="gif"){
                isImg = true;
            }else if(newWord=="mus"){
              $('#bgMusic')[0].pause();
              $('#bgMusic')[0].src = "./music/"+musCount+".mp3";
              $('#bgMusic')[0].play();
              musCount++;
              if(musCount>12) musCount = 1;
              isMus = true;
            }
            newWord = "";
            newWord += message.charAt(i);
            tempText+=words[Math.floor(Math.random()*words.length)];
            isWord = false;
          }else{
            newWord+= message.charAt(i);
          }
        }
      }
      
      if(message=="mus"){
              $('#bgMusic')[0].pause();
              $('#bgMusic')[0].src = "./music/"+musCount+".mp3";
              $('#bgMusic')[0].play();
              musCount++;
              if(musCount>12) musCount = 1;
              isMus = true;
      }
      // if(newWord!=""){
      //   for(var j = 0; j<words.length; j++){
      //       if(words[j]==newWord){
      //         isThere = true;
      //       }
      //     }
      //   if(isThere==false){
      //    words.push(newWord);
      //   }
      // }
      // newWord = "";

            // console.log(words);
      text = tempText;
      tempText = "";

      if(isImg){
        var tempMsg = message.replace("gif", "");
        // var xhr = $.get("http://api.giphy.com/v1/gifs/search?q="+tempMsg+"&api_key=dc6zaTOxFJmzC&limit=5");
        var xhr = $.get("http://api.giphy.com/v1/gifs/random?tag="+tempMsg+"&api_key=dc6zaTOxFJmzC&limit=5");
        xhr.done(function(data) { 
          var img = data.data.image_url;
          var newDiv = "<img src='"+img+"''/>"
      // addImage({
      //   username: username,
      //   // message: message
      //   // username: newName,
      //   message: newDiv
      // });
          socket.emit('new img', newDiv);
        });
      }else if(isMus){
        isMus = false;
      }else{
      //   addChatMessage({
      //   username: username,
      //   // message: message
      //   // username: newName,
      //   message: text
      // });
      // tell server to execute 'new message' and send along one parameter
      socket.emit('new message', message);
      // socket.emit('new message', text);
      }
      isImg = false;
    }
  }

  // Adds the visual chat message to the message list
  var addChatMessage = function(data) {
    var $usernameDiv = $('<span class="username"/>').text(data.username);
    var $messageBodyDiv = $('<span class="messageBody">').text(data.message);

    var talkMsg = new SpeechSynthesisUtterance(data.message);
    var voices = window.speechSynthesis.getVoices();
    speechSynthesis.getVoices().forEach(
      function(voice){
        // console.log(voice.name, voice.default ? voice.default :'');
      }
    );

    talkMsg.rate = 0.8;
    console.log(speechSynthesis.getVoices()[Math.floor(Math.random()*speechSynthesis.getVoices().length)]);
    talkMsg.voice = speechSynthesis.getVoices()[Math.floor(Math.random()*speechSynthesis.getVoices().length)];

    // talkMsg.voice = speechSynthesis.getVoices().filter(function(voice) { 
    //   console.log(speechSynthesis.getVoices().length);
    //   return voice.name == 'Thomas'; 

    // })[0];
    // talkMsg.lang = 'cn-CN';
    speechSynthesis.speak(talkMsg);
    // window.speechSynthesis.speak(talkMsg);

    var $messageDiv = $('<li class="message"/>')
                      .data('username', data.username)
                      .append($usernameDiv, $messageBodyDiv);

    if(data.username==iUser){
      $messageDiv[0].style.textAlign = "right";
      $usernameDiv[0].style.float = "right";
      $usernameDiv[0].style.paddingLeft = "15px";
    }
    $('.messages').append($messageDiv);
    scrollToTop();
  };

  var addImage = function(data) {
    var $usernameDiv = $('<span class="username"/>').text(data.username);
    var $messageBodyDiv = $(data.message);

    var $messageDiv = $('<li class="message"/>')
                      .data('username', data.username)
                      .append($usernameDiv, $messageBodyDiv);

    if(data.username==iUser){
      $messageDiv[0].style.textAlign = "right";
      $usernameDiv[0].style.float = "right";
      $usernameDiv[0].style.paddingLeft = "15px";
    }

    $('.messages').append($messageDiv);
    scrollToTop();
  }


  var init = function(){
    console.log('Initializing app.');
    socketSetup(attachEvents);  // Sending attachEvents as a callback
  };

  return {
    init: init
  };

})();

window.addEventListener('DOMContentLoaded', app.main.init);

// Additional reading: https://javascriptweblog.wordpress.com/2010/07/06/function-declarations-vs-function-expressions/