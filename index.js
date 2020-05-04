const express = require("express"); //CommonJS Module
const { v4: uuidv4 } = require("uuid");
const server = express();
server.use(express.json()); //teaches express how to read json
server.get("/", (req, res) => {
  res.json({ api: "up and running!" });
});
let users = [
  {
    id: 1,
    name: "array of users",
  },
];
//get /api/users returns an array of users
server.get("/api/users", function (req, res) {
  res.json(users);
});
//post request /api/users creates a user using the information sent inside the request body
server.post("/api/users", function (req, res) {
  const userInformation = req.body;
  users.push(userInformation);
  res.status(200).json(userInformation);
});
//get /api/users/:id returns the user object with the specified id
//delete /api/users/:id removes the user with the specified id and returns the deleted user
//patch /api/users/:id updates the user with the specified id using data form the request body. Returns the modified user.

//User Schema:
// {
//   id: "a_unique_id", // hint: use the shortid npm package to generate it
//   name: "Jane Doe", // String, required
//   bio: "Not Tarzan's Wife, another Jane",  // String, required
// }
server.listen(9000, () => console.log("/ API IS UP /"));
