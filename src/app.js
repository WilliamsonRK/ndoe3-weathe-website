const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

// console.log(__dirname);
// console.log(path.join(__dirname, "../public"));

const app = express();

//define path for Express config
const publicDir = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../template/views");
const partialsPath = path.join(__dirname, "../template/partials");

//setup handlebar engine and views location
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);

//setup static dir to serve
app.use(express.static(publicDir));

// app.get("", (req, res) => {
//   res.render("index", {
//     title: "Weather App",
//     name: "Inaotomba",
//   });
// });
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Inaotomba",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "We are providing help to you",
    title: "Help",
    name: "inaotomba",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You have to provide address term",
    });
  } else {
    geocode(
      req.query.address,
      (error, { latitude, longitude, location } = {}) => {
        if (error) {
          // return console.log(error);
          return res.send({ error: error });
        }

        forecast(latitude, longitude, (error, forecastData) => {
          if (error) {
            // return console.log(error);
            return res.send({ error: error });
          }

          // console.log(location);
          // console.log(forecastData);
          res.send({
            location: location,
            forecastData: forecastData,
            address: req.query.address,
          });
        });
      }
    );
  }

  // res.send({
  //   forecast: "It is raining",
  //   location: "Thoubal",
  //   address: req.query.address,
  // });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide search term",
    });
  }

  //after this the code doesnot run

  // console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "inaotomba",
    errorMessage: "Help article not found",
  });
});
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "inaotomba",
    errorMessage: "Page not found",
  });
});

app.listen(3000, () => {
  console.log("Server is up");
});
