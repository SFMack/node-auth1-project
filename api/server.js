const express = require("express");
const loginRouter = require("../routes/loginRouter.js");
const registerRouter = require("../routes/registerRouter.js");
const server = express();

server.use(express());
server.use("/api/users/login", loginRouter);
server.use("/api/users/register", registerRouter);
server.use(express.json());

server.get("/", (req, res) => {
  res.send("Server running");
});

module.exports = server;
