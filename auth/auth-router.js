const express = require("express");
const bcrypt = require('bcryptjs');
const Users = require("../users/users-model.js");

const router = express.Router();

// CREATE
// register user
router.post("/register", async (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 14);
  user.password = hash;

  try {
    const saved = await Users.add(user);
    res.status(201).json({ message: `User ${user.username} created`});
  } catch (error) {
    console.log(error);
    res.status(404).json(error);
  }
});

router.post("/login", async (req, res) => {
  let { username, password } = req.body;

  try {
    const foundUser = await Users.findBy({ username }).first();
    if(foundUser && bcrypt.compareSync(password, foundUser.password)) {
      // right before we send the response. set our cookie
      req.session.user = foundUser;
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
