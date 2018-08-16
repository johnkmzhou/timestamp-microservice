var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/timestamp/:date_string", 
  (req, res) => {
    const dateString = req.params.date_string;
    let date;
    if(dateString) {
      date = new Date(dateString);
    } else {
      date = new Date(); 
    }
    if(date.toUTCString() === "Invalid Date") {
      res.send({"error": date.toUTCString()});
    } else {
      res.send({"unix": date.getTime(), "utc": date.toUTCString()});
    }
  }
);

// listen for requests :)
var listener = app.listen(process.env.PORT, () => console.log('Your app is listening on port ' + listener.address().port));