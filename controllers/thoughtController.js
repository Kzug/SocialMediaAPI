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
  //get a thought by ID
  getSingleThought(req, res) {
    //note to self: the thoughtId needs to be the same spelled and capitalization as the thoughtID in the getSingleThought function
    Thought.findOne({ _id: req.params.thoughtId })
      .select("-__v")
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
};
