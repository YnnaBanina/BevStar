const express = require("express");
const router = express.Router();
const Drink = require("../models/drinks");
const multer = require("multer");
const imgLoader = require("../models/img");

let upload = multer({
  dest: "drinks/",
  storage: multer.memoryStorage(),
});

// const openInfo = document.querySelector("#open");
// const modal = document.querySelector("#modal");
// const closeInfo = document.querySelector("#close");

// const open = () => {
//   modal.style.display = "block";
// };
// openInfo.addEventListener("click", open);
// const close = () => {
//   modal.style.display = "none";
// };
// closeInfo.addEventListener("click", close);

// HOME ROUTE
router.get("/", (req, res, next) => {
  // res.render("layout.hbs");
  res.render("../public/views/home.hbs", { foo: "bar" });
});

// SHOWING ALL OF THE DRINKS
router.get("/drinks", (req, res, next) => {
  const results = Drink.find({});
  results
    .then((drs) => {
      console.log(drs);
      res.render("../public/views/index.hbs", { drinks: drs });
    })
    .catch(next);
});
//  NEW DRINK ROUTE
// =-=-=-=-= works just need to fix so that it works for the drink aspect and not the todos list
router.get("/drinks/new", (req, res, next) => {
  res.render("../public/views/new.hbs");
  // res.send(`on the new route`);
});

// CREATING A NEW DRINK ROUTE
// =-=-=-=-= works just need to fix the info so the user can input information for the drinks and not a title from the todos
router.post("/drinks", upload.single("img"), (req, res, next) => {
  console.log(`the create route for data: ${res.body}`);
  console.log(req.body);
  Drink.create({
    drinkName: req.body.drinkName,
    toppings: req.body.toppings,
    inside: req.body.inside,
    blended: req.body.blended,
    size: req.body.size,
    creator: req.body.creator,
    img: {
      data: req.file.buffer ? req.file.buffer : " ",
      contentType: req.file.mimetype,
    },
  })
    .then((drinks) => {
      console.log(drinks);
      res.redirect("/drinks");
    })
    .catch(next);
});

// additional info for the uploading part
router.get("/drinks/:id/img", async (req, res, next) => {
  try {
    const drink = await Drink.findById(req.params.id).populate("img");
    res.set("Content-Type", drink.img.contentType);
    res.send(drink.img.data);
  } catch (err) {
    next(err);
  }
});

// SHOW SINGLE DRINK ROUTE
//  =-=-=-=-=- need to make a route for the show change res.json to res.render
router.get("/drinks/:id", (req, res, next) => {
  //   res.send(`Single Drink Route`); WORKS
  const id = req.params.id;
  Drink.findById(id)
    .then((drink) => res.render("../public/views/show.hbs", drink))
    .catch(next);
});

// GETTING TO THE EDIT A DRINK ROUTE
// =-=-=-=- need to make a route for the edit route
router.get("/drinks/:id/edit", upload.single("img"), (req, res, next) => {
  const routeId = req.params.id;
  Drink.findById(routeId).then((drink) =>
    res.render("../public/views/edit.hbs", drink)
  );
});

// ACTUALLY UPDATING THE DRINK
// =-=-=-=-=-= make a hbs for showwww and add here
router.put("/drinks/:id", (req, res, next) => {
  const id = req.params.id;
  Drink.findOneAndUpdate({ _id: id }, req.body, { new: true })
    .then((drink) => {
      // res.send(drink);
      res.render("../public/views/show.hbs", drink);
    })
    .catch((next) => {
      console.log(next);
      res.send(`didnt work`);
    });
});

// update route for the image!
router.get("/drinks/:id/edit/image", upload.single("img"), (req, res, next) => {
  const id = req.params.id;
  Drink.findById(id)
    .populate("drink")
    .then((drinks) => {
      console.log(drinks);
      res.render("../public/views/update.hbs", { drinks });
    });
});

router.put("/drinks/:id/image", upload.single("img"), (req, res, next) => {
  const id = req.params.id;
  Drink.findOneAndUpdate(
    { _id: id },
    {
      img: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
    },
    { new: true }
  )
    .then((drink) => {
      res.render("../public/views/show.hbs", {
        drink: {
          drinkName: drink.drinkName,
          toppings: drink.toppings,
          inside: drink.inside,
          blended: drink.blended,
          size: drink.size,
          creator: drink.creator,
          img: drink.img.data,
          _id: drink._id,
        },
      });
    })
    .then(location.reload())
    .catch(err);
});

// DELETE ROUTE
router.delete("/drinks/:id", (req, res, next) => {
  const id = req.params.id;
  Drink.findOneAndDelete({ _id: id })
    .then((result) => {
      res.redirect("/drinks");
    })
    .catch(next);
});
// RES.REDIRECT('/DRINKS)

module.exports = router;
