const path = require("path");
const express = require("express");
const hbs = require("hbs");
//importing utils
const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");
const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static public directory to serve
app.use(express.static(publicDirectoryPath));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Yash",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Page",
    name: "Yash",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    name: "Yash",
    helpText: "This is some useful text",
  });
});

app.get('/weather', (req, res) => {
  const address = req.query.address;
  if (!address) {
    return res.send({
      error: "Provide an address",
    });
  }
  geocode(address, (error, { lat, long, location } = {}) => {
    if (error) {
      return res.send({error});
    }
    forecast(long, lat, (error, forecastData) => {
      if (error) {
        return res.send({error});
      }
      const currentDate = new Date();
      res.send({
        location: location,
        forecast: forecastData,
        date: currentDate.toISOString(),
      });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Yash",
    errorMessage: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Yash",
    errorMessage: "Page not found",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000.");
  console.log(__dirname);
  console.log(publicDirectoryPath);
});
