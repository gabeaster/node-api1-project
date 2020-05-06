const express = require("express"); //CommonJS Module
const server = express();
const { v4: uuidv4 } = require("uuid");
server.use(express.json()); //teaches express how to read json
server.get("/", (req, res) => {
  res.json({ api: "up and running!" });
});
//User Schema:
// {
//   id: "a_unique_id", // hint: use the shortid npm package to generate it
//   name: "Jane Doe", // String, required
//   bio: "Not Tarzan's Wife, another Jane",  // String, required
// }
let users = [
  {
    id: uuidv4(),
    name: "Jane Doe",
    bio: "user1",
  },
  {
    id: uuidv4(),
    name: "Jane Moe",
    bio: "user2",
  },
  {
    id: uuidv4(),
    name: "Jane Toe",
    bio: "user3",
  },
  {
    id: uuidv4(),
    name: "Jane Soe",
    bio: "user4",
  },
  {
    id: uuidv4(),
    name: "Jane Goe",
    bio: "user5 ",
  },
];

//post request /api/users creates a user using the information sent inside the request body
server.post("/api/users", (req, res) => {
  const user = { id: uuidv4(), ...req.body };

  if (!user.name || !user.bio) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  } else if (!user) {
    res.status(500).json({
      errorMessage: "There was an error while saving the user to the database",
    });
  }
  users.push(user);
  res.status(201).json(user);
});

//GET /api/users returns an array of users
server.get("/api/users", (req, res) => {
  if (!users) {
    res
      .status(500)
      .json({ errorMessage: "The users information could not be retrieved" });
  }
  res.json(users);
});

//GET /api/users/:id returns the user object with the specified id
server.get("/api/users/:id", (req, res) => {
  const id = req.params.id;
  const checkID = users.filter((check) => check.id === id);
  if (checkID.length === 0) {
    res
      .status(404)
      .json({ errorMessage: "The user with the specifid ID does not exist" });
  } else if (!users) {
    res
      .status(500)
      .json({ errorMessage: "The users information could not be retrieved" });
  } else {
    myUser = users.filter((user) => user.id === id);
    res.status(200).json(myUser);
  }
});

//DELETE /api/users/:id removes the user with the specified id and returns the deleted user
server.delete("/api/users/:id", (req, res) => {
  const id = req.params.id;
  const checkID = users.filter((check) => check.id === id);
  if (checkID.length === 0) {
    res
      .status(404)
      .json({ errorMessage: "The user with the specifid ID does not exist" });
  } else if (!users) {
    res
      .status(500)
      .json({ errorMessage: "The users information could not be retrieved" });
  } else {
    users = users.filter((user) => user.id !== id);
    res.status(200).json(users);
  }
});

//PATCH	/api/users/:id	Updates the user with the specified id using data from the request body. Returns the modified user
server.patch("/api/users/:id", (req, res) => {
  const id = req.params.id;
  const checkID = users.filter((check) => check.id === id);
  const newUser = req.body;
  if (checkID.length === 0) {
    res
      .status(404)
      .json({ errorMessage: "The user with the specifid ID does not exist" });
  } else if (!users) {
    res
      .status(500)
      .json({ errorMessage: "The users information could not be retrieved" });
  } else if (!newUser.name || !newUser.bio) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  } else {
    users.forEach((user) => {
      if (user.id === id) {
        user.name = newUser.name;
        user.bio = newUser.bio;
      } else {
        return user;
      }
    });
    res.status(200).json(users);
  }
});

server.listen(9000, () => console.log("/ API IS UP /"));
