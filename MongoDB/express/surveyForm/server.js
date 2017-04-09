// require express
var express = require("express");
// path module -- try to figure out where and why we use this
var path = require("path");
// create the express app
var app = express();
var bodyParser = require('body-parser');


// use it!
app.use(bodyParser.urlencoded({ extended: true }));
// static content
app.use(express.static(path.join(__dirname, "./static")));
app.use(express.static(path.join(__dirname, "./node_modules")));
// setting up ejs and our views folder
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
// root route to render the index.ejs view
app.get('/', function(req, res) {
 res.render("index");
})
// post route for adding a user
app.post('/login', function(req, res) {
 console.log("POST DATA", req.body);

 var data = {
   first_name: req.body.first_name,
   last_name: req.body.last_name,
   lang: req.body.lang,
   text: req.body.text
 }

 res.render('result', data);
})
// tell the express app to listen on port 8000
var server = app.listen(8000, function() {
 console.log("listening on port 8000!!!!");
});

var io = require('socket.io').listen(server);

// Whenever a connection event happens (the connection event is built in) run the following code
io.sockets.on('connection', function (socket) {
console.log("WE ARE USING SOCKETS!");

    socket.on("button_clicked", function (data){
    socket.emit('server_response', {response: "sockets are the best!"});

  })
    socket.on("first_name_typed", function(input){
      console.log(input.input);
      socket.emit("text_response", input)
    })
})

var http        = require("http"),
        terminal    = require("web-terminal");

    var app = http.createServer(function (req, res) {
        res.writeHead(200, {"Content-Type": "text/plain"});
        res.end("Hello World\n");
    });

    app.listen(1337);
    console.log("Server running at http://127.0.0.1:1337/");

    terminal(app);
    console.log("Web-terminal accessible at http://127.0.0.1:1337/terminal");
    
