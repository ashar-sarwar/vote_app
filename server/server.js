const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const handlers = require("./handlers");
const routes = require('./routes');
const { mongoURI } = require('./config/keys');


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose
  .connect(mongoURI, { useNewUrlParser: true })
  .then(() => console.log("connected to MongoDB"))
  .catch(err => console.log(err));

app.use("/api/auth",routes.auth)
app.use("/api/poll",routes.poll)

console.log(":hello")
app.use(handlers.notFound);
app.use(handlers.errors);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Port running at ${port}`));
