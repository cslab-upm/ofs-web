var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var path = require('path');


app.use(express.static(__dirname + './public'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());


app.get('/', function(req, res){
  res.sendFile(__dirname +'../index.html');
});


console.log('server running at 3000!')
app.listen(3000);