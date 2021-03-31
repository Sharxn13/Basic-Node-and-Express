require('dotenv').config();
var express = require('express');
var app = express();

console.log("Hello World");
app.get("/json", function(req, res) {
  if (process.env.MESSAGE_STYLE === "uppercase") {
  res.send("{message: " + "Hello Json".toUpperCase() + "}");
  } else {
  res.send("{message: Hello Json");
  }
});
app.use(express.static(__dirname + "/public"));
module.exports = app;