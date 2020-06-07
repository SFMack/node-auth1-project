const express = require("express");
const db = require("../data/dbConfig.js");

const router = express.Router();

// CREATE
// register new user
router.get("/", (req, res) => {
  db("users")
    .then(usersData => {
      res.status(200).json(usersData);
    })
    .catch(err => {
      res.status(400).json({ message: "Could not retrieve users" });
    });
});

module.exports = router;
