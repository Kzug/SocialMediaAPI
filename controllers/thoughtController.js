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
    //note to self: the thoughtId directly below needs to be the same spelling and capitalization as the thoughtId in the route to get a single thoguht by id
    Thought.findOne({ _id: req.params.thoughtId })
      .select("-__v")
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  //update a thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with this id!" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  //delete a thought
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No such thought exists" })
          : res.json({ message: "Thought successfully deleted!" })
      )

      .catch((err) => res.status(500).json(err));
  },
};
