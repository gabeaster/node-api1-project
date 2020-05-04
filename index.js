const express = require("express"); //CommonJS Module
const server = express();

server.get("/", (req, res) => {
  res.json({ api: "up and running!" });
});

//get /api/users returns an array of users
server.get("/api/users", function (req, res) {
  const users = [
    {
      id: 1,
      name: "array of users",
    },
  ];
  res.json(users);
});
//post request /api/users creates a user using the information sent inside the request body
server.post("/api/users", function (req, res) {
  const userInformation = req.body;
  //
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
