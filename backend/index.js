const express = require("express");
const app = express();
// const hbs = require("hbs");
const methodOverride = require("method-override");
const Drink = require("./models/drinks");
const drinkController = require("./controller/drinkConnect");
// const path = require("path");

// using the consts
app.set("view engine", "hbs");
// app.set("views", path.join(__dirname, "views"));
// app.use(express.static("public"));
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(drinkController);

// ======= TESTING THE HOME ROUTE (NOW WORKS ON CONTROLLER)
// app.get("/", (req, res) => {
//   res.render("layout");
// });

// port
// const port = process.env.PORT || 4000;
// app.listen(port, () => {
//   console.log(`magic on port: ${port}`);
// });

app.set("port", process.env.PORT || 4000);

app.listen(app.get("port"), () => {
  console.log(`✅ magic on: ${app.get("port")} 🌟`);
});
