const path = require('path');
const express = require("express");
const hbs = require("hbs");
const geocode = require('./Utils/geocode')
const forecast = require('./Utils/forecast');

const app = express();
const port = process.env.PORT || 3000

const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// app.set('views', path.join(__dirname, '../views'));
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Yatharth Mishra",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Yatharth Mishra",
  });
});

app.get("/help", (Req, res) => {
  res.render("help", {
    title: "Help Section",
    name: "Yatharth Mishra",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Address was not provided!!",
    });
  }

  geocode(req.query.address, (error, { longitude, latitude, location} = {}) => {
    if(error) {
      return res.send({ error })
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if(error) {
        return res.send({error})
      }

      res.send({
        address: req.query.address,
        location,
        forecast: forecastData
      })
    })
  })

});

app.get("/help/*", (req, res) => {
  res.render("error", {
    title: "Error 404",
    name: "Yatharth Mishra",
    errMsg: "Help Article not found!!",
  });
});

app.get("*", (req, res) => {
  res.render("error", {
    title: "Error 404",
    name: "Yatharth Mishra",
    errMsg: "Page not Found!!!",
  });
});

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}!!`);
});
