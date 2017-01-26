var express = require('express'),
    app = express(),
    methodOverride = require('method-override'),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    database = require('./config/database'),
    port = process.env.PORT || 3000;

mongoose.connect(database.url);
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());

app.use(methodOverride());

require('./app/routes.js')(app);
var db = mongoose.createConnection('mongodb://127.0.0.1:27017/');
app.listen(port);
console.log("App listening on port : " + port);