const mongoose = require("mongoose");

// const mongoURI = "mongodb://localhost/bevStar"
// const mongoURI =
//   "mongodb+srv://ysalzw:74SuAe051W876zGl@cluster0.dxjtf.mongodb.net/deployProject2?retryWrites=true&w=majority";

const mongoURI =
  process.env.NODE_ENV === "production"
    ? process.env.DB_URL
    : "mongodb://localhost/bevStar";

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((instance) =>
    console.log(`Connected to db: ${instance.connections[0].name}`)
  )
  .catch((err) => console.log(`Connection to db failed due to: ${err}`));

module.exports = mongoose;
