const mongoose = require("../db/connection");

const DrinkSchema = new mongoose.Schema({
  drinkName: String,
  toppings: [],
  inside: [],
  blended: String,
  size: String,
  creator: String,
  img: String,
});

const Drink = mongoose.model("Drink", DrinkSchema);

module.exports = Drink;
