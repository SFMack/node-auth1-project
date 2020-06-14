const express = require("express");
const authRouter = require("../auth/auth-router.js");
const usersRouter = require('../users/users-router.js');
const server = express();
const session = require('express-session');
const cors = require('cors');

const sessionConfig = {
  name: 'macksession', // default sid
  secret: 'super secret', // good place for environment variables
  cookie: {
      maxAge: 1000 * 30, // 30 seconds
      secure: false, // true in production
      httpOnly: true, // always set to true. dont allow javascript access   
  },
  resave: false, // recreate a session when no changes have happened
  saveUninitialized: false, // GDPR laws against setting cookies automatically. true after user has opted in.
}

server.use(session(sessionConfig));
server.use(express.json());
server.use(cors());
server.use("/api/auth", authRouter);
server.use("/api/users", usersRouter);



server.get("/", (req, res) => {
  res.send("<h1>Server running</h1>");
});

module.exports = server;
