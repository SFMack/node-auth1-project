const express = require("express");
const db = require("../data/dbConfig.js");
const bcrypt = require('bcryptjs');
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

// register user
router.post("/register", async (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 14);
  user.password = hash;

  try {
    const saved = await Users.add(user);
    res.status(201).json(saved);
  } catch (error) {
    console.log(error);
    res.status(404).json(error);
  }
});

router.post("/login", async (req, res) => {
  let { username, password } = req.body;

  try {
    const foundUser = await Users.findBy({ username }).first()
    if(foundUser && bcrypt.compareSync(password, foundUser.password)) {
      res.status(200).json({ message: `Welcome, ${foundUser.username}!` })
    } else {
      res.status(401).json({ message: 'Invalid credentials'})
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
})

module.exports = router;
