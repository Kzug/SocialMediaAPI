const router = require("express").Router();
const {
  addThought,
  getAllThoughts,
} = require("../../controllers/thoughtController");

//create new thought
// /api/thoughts/create
router.route("/create").post(addThought);

//gets all thoughts
router.route("/").get(getAllThoughts);

module.exports = router;
