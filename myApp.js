//creates an Express app object.
var express = require('express');
var app = express();
var bodyParser = require ('body-parser');
// --> 7)  Mount the Logger middleware here


// --> 11)  Mount the body-parser middleware  here


/** 1) Meet the node console. */

/* sending message */
console.log("Hello World");

/* directing html page to all requests */
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

/* directing css page to all requests using express*/
app.use("/", express.static(__dirname + "/public"));


/* aswering to json */
/*
app.get("/json", (req, res) => {
  res.json({message: "Hello json"});
});
*/

app.use("/", function middleware(req, res, next) {
 var string = req.method + " " + req.path + " - " + req.ip; 
 console.log(""+string);
 next();
});


/* Using env file to a password authentication */

app.use('/json', (req, res) => {
	let response = "Hello json";

	if(process.env.MESSAGE_STYLE === 'uppercase') {
		return res.json({message:response.toUpperCase()})
	} else {
  	return res.json({message:response})
	}
})

/* They are together Chained */
const middleware = (req, res, next) => {
  req.time = new Date().toString();
  next();
};
app.get("/now", middleware, (req, res) => {
  res.send({
    time: req.time
  });
});

/* Client Requeriment */
app.get("/:word/echo", (req, res) => {
  const { word } = req.params;
  res.json({
    echo: word
  });
});

/* Client Requeriment */
app.get("/name", function(req, res) {
  var firstName = req.query.first;
  var lastName = req.query.last;

  // Use template literals to form a formatted string
  res.json({
    name: `${firstName} ${lastName}`
  });
});

/* BODY POST */
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/name', (req, res)=>{
  var string = req.body.first + " " + req.body.last;
  res.json({ name: string });
});