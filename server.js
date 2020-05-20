const express = require('express');
const app = express();
const mongoose = require('mongoose');
const routes = require("./routes");
const session = require("express-session");
const bodyParser = require('body-parser');
// mongo ds229722.mlab.com:29722/heroku_bbwcnjd8 -u heroku_bbwcnjd8 -p 273qhmfvqq2jhakc5
// lc4s0b5me pass
app.use(express.static("public"));
app.use(session({
  secret: "cats",
  resave: true,
  saveUninitialized: true,
}));
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect(
  "mongodb://heroku_bbwcnjd8:273qhmfvqq2jhakc5lc4s0b5me@ds229722.mlab.com:29722/heroku_bbwcnjd8",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.use(routes);
// routes.initialize(app);

const PORT = process.env.PORT || 3001;
app.listen(PORT);