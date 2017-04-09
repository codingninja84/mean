var express = require('express');
// Create an Express App
var app = express();
// Require body-parser (to receive post data from clients)
var bodyParser = require('body-parser');
// Integrate body-parser with our App

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test_users');

//kinda like the table in mySQL
var UserSchema = new mongoose.Schema({
 name: {type: String, required: true, minlength: 2},
 last: {type: String, required: true, minlength: 2}
}, {timestamps: true})
mongoose.model('User', UserSchema); // We are setting this Schema in our Models as 'User'
var User = mongoose.model('User') // We are retrieving this Schema from our Models, named 'User'


app.use(bodyParser.urlencoded({ extended: true }));
// Require path
var path = require('path');
// Setting our Static Folder Directory
app.use(express.static(path.join(__dirname, './static')));
// Setting our Views Folder Directory
app.set('views', path.join(__dirname, './views'));
// Setting our View Engine set to EJS
app.set('view engine', 'ejs');
// Routes
// Root Request
app.get('/', function(req, res) {
    User.find({}, function(err, users){
      if (err){
        console.log("Users not retrieved");
      } else {
        console.log("Users retrieved" + users);
      }
    })
    // This is where we will retrieve the users from the database and include them in the view page we will be rendering.
    res.render('index');
})
// Add User Request
app.post('/users', function(req, res) {
    var user = new User({name: req.body.first, last: req.body.last})
    user.save(function(err){
      if (err){
        console.log(user.errors);
        res.render('index', {title: 'you have errors!', errors: user.errors})
      } else {
        console.log("Success");
      }
    })
    res.redirect('/');
})
// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
})
