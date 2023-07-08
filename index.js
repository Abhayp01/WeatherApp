const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const https = require("https");

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static("views"));

var city = "Delhi";
var weatherData;
var temp;
var temp1;
var temp2;
var temp3;
var temp4;
var weatherDescription
var icon;
var icon1;
var icon2;
var icon3;
var icon4;
var imgUrl;
var imgUrl1;
var imgUrl2;
var imgUrl3;
var imgUrl4;
var weekdays=["Mon","Tue","Wed","Thurs","Friday","Sat","Sun"];
var today=new Date();
var a=today.getDay();

app.get("/", function (req, res) {
    const url = "https://api.openweathermap.org/data/2.5/forecast?q="+city+"&appid=c69fde2bab13cfa24384be7da34bc2fc&units=metric";
    https.get(url, function (response) {
        let data = '';
      
        response.on('data', function (chunk) {
          data += chunk;
        });
      
        response.on('end', function () {
          try {
            const weatherData = JSON.parse(data);
            temp = weatherData.list[0].main.temp;
            temp1 = weatherData.list[8].main.temp;
            temp2 = weatherData.list[16].main.temp;
            temp3 = weatherData.list[24].main.temp;
            temp4 = weatherData.list[32].main.temp;
            icon1 = weatherData.list[8].weather[0].icon;
            icon2 = weatherData.list[16].weather[0].icon;
            icon3 = weatherData.list[24].weather[0].icon;
            icon4 = weatherData.list[32].weather[0].icon;
            weatherDescription = weatherData.list[0].weather[0].description;
            icon = weatherData.list[0].weather[0].icon;
            imgUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            imgUrl1 = "http://openweathermap.org/img/wn/" + icon1 + "@2x.png";
            imgUrl2 = "http://openweathermap.org/img/wn/" + icon2 + "@2x.png";
            imgUrl3 = "http://openweathermap.org/img/wn/" + icon3 + "@2x.png";
            imgUrl4 = "http://openweathermap.org/img/wn/" + icon4 + "@2x.png";
            
            
            res.render("weather", {
                mycity: city,
                day1: weekdays[a%weekdays.length],
                day2: weekdays[(a+1)%weekdays.length],
                day3: weekdays[(a+2)%weekdays.length],
                day4: weekdays[(a+3)%weekdays.length],
                day5: weekdays[(a+4)%weekdays.length],
                temp: temp,
                temp1: temp1,
                temp2: temp2,
                temp3: temp3,
                temp4: temp4,
                weatherDescription: weatherDescription,
                imgUrl: imgUrl,
                imgUrl1: imgUrl1,
                imgUrl2: imgUrl2,
                imgUrl3: imgUrl3,
                imgUrl4: imgUrl4
            });
          } catch (error) {
            console.error('Error parsing JSON data:', error);
          }
        });
      }).on('error', function (error) {
        console.error('Error fetching data:', error);
      });
});


app.post("/", function (req, res) {
    city = req.body.city;

 
    const url = "https://api.openweathermap.org/data/2.5/forecast?q="+city+"&appid=c69fde2bab13cfa24384be7da34bc2fc&units=metric";
    https.get(url, function (response) {
        let data = '';
      
        response.on('data', function (chunk) {
          data += chunk;
        });
      
        response.on("end", function () {
            weatherData = JSON.parse(data);
            temp = weatherData.list[0].main.temp;
            temp1 = weatherData.list[8].main.temp;
            temp2 = weatherData.list[16].main.temp;
            temp3 = weatherData.list[24].main.temp;
            temp4 = weatherData.list[32].main.temp;
            weatherDescription = weatherData.list[0].weather[0].description;
            icon = weatherData.list[0].weather[0].icon;
            icon1 = weatherData.list[8].weather[0].icon;
            icon2 = weatherData.list[16].weather[0].icon;
            icon3 = weatherData.list[24].weather[0].icon;
            icon4 = weatherData.list[32].weather[0].icon;
            
            imgUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            imgUrl1 = "http://openweathermap.org/img/wn/" + icon1 + "@2x.png";
            imgUrl2 = "http://openweathermap.org/img/wn/" + icon2 + "@2x.png";
            imgUrl3 = "http://openweathermap.org/img/wn/" + icon3 + "@2x.png";
            imgUrl4 = "http://openweathermap.org/img/wn/" + icon4 + "@2x.png";
            
            
            res.redirect("/");

        })
    })
    
});





app.listen(process.env.PORT||4000, function () {
    console.log("server started at 4000");

});