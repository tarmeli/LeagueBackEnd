import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
//import dbConfig from "./config/config";
import mongoose from "mongoose";
import UserRoutes from "./routes/user.routes";
import MatchRoutes from "./routes/match.routes";

let app = express();
const port = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(cors());

mongoose.Promise = global.Promise;

mongoose.connect(process.env.DBURL);

mongoose.connection.on("error", () => {
  console.log("Couldn't connect to the database.");
  process.exit();
});

mongoose.connection.once("open", () => {
  console.log("Connected.");
});

app.get("/", (req, res) => {
  res.json({ message: "this is the first entry" });
});

UserRoutes(app);
MatchRoutes(app);

app.listen(port, () => {
  console.log("Listening on port " + port);
});
