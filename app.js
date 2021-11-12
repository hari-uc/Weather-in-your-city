const { response } = require("express");
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser")
 
const app = express();

app.use(bodyParser.urlencoded({extended: true}));





app.get("/", function(req, res){

    res.sendFile(__dirname + "/index.html");
    });
    


app.post("/",function(req,res){
    

    const query = req.body.cityName

    const degreechoice = "Metric"
    const apiKey = "9cce6b1d69a9e54e78877432d6a45d4a"

    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&units="+degreechoice+"&appid="+apiKey

    https.get(url, function(response){
        console.log(response.statusCode)

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const climateDescription = weatherData.weather[0].description
            const temp = weatherData.main.temp
            const icon = weatherData.weather[0].icon
            const imageURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
            
            res.write("<h1>the temperature in " + query + "  is "+ temp + " Celsius.</h1>")
            res.write(" the climate is " + climateDescription)
            res.write("<img src="+ imageURL +">");

            res.send()
        });
    });

});




app.listen(3000 , function(){
    console.log("server is running")
});


