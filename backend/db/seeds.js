const Drink = require("../models/drinks");

const seedData = require("./seeds.json");

Drink.deleteMany({})
  .then(() => {
    return Drink.insertMany(seedData);
  })
  .then(console.log)
  .catch(console.log)
  .finally(() => {
    process.exit();
  });
