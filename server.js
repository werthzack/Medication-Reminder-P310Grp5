const express = require("express");
const app = express();
app.listen(3000);
app.get("/", (req, res) => {
  console.log("You have a request.");
  res.send("Medbay");
});
