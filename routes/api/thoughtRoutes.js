const router = require("express").Router();
const { addThought } = require("../../controllers/thoughtController");

//create new thought
// /api/thoughts/create
router.route("/create").post(addThought);

module.exports = router;
