const express = require('express'),
      bodyParser = require('body-parser'),
      massive = require('massive'),
      passport = require('passport'),
      Auth0Strategy = require('passport-auth0'),
      config = require('./config.js'),
      cors = require('cors'),
      request = require('request'),
      session = require('express-session')


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(session({
  resave: true, //Without this you get a constant warning about default values
  saveUninitialized: true, //Without this you get a constant warning about default values
  secret: 'things'
}))
app.use(passport.initialize());
app.use(passport.session());

/////////////
// DATABASE //
/////////////
const massiveInstance = massive.connectSync({connectionString: 'postgres://postgres:1234a@localhost/massive_demo'})
// 1234a password
app.set('db', massiveInstance);
const db = app.get('db');

// db.create_user(function(err, user) {
//   if (err) console.log(err);
//   else console.log('CREATED USER');
//   console.log(user);
// })


passport.use(new Auth0Strategy({
   domain:       config.auth0.domain,
   clientID:     config.auth0.clientID,
   clientSecret: config.auth0.clientSecret,
   callbackURL:  '/auth/callback'
  },
  function(accessToken, refreshToken, extraParams, profile, done) {
    //Find user in database
    db.getUserByAuthId([profile.id], function(err, user) {
      user = user[0];
      if (!user) { //if there isn't one, we'll create one!
        console.log('CREATING USER');
        db.createUserByAuth([profile.displayName, profile.id], function(err, user) {
          console.log(err)
          console.log('USER CREATED', userA);
          return done(err, user[0]); // GOES TO SERIALIZE USER
        })
      } else { //when we find the user, return it
        console.log('FOUND USER', user);
        return done(err, user);
      }
    })
  }
));

//THIS IS INVOKED ONE TIME TO SET THINGS UP
passport.serializeUser(function(userA, done) {
  console.log('serializing', userA);
  var userB = userA;
  //Things you might do here :
   //Serialize just the id, get other information to add to session,
  done(null, userB); //PUTS 'USER' ON THE SESSION
});

//USER COMES FROM SESSION - THIS IS INVOKED FOR EVERY ENDPOINT
passport.deserializeUser(function(userB, done) {
  var userC = userC;
  //Things you might do here :
    // Query the database with the user id, get other information to put on req.user
  done(null, userB); //PUTS 'USER' ON REQ.USER
});



app.get('/auth', passport.authenticate('auth0'));


//**************************//
//To force specific provider://
//**************************//
// app.get('/login/google',
//   passport.authenticate('auth0', {connection: 'google-oauth2'}), function (req, res) {
//   res.redirect("/");
// });

app.get('/auth/callback',
  passport.authenticate('auth0', {successRedirect: '/'}), function(req, res) {
    res.status(200).send(req.user);
})

app.get('/auth/me', function(req, res) {
  if (!req.user) return res.sendStatus(404);
  //THIS IS WHATEVER VALUE WE GOT FROM userC variable above.
  res.status(200).send(req.user);
})

app.get('/auth/logout', function(req, res) {
  req.logout();
  res.redirect('/');
})




app.use(express.static('public'));


app.get('/api/weather/data/:city/:country', function(req, res) {
  console.log(req.params);
  console.log(req.body)
  var city = req.params.city;
  var country = req.params.country;
  console.log(city, country);
  request.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + ',' + country + '&appid=ca745d64c069805e15fa79364802f256', function(err, response, raw) {
    if (err) {
      res.status(500).send(err)
    }else {
      res.status(200).send(raw);
    }
  })
})



app.listen(3000 , function() {
  console.log("connnected to port 3000")
})
