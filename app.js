const { log } = require("console");
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({encoded:true}));

app.get("/", function(req,res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req,res) {
    const city = req.body.cityName;
    const apiKey = "";
    const unit  = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=" + unit;
    https.get(url, function(response){

        response.on("data", function(data) {
            const weatherData = JSON.parse(data);
            const desc = weatherData.weather[0].description;
            const temp = weatherData.main.temp;
            const icon = weatherData.weather[0].icon;
            const imageURL = "https://api.openweathermap.org/img/wn" + icon + "@2x.png";
            res.write("<h1>The temperature in " +  city + " is " + temp + " degrees celcius</h1>");
            res.write("The weather is currently " + desc);
            res.write("<img src" + imageURL +">");
            res.send();
        });
    });
});
app.listen(3000, function() {
    console.log("Server is listening on port 3000");
});