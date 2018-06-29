var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require("request");
var weather = "";
var weatherOther ="";
var conditionsOther ="";
var conditions = "";
var othercity ="";
var city = "";
app.use(express.static('files'));

app.set("view engine", "ejs"); 
app.set("views", __dirname + "/files");

var options = {
    url: 'api.openweathermap.org/data/2.5/weather?q=Helsinki&appid=72c21ab22dbd6d374e92ca2bf1412796',
    method: 'GET',
};

app.use(bodyParser.urlencoded({ extended: true }))
var parser = bodyParser.urlencoded({ extended: false });

console.log("testi");

function kutsuHelsinki() {


request('https://api.openweathermap.org/data/2.5/weather?q=Helsinki&appid=72c21ab22dbd6d374e92ca2bf1412796', function (error, response, body) {
        var data = response;
        var teksti = JSON.parse(data["body"]);
        var weatherinKelvin = (teksti["main"]["temp"]);
        conditions = (teksti["weather"][0]["main"]);
        conditions = conditions.toLowerCase();
        if (conditions.includes("clouds")) {
            conditions = "cloudy";
        }
        weather = Math.round(weatherinKelvin - 273.15);
     }
)
}


function otherCity(othercity) {   
request('https://api.openweathermap.org/data/2.5/weather?q=' + othercity + '&appid=72c21ab22dbd6d374e92ca2bf1412796', function (error, response, body) {
        var data = response;
        var teksti = JSON.parse(data["body"]);
        var weatherinKelvin = (teksti["main"]["temp"]);
        conditionsOther = (teksti["weather"][0]["main"]);
        console.log(teksti["name"]);
        conditionsOther = conditionsOther.toLowerCase();
        if (conditions.includes("clouds")) {
            conditions = "cloudy";
        }
        console.log(conditionsOther);
        weatherOther = Math.round(weatherinKelvin - 273.15);
        console.log(weatherOther);
        city = teksti["name"];
        console.log("Toimii");
     }
)
}

app.post("/", parser, function (req, res) {
    try {
    var id = (req.body["city"]);
    console.log(id);
    if (id.length < 3) {
        res.render("index",  { weather: weather, conditions: conditions}); 
        return;
    }
    otherCity(id);
    console.log(city);
    res.render("additionalcity",  { weather: weather, conditions: conditions, city: city, weatherOther: weatherOther, conditionsOther: conditionsOther}); 
    }
    catch(err) {
        console.log("error");
    }
});


app.get("/", (req, res) =>  {
kutsuHelsinki();
res.render("index",  { weather: weather, conditions: conditions}); 
});

app.set( 'port', ( process.env.PORT || 5000 ));

app.listen( app.get( 'port' ), function() {
  console.log( 'Node server is running');
  });
