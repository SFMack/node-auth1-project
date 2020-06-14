const router = require('express').Router();
const db = require("../data/dbConfig.js");
const restricted = require('../auth/restricted-middleware.js');

// READ
// read all users
router.get("/", restricted, (req, res) => {
    db("users")
      .then(usersData => {
        res.status(200).json(usersData);
      })
      .catch(err => {
        res.status(400).json({ message: "Could not retrieve users" });
      });
  });
  
  module.exports = router;