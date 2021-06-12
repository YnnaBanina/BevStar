const express = require("express");
const app = express();
const Drink = require("./models/drinks");
const drinkController = require("./controller/drinkConnect");

//testing the hbs
app.set("view engine", "hbs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ejs

// using the consts
app.use(drinkController);

// ======= TESTING THE HOME ROUTE (NOW WORKS ON CONTROLLER)
// app.get("/", (req, res) => {
//   res.send(`magic on home route via app`);
// });

// port
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`magic on port: ${port}`);
});
