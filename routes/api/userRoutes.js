const router = require("express").Router();
const {
  getUsers,
  createUser,
  getSingleUser,
} = require("../../controllers/userController");

// /api/users/
//creates new user
router.route("/create").get(getUsers).post(createUser);

//gets all users
router.route("/").get(getUsers);

//- `GET` a single user by its `_id` and populated thought and friend data
router.route("/:userId").get(getSingleUser);

module.exports = router;
