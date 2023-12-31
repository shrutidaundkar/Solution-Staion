const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 80;
const path = require("path");
const { default: mongoose } = require("mongoose");
const routes = require("./routes");
// Docker mongo connect---------------------------
//    mongodb://myuser:mypass@mongo:27017/solution-station-db
mongoose
  .connect("mongodb://mongo:27017/solution-station-db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    console.log("mongo connected");
  })
  .catch((err) => console.log(err));

// Mongo Cluster---------------------------
// const uri =
//   "mongodb+srv://shrutidaundkar:<MongoPassHere>@cluster0.adpyrrk.mongodb.net/solution-station-db?retryWrites=true&w=majority";
// connect = () => {
//   mongoose
//     .connect(uri)
//     .then((res) => console.log("Mongo connected"))
//     .catch((err) => console.log(err));
// };
// connect();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.use("/api", routes);
app.use("/uploads", express.static(path.join(__dirname, "/../uploads")));
app.use(express.static(path.join(__dirname, "/../frontend/build")));

app.get("*", (req, res) => {
  try {
    res.sendFile(path.join(`${__dirname}/../frontend/build/index.html`));
  } catch (e) {
    res.send("Welcome to Solution station");
  }
});

app.use(cors());

app.listen(PORT, () => {
  console.log(`Solution Station is listening on PORT No- ${PORT}`);
});
