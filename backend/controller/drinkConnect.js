const express = require("express");
const router = express.Router();

const Drink = require("../models/drinks");

// HOME ROUTE
router.get("/", (req, res, next) => {
  res.send(`welcome to the home route`);
});

// SHOWING ALL OF THE DRINKS
router.get("/drinks", (req, res, next) => {
  Drink.find({})
    .then((drinks) => console.log(res.json(drinks)))
    .catch(next);
});

//  NEW DRINK ROUTE
// =-=-=-=-= works just need to fix so that it works for the drink aspect and not the todos list
router.get("/drinks/new", (req, res, next) => {
  res.render("../../views/new.hbs");
  // res.send(`on the new route`);
});

// CREATING A NEW DRINK ROUTE
// =-=-=-=-= works just need to fix the info so the user can input information for the drinks and not a title from the todos
router.post("/drinks", (req, res, next) => {
  console.log(`the create route for data: ${res.body}`);
  console.log(req.body);
  Drink.create(req.body)
    .then(() => {
      Drink.find({}).then((drinks) => res.json(drinks));
    })
    .catch(next);
});

// SHOW SINGLE DRINK ROUTE
//  =-=-=-=-=- need to make a route for the show change res.json to res.render
router.get("/drinks/:id", (req, res, next) => {
  //   res.send(`Single Drink Route`); WORKS
  const id = req.params.id;
  Drink.findById(id)
    .then((drink) => res.json(drink))
    .catch(next);
});

// GETTING TO THE EDIT A DRINK ROUTE
// =-=-=-=- need to make a route for the edit route
router.get("/drinks/:id/edit", (req, res, next) => {
  const routeId = req.params.id;
  Drink.findById(routeId).then((drink) => res.json(drink));
});

// ACTUALLY UPDATING THE DRINK
// =-=-=-=-=-= make a hbs for showwww and add here
router.put("/drinks/:id", (req, res, next) => {
  const id = req.params.id;
  Drink.findOneAndUpdate(
    { _id: id },
    {
      drinkName: req.body.drinkName,
      toppings: [req.body.toppings],
      inside: [req.body.inside],
      blended: req.body.blended,
      size: req.body.size,
      creator: req.body.creator,
      img: req.body.img,
    },
    { new: true }
  ).then((drink) => {
    res.json(drink);
  });
  /*     .then((drink) => {
        res.RENDER 
    }) */
});

// DELETE ROUTE
router.delete("/drinks/:id", (req, res, next) => {
  const id = req.params.id;
  Drink.findOneAndDelete({ _id: id })
    .then(() => {
      Drink.find({}).then((drinks) => res.json(drinks));
    })
    .catch(next);
});
// RES.REDIRECT('/DRINKS)

module.exports = router;
