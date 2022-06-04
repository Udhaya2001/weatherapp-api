const express = require("express");
const https = require("https");
const bodyparser = require("body-parser");
const { dirname } = require("path");

const app = express();
app.use(bodyparser.urlencoded({extended:true}));

app.get("/", function(req,res){
    res.sendFile(__dirname+"/index.html");
});


app.post("/",function(req,res){
    const cityName = req.body.cityname

    const url= "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid=d2cbad4c29dc7c5c2f10d70e0ce7b5ea&units=metric";
    
    https.get(url, function(response){
        console.log(response.statusCode)
        response.on("data",function(data){
            const weatherData = JSON.parse(data)
            const Temp = weatherData.main.temp
            const weatherDiscription = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const iconUrl = "http://openweathermap.org/img/wn/"+icon+"@2x.png"

            res.write("<p>The weather is currently "+ weatherDiscription +" </p>");
            res.write("<h1>The temperature in "+cityName+" is "+ Temp +" degree Celcius.</h1>");
            res.write("<img src=" + iconUrl + ">");
            res.send();
    
        });
     });

});  
    
app.listen(5000,function(){
    console.log("Server started at port 5000");
});