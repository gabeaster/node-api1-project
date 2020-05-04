const express = require("express"); //CommonJS Module
const db = require("./data/db");
const server = express();
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
    id: 1,
    name: "array of users",
  },
];

//post request /api/users creates a user using the information sent inside the request body
server.post("/api/users", function (req, res) {
  const { name, bio } = req.body;
  if (!name || !bio) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  } else {
    const newUser = { id: Date.now(), name, bio };
    db.insert(newUser)
      .then((addedUser) => {
        res.status(201).json({ newUser });
      })
      .catch((err) =>
        res.status(500).json({
          errorMessage:
            "There was an error while saving the user to the database. ",
        })
      );
  }
});

//GET /api/users returns an array of users
server.get("/api/users", function (req, res) {
  db.find()
    .then((users) => {
      res.status(200).json({ users });
    })
    .catch((err) => {
      res.status(500).json({
        errorMessage: "The users information could not be retrieved.",
      });
    });
});

//GET /api/users/:id returns the user object with the specified id
server.get("/api/users/:id", function (req, res) {
  const id = req.params.id;
  db.findById(id)
    .then((user) => {
      !user
        ? res
            .status(404)
            .json({ message: "The user with the specified ID does not exist." })
        : res.status(200).json(user);
    })
    .catch((err) =>
      res
        .status(500)
        .json({ errorMessage: "The user information could not be retrieved." })
    );
});

//DELETE /api/users/:id removes the user with the specified id and returns the deleted user
server.delete("/api/users/:id", function (req, res) {
  const id = req.params.id;
  db.remove(id)
    .then((deleted) => {
      deleted
        ? res.status(204).end()
        : res.status(404).json({
            errorMessage: "The user with the specified ID does not exist.",
          });
    })
    .catch((err) =>
      res.status(500).json({ errorMessage: "The user could not be removed" })
    );
});

//PATCH	/api/users/:id	Updates the user with the specified id using data from the request body. Returns the modified user
server.patch("api/users/:id", function (req, res) {
  const id = req.params.id;
  const user = req.body;
  if (!user.name || !user.bio) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  } else {
    db.update(id, user)
      .then((updated) => {
        !updated
          ? res.status(404).json({
              errorMessage: "The user with the specified ID does not exist.",
            })
          : res.status(200).json(user);
      })
      .catch((err) =>
        res
          .status(500)
          .json({ errorMessage: "The user information could not be modified." })
      );
  }
});

server.listen(9000, () => console.log("/ API IS UP /"));
