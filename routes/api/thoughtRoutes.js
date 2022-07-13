const router = require("express").Router();
const {
  addThought,
  getAllThoughts,
  getSingleThought,
} = require("../../controllers/thoughtController");

//create new thought
// /api/thoughts/create
router.route("/create").post(addThought);

//gets all thoughts
router.route("/").get(getAllThoughts);

//- `GET` a single thought
router.route("/thought/:thoughtid").get(getSingleThought);

module.exports = router;
