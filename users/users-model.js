const db = require("../data/dbConfig.js");

module.exports = {
  add,
  findBy
};

async function add(user) {
  const [id] = await db("users").insert(user, "id");
}

function findBy(username) {
  return db('users').where({ username }).orderBy("id");  
}