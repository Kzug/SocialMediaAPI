const router = require("express").Router();
const {
  getUsers,
  createUser,
  getSingleUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require("../../controllers/userController");

// /api/users/
//creates new user
router.route("/create").get(getUsers).post(createUser);

//gets all users
router.route("/").get(getUsers);

//- `GET` a single user by its `_id` and populated thought and friend data
router.route("/:userid").get(getSingleUser);

//update a user
router.route("/update/:userid").get(getSingleUser).put(updateUser);

//delete a user
router.route("/delete/:userid").get(getSingleUser).delete(deleteUser);

//add a friend
router.route("/:userid/friends/:friendid").get(getSingleUser).post(addFriend);
module.exports = router;

//delete a friend
router.route("/:userid/friends/:friendid").get(getSingleUser).put(deleteFriend);
module.exports = router;
