const express = require("express");
const authRouter = require("../auth/authRouter.js");
const server = express();

server.use(express());
server.use(express.json());
server.use("/api/users", authRouter);


server.get("/", (req, res) => {
  res.send("<h1>Server running</h1>");
});

module.exports = server;
