import express from "express";
import { main } from "./db.js";

const app = express();

main();

app.get("/", (req, res) => {
  res.json({
    msg: "server running",
  });
});

app.listen(3000);
