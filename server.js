const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const app = express();

const apiKey = "48fd39ca8bd8ecaf843c2e460a6745d4";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", function (req, res) {
  res.render("index", { weather: null, error: null });
});

app.post("/", function (req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  
  axios.get(url)
    .then(response => {
      let weather = response.data;
      if (weather.main == undefined) {
        res.render("index", {
          weather: null,
          error: "City not found. Please try again.",
        });
      } else {
        let weatherText = `It's ${weather.main.temp} degrees with ${weather.weather[0].description} in ${weather.name}!`;
        res.render("index", { weather: weatherText, error: null });
      }
    })
    .catch(error => {
      res.render("index", { weather: null, error: "Error fetching weather data. Please try again." });
    });
});

app.listen(3000, function () {
  console.log("Weatherly app listening on port 3000!");
});
