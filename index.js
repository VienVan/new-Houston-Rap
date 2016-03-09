//Dependencies
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var hbs = require('hbs');
var passport = require('passport');
var expressSession = require('express-session');
var cookieParser   = require("cookie-parser");
var logger = require('morgan');

//Configurations
mongoose.connect("mongodb://localhost:27017/artists");
process.on('exit', function() { mongoose.disconnect()}); //Shutdown mongoose correctly
app.set('view engine', 'hbs'); //sets view engine to handle bars
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method')); //allow put/delete request in html form
app.use(express.static(__dirname + '/public')); //looks for assets like stylesheets in a 'public' folder
var port = 3000;
app.use(cookieParser());
app.use(expressSession({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(logger('dev'));

require("./config/passport")(passport)


//Routes
var routes = require('./config/routes');
app.use(routes);

app.get('/', function(req, res) {
      res.redirect('/artists');
});


  app.get('/', function(req, res) {
    res.render('artists');
  })
  // app.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}))
  // app.get('/auth/google/callback',
  //         passport.authenticate('google', {
  //                 successRedirect :'/artists',
  //                 failureRedirect :'/'
  //         }));

  app.get('/auth/facebook', passport.authenticate('facebook', {scope: 'email'}))
  app.get('/auth/google/callback',
          passport.authenticate('facebook', {
                  successRedirect :'/artists',
                  failureRedirect :'/'
                  }));


  function isLoggedIn(req, res, next) {
    return req.isAuthenticated() ? next() : res.redirect('/');
  }

app.listen(port, function() {
  console.log("Listening on port: " + port);
})
