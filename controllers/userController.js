const { User } = require("../models");

// Aggregate function for getting the overall grade using $avg
const userthought = async (userId) =>
  User.aggregate([
    // only include the given student by using $match
    { $match: { _id: ObjectId(userId) } },
    {
      $unwind: "$thoughts",
    },
  ]);

module.exports = {
  // Get all users
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  //Get a single user with thoughts attached
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userid })
      //.populate({ path: "thoughts", select: "-__v" })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID exists" })
          : res.json({ user, userthought: userthought(req.params.userid) })
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
};
