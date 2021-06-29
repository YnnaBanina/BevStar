const mongoose = require("../db/connection");

const DrinkSchema = new mongoose.Schema({
  drinkName: String,
  toppings: [String],
  inside: [String],
  blended: String,
  size: String,
  creator: String,
  img: {
    data: Buffer,
    contentType: String,
  },
});

const Drink = mongoose.model("Drink", DrinkSchema);

module.exports = Drink;
