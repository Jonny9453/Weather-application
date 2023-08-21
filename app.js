const express= require("express");
const https= require("https");
const bodyParser=require("body-parser");
require('dotenv').config()


const app = express();
app.set('view engine', 'ejs') 

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");

   

       

       
    
});

app.post("/", function(req,res){
    console.log(req.body.cityName);
    console.log("Post request received");
    const query= req.body.cityName;
    const apiKey=process.env.SECRET_KEY;
    const unit="metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;
    https.get(url, function(response){
        console.log(response.statusCode);
        response.on("data", function(data){
            const weatherData=JSON.parse(data);
            const temp=weatherData.main.feels_like;
            const description=weatherData.weather[0].description;
            const icon= weatherData.weather[0].icon;
            const imageURL="https://openweathermap.org/img/wn/"+icon+"@2x.png";
            console.log(weatherData.main)
            console.log(temp);
            console.log(description);
            console.log(weatherData.main.gust)
            // res.render("<h1>The temperature in "+query+" is "+ temp+ "degrees Celcius.</h1>");
            res.render("weather",{city:query, temperature:temp, description:description,image:imageURL,mainData:weatherData.main,wind:weatherData.wind, other:weatherData})
            // res.write("<p>The weather is currently " + description+ "</p>");
            // res.write("<img src=" +imageURL+">");
            // res.send();
} )
})
})



app.listen(3000, function(){
    console.log("Server is running on port 3000.")
});