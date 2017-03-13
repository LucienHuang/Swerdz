var express = require('express');
// var fileSys = require('./fileSys.js');
var randomWord = require('./randomWord.js');
var app = express();
var PORT = 3000;

var jsonfile = require('jsonfile');
const Language = require('@google-cloud/language');
const projectId = '#1071459757335';

const languageClient = Language({
  projectId: projectId
});

var jsonfile = require('jsonfile');

var file = "temp/data.json"
jsonfile.spaces = 4;

var file2 = "public/temp/data.json"

var text = "";
var tempText = "";
var newWord = "";
var isWord = true;
var isThere = false;
const language = Language();

// var obj = {
//   noun:['frog','snake','eggplant','sweet'],
//   verb:'suck',
//   adj:'attractive'
// };

// Routing
app.use('/', express.static(__dirname + '/public'));

// Socket.io setup
var server = require('http').createServer(app);
var io = require('socket.io')(server);

server.listen(PORT, function(){
    console.log('Server listening at port ' + PORT);
});

// ------------- APP -----------------
var numUsers = 0;

io.on('connection', function (socket) {
  var addedUser = false;

  // when the client emits 'add user', this listens and executes
  socket.on('add user', function (username) {
    if (addedUser) return;

    // we store the username in the socket session for this client
    socket.username = username;
    ++numUsers;
    addedUser = true;
    socket.emit('login', {
      numUsers: numUsers
    });
    // echo globally (all clients) that a person has connected
    socket.broadcast.emit('user joined', {
      username: socket.username,
      numUsers: numUsers
    });
  });

  // when the client emits 'new message', this listens and executes
  socket.on('new message', function (data) {
      // we tell the client to execute 'new message'
      // var words =  fileSys.readWords(data);
      // console.log(words);

      jsonfile.readFile(file, function (err, obj) {
          // console.log(obj.noun[2]);
          // var words = randomWord.changeWord(data, obj);

          isWord = true;
          // console.log(obj);
          var message = data;
          // var words = obj.noun;
          console.log("data: " + data);
          // console.log("obj: " + obj);

          // analyzeSyntaxOfText(message, obj);
          language.detectSyntax(message)
              .then(function (results) {
                console.log("Start analyzing");
                  var newSentence = "";
                  // console.log(results[0][0].text);
                  for (var n = 0; n < results[0].length; n++) {

                      if (results[0][n].text.length < 16) {
                          console.log(results[0][n].tag + ' ' + results[0][n].text);
                          if (results[0][n].tag == "NOUN") {
                              // console.log(obj);
                              var existed = false;
                              for (var m = 0; m < obj.noun.length; m++) {
                                  if (obj.noun[m] == results[0][n].text) {
                                      existed = true;
                                  }
                              }
                              if (existed == false) {
                                  obj.noun.push(results[0][n].text);

                                  jsonfile.writeFile(file, obj, function (err) {
                                      // console.error(err);
                                  });
                              }
                          } else if (results[0][n].tag == "VERB") {
                              // console.log(obj);
                              var existed = false;
                              for (var m = 0; m < obj.verb.length; m++) {
                                  if (obj.verb[m] == results[0][n].text) {
                                      existed = true;
                                  }
                              }
                              if (existed == false) {
                                  obj.verb.push(results[0][n].text);

                                  jsonfile.writeFile(file, obj, function (err) {
                                      // console.error(err);
                                  });
                              }
                          } else if (results[0][n].tag == "PRON"||results[0][n]=="what") {
                              // console.log(obj);
                              var existed = false;
                              for (var m = 0; m < obj.pron.length; m++) {
                                  if (obj.pron[m] == results[0][n].text) {
                                      existed = true;
                                  }
                              }
                              if (existed == false) {
                                  obj.pron.push(results[0][n].text);

                                  jsonfile.writeFile(file, obj, function (err) {
                                      // console.error(err);
                                  });
                              }
                          } else if (results[0][n].tag == "ADJ") {
                              // console.log(obj);
                              var existed = false;
                              for (var m = 0; m < obj.adj.length; m++) {
                                  if (obj.adj[m] == results[0][n].text) {
                                      existed = true;
                                  }
                              }
                              if (existed == false) {
                                  obj.adj.push(results[0][n].text);

                                  jsonfile.writeFile(file, obj, function (err) {
                                      // console.error(err);
                                  });
                              }
                          } else if (results[0][n].tag == "ADV") {
                              // console.log(obj);
                              var existed = false;
                              for (var m = 0; m < obj.adv.length; m++) {
                                  if (obj.adv[m] == results[0][n].text) {
                                      existed = true;
                                  }
                              }
                              if (existed == false) {
                                  obj.adv.push(results[0][n].text);

                                  jsonfile.writeFile(file, obj, function (err) {
                                      // console.error(err);
                                  });
                              }
                          } else if (results[0][n].tag == "DET") {
                              // console.log(obj);
                              var existed = false;
                              for (var m = 0; m < obj.det.length; m++) {
                                  if (obj.det[m] == results[0][n].text) {
                                      existed = true;
                                  }
                              }
                              if (existed == false) {
                                  obj.det.push(results[0][n].text);

                                  jsonfile.writeFile(file, obj, function (err) {
                                      // console.error(err);
                                  });
                              }
                          } else if (results[0][n].tag == "ADP") {
                              // console.log(obj);
                              var existed = false;
                              for (var m = 0; m < obj.adp.length; m++) {
                                  if (obj.adp[m] == results[0][n].text) {
                                      existed = true;
                                  }
                              }
                              if (existed == false) {
                                  obj.adp.push(results[0][n].text);

                                  jsonfile.writeFile(file, obj, function (err) {
                                      // console.error(err);
                                  });
                              }
                          } else if (results[0][n].tag == "CONJ") {
                              // console.log(obj);
                              var existed = false;
                              for (var m = 0; m < obj.conj.length; m++) {
                                  if (obj.conj[m] == results[0][n].text) {
                                      existed = true;
                                  }
                              }
                              if (existed == false) {
                                  obj.conj.push(results[0][n].text);

                                  jsonfile.writeFile(file, obj, function (err) {
                                      // console.error(err);
                                  });
                              }
                          } else if (results[0][n].tag == "PUNCT") {
                              // console.log(obj);
                              var existed = false;
                              for (var m = 0; m < obj.punct.length; m++) {
                                  if (obj.punct[m] == results[0][n].text) {
                                      existed = true;
                                  }
                              }
                              if (existed == false) {
                                  obj.punct.push(results[0][n].text);

                                  jsonfile.writeFile(file, obj, function (err) {
                                      // console.error(err);
                                  });
                              }
                          } else if (results[0][n].tag == "NUM") {
                              // console.log(obj);
                              var existed = false;
                              for (var m = 0; m < obj.num.length; m++) {
                                  if (obj.num[m] == results[0][n].text) {
                                      existed = true;
                                  }
                              }
                              if (existed == false) {
                                  obj.num.push(results[0][n].text);

                                  jsonfile.writeFile(file, obj, function (err) {
                                      // console.error(err);
                                  });
                              }
                          } else {
                              var existed = false;
                              for (var m = 0; m < obj.x.length; m++) {
                                  if (obj.x[m] == results[0][n].text) {
                                      existed = true;
                                  }
                              }
                              if (existed == false) {
                                  obj.x.push(results[0][n].text);

                                  jsonfile.writeFile(file, obj, function (err) {
                                      // console.error(err);
                                  });
                              }
                          }
                      }

                      console.log(n);
                      if (results[0][n].tag == "NOUN") {
                          newSentence += obj.noun[Math.floor(Math.random() * obj.noun.length)];
                      } else if (results[0][n].tag == "VERB") {
                          newSentence += obj.verb[Math.floor(Math.random() * obj.verb.length)];
                      } else if (results[0][n].tag == "ADJ") {
                          newSentence += obj.adj[Math.floor(Math.random() * obj.adj.length)];
                      } else if (results[0][n].tag == "ADV") {
                          newSentence += obj.adv[Math.floor(Math.random() * obj.adv.length)];
                      } else if (results[0][n].tag == "PRON") {
                          newSentence += obj.pron[Math.floor(Math.random() * obj.pron.length)];
                      } else if (results[0][n].tag == "DET") {
                          newSentence += obj.det[Math.floor(Math.random() * obj.det.length)];
                      } else if (results[0][n].tag == "ADP") {
                          newSentence += obj.adp[Math.floor(Math.random() * obj.adp.length)];
                      } else if (results[0][n].tag == "CONJ") {
                          newSentence += obj.conj[Math.floor(Math.random() * obj.conj.length)];
                      } else if (results[0][n].tag == "PUNCT") {
                          newSentence += obj.punct[Math.floor(Math.random() * obj.punct.length)];
                      } else if (results[0][n].tag == "X") {
                          newSentence += obj.x[Math.floor(Math.random() * obj.x.length)];
                      } else if (results[0][n].tag == "X") {
                          newSentence += obj.x[Math.floor(Math.random() * obj.x.length)];
                      } else if (results[0][n].tag == "NUM") {
                          newSentence += obj.num[Math.floor(Math.random() * obj.x.length)];
                      }
                      newSentence += ' ';
                  }

                  console.log("New sentence " + newSentence);

                  io.emit('new message', {
                      username: socket.username,
                      message: newSentence

                      // message: data
                  });

              });


          // socket.broadcast.emit('new message', {
          //   username: socket.username,
          //   message: words
          //   // message: data
          // });

          // REMEMBER:
          // io.sockets.emit -----will send to all the clients
          // socket.broadcast.emit -----will send the message to all the other clients except itself
          // http://stackoverflow.com/questions/10342681/whats-the-difference-between-io-sockets-emit-and-broadcast
      });
  });

    socket.on('new img', function (data) {
    // we tell the client to execute 'new message'
    io.emit('new img', {
      username: socket.username,
      message: data
    });
    // REMEMBER:
    // io.sockets.emit -----will send to all the clients
    // socket.broadcast.emit -----will send the message to all the other clients except itself
    // http://stackoverflow.com/questions/10342681/whats-the-difference-between-io-sockets-emit-and-broadcast
  });



  // when the user disconnects.. perform this
  socket.on('disconnect', function () {
    if (addedUser) {
      --numUsers;

      // echo globally that this client has left
      socket.broadcast.emit('user left', {
        username: socket.username,
        numUsers: numUsers
      });
    }
  });
});
