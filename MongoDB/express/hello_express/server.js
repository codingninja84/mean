var express = require("express");
var path = require('path')
var app = express()

app.get('/', function(request, response){

})

//static folders
//this just gives the files to the client and does not manipulate them
app.use(express.static(path.join(__dirname + "/static")));

// This sets the location where express will look for the ejs views
app.set('views', __dirname + '/views');
// Now lets set the view engine itself so that express knows that we are using ejs as opposed to another templating engine like jade
app.set('view engine', 'ejs');

app.get("/routeName", function (request, response){
    // hard-coded user data
    var users_array = [
        {name: "Michael", email: "michael@codingdojo.com"},
        {name: "Jay", email: "jay@codingdojo.com"},
        {name: "Brendan", email: "brendan@codingdojo.com"},
        {name: "Andrew", email: "andrew@codingdojo.com"}
    ];
    response.render('viewFileName', {varName: users_array});
})


//if a request comes into this port, do stuff
app.listen(8000, function(){
  console.log("listening on 8000");
})
