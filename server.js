const express = require('express');
const app = express();
const mongoose = require('mongoose');
const routes = require("./routes");
const session = require("express-session");
const bodyParser = require('body-parser');
const passport = require('./config/passport');


app.use(express.static("public"));
app.use(session({
  secret: "cats",
  resave: true,
  saveUninitialized: true,
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost:27017/choober",
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