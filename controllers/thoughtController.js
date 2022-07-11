const { User, Thought } = require("../models");

module.exports = {
  addThought(req, res) {
    Thought.create(req.body)
      .then((thoughtdata) => {
        return User.findOneAndUpdate(
          { _id: req.body.userid },
          { $push: { thoughts: thoughtdata._id } },
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res.status(404).json({
              message: "Thought created, but found no user with that ID",
            })
          : res.json("Thought created! 🎉")
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // Get all thoughts
  getAllThoughts(req, res) {
    Thought.find()
      .then((allthoughts) => res.json(allthoughts))
      .catch((err) => res.status(500).json(err));
  },
};
