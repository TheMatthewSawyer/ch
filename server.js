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

// app.use(routes);

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


app.post('/api/login/', function (req, res) {
  db.User
  .findOne({ email: `${req.body.email}` })
  .then(function(dbModel){
      if(dbModel.password === req.body.password) {
          let response = {
              email: `${dbModel.email}`,
              recruiter: `${dbModel.recruiter}`
          }
          res.json(response);
      } else {
          res.json(false);
      }
  });
});
  // .catch( function() {
  //     res.json(false);
  // });
// });

if (process.env.NODE_ENV === "production") {

  app.use(express.static(path.join(__dirname, '/client/build')));
  app.get('/', function (req, res) {
    const path = require('path');
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
  });
}



const PORT = process.env.PORT || 3001;
app.listen(PORT);


// handleSubmit = async event => {
//   event.preventDefault();

//   // Promise is resolved and value is inside of the response const.
//   const response = await API.delete(`users/${this.state.id}`);

//   console.log(response);
//   console.log(response.data);
// };