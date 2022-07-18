const router = require("express").Router();
const {
  addThought,
  getAllThoughts,
  getSingleThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,
} = require("../../controllers/thoughtController");

//create new thought
// /api/thoughts/create
router.route("/create").post(addThought);

//gets all thoughts
router.route("/").get(getAllThoughts);

//- `GET` a single thought
router.route("/thought/:thoughtId").get(getSingleThought);

//update a thought
router.route("/update/:thoughtId").get(getSingleThought).put(updateThought);

//delete a thought
router.route("/delete/:thoughtId").get(getSingleThought).delete(deleteThought);

//add a reaction
router.route("/:thoughtId/reactions").post(addReaction);

router.route("/:thoughtId/reactions/:reactionid").delete(deleteReaction);



module.exports = router;
