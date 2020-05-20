const express = require('express');
const app = express();
const mongoose = require('mongoose');
// const routes = require("./routes");
// const session = require("express-session");
const bodyParser = require('body-parser');
const path = require('path');
const db = require("./models");

// app.use(express.static("client/build"));
app.use(express.static("public"));
// app.use(session({
//   secret: "cats",
//   resave: true,
//   saveUninitialized: true,
// }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect(
  "mongodb://heroku_bbwcnjd8:273qhmfvqq2jhakc5lc4s0b5me@ds229722.mlab.com:29722/heroku_bbwcnjd8",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
);
mongoose.connection.once('open', () => { console.log('MongoDB Connected'); });
mongoose.connection.on('error', (err) => { console.log('MongoDB connection error: ', err); });

/*    

ooo.     .oPYo.      .oPYo.                  o              
8  `8.   8   `8      8   `8                  8              
8   `8  o8YooP'     o8YooP'  .oPYo.  o    o o8P .oPYo.  .oPYo. 
8    8   8   `b      8   `b  8    8  8    8  8  8oooo8  Yb..   
8   .P   8    8      8    8  8    8  8    8  8  8.        'Yb. 
8ooo'    8oooP'      8    8  `YooP'  `YooP'  8  `Yooo'  `YooP' 

*/

app.get('/api/allUsers', function(req, res) {
  db.User
  .find(req.query)
  .then(dbModel => res.json(dbModel))
  .catch(err => res.status(422).json(err));
});

app.get('/api/allProfiles', function(req, res) {
  db.UserProfile
  .find(req.query)
  .then(dbModel => res.json(dbModel))
  .catch(err => res.status(422).json(err));
});

app.get('/api/allInterviews', function(req, res) {
  db.Interviews
  .find(req.query)
  .then(dbModel => res.json(dbModel))
  .catch(err => res.status(422).json(err));
});

app.post('/api/profile', function(req, res) {
  db.UserProfile
  .findOne({ email: `${req.body.email}`})
  .then(dbModel => res.json(dbModel))
  .catch(err => res.status(422).json(err));
});


app.post('/api/login/', function (req, res) {
  db.User
  .findOne({ email: `${req.body.email}` })
  .then(function(dbModel){
      if(dbModel.password === req.body.password) {
          let response = {
              email: `${dbModel.email}`,
              recruiter: dbModel.recruiter
          }
          res.json(response);
      } else {
          res.json(false);
      }
  });
});

if (process.env.NODE_ENV === "production") {

  app.use(express.static(path.join(__dirname, '/client/build')));
  app.get('/', function (req, res) {
    const path = require('path');
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
  });
}

const PORT = process.env.PORT || 3001;
app.listen(PORT);