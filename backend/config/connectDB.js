const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./db'); 

const app = express();
const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  // Routes go here
  app.all('*', (req, res) => {
    res.json({"everything": "is awesome"});
  });

  app.listen(PORT, () => {
    console.log("listening for requests");
  });
});
