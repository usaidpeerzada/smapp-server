const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
require("dotenv").config();

const app = express();
app.use(cors());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

// parse requests of content-type - application/json -
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "smappcare-session",
    secret: process.env.COOKIE_SECRET, // should use as secret environment variable
    httpOnly: true,
  })
);

const db = require("./models");
db.mongoose
  .connect(process.env.MONGODB_ATLAS_URL)
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

app.get("/", (req, res) => {
  res.json({ message: "Welcome to smappcare application." });
});

require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
