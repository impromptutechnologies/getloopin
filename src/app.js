const path = require("path");
var bodyParser = require("body-parser");
const express = require("express");
const hbs = require("hbs");


const session = require("cookie-session");
var flash = require("connect-flash");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(flash());

app.use(
  session({
    secret: "secretkey",
    resave: false,
    saveUninitialized: false,
  })
);


app.get("/info", (req, res) => {
  res.render("help", {
    helpText: "This is some helpful text.",
    title: "Info",
  });
});

app.get("/", (req, res) => {
  res.render("landing", {
  });
});

app.get("/host", (req, res) => {
  res.render("host", {
  });
});

app.get("/attend", (req, res) => {
  res.render("attend", {
  });
});

app.get("/rent", (req, res) => {
  res.render("rent", {
  });
});

app.get("/join", (req, res) => {
  res.render("hire", {
  });
});


app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Page not found.",
  });
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});






















/*app.get("/testee", async (req, res) => {
  const count = await Bet.count({});
  const limit = Math.floor(count * 0.6);
  await Bet.find({})
    .select("totalScore")
    .sort({ totalScore: 1 })
    .limit(limit)
    .exec(async (err, docs) => {
      const totalScores = docs.map((doc) => doc.totalScore);
      const deleted = await Bet.deleteMany({
        totalScore: { $in: totalScores },
      });
    });
  res.redirect("/account");
});*/
