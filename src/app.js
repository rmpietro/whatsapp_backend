import express from "express";

//Create Express App
const app = express();

app.get("/", (req, res) => {
  res.send("Hello from server!");
});

export default app;
