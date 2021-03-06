//NPM Packages
const express = require("express");
const chalk = require("chalk");
const mongoose = require("mongoose");
const logger = require("morgan");
const exphbs = require("express-handlebars");
const app = express();

//Middleware
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//PORT and Routes
const PORT = process.env.PORT || 8080;
app.use(require("./routes/html-routes"));
app.use(require("./routes/api-routes"));

// Set Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//Listener
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/workout";
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
mongoose.connection
  .once("open", () => console.log(chalk.magentaBright("Connected to Mongoose")))
  .on("error", (error) => {
    console.log(chalk.red("Your Error: ", error));
  });
app.listen(PORT, function () {
  console.log(
    chalk.blue.bold("Access Granted || PORT: ") + chalk.yellow.bold(PORT)
  );
});
