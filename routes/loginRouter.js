const express = require("express");
const db = require("../data/dbConfig.js");
const Users = require("../users/users-model.js");

const router = express.Router();

// READ
// read all users
router.get("/", (req, res) => {
  db("users")
    .then(usersData => {
      res.status(200).json(usersData);
    })
    .catch(err => {
      res.status(400).json({ message: "Could not retrieve users" });
    });
});

// login user
router.post("/register", async (req, res) => {
  let user = req.body;

  try {
    const saved = await Users.add(user);
    res.status(201).json(saved);
  } catch (err) {
    console.log(err);
    res.status;
  }
});

module.exports = router;
