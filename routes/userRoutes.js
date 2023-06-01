const router = require("express").Router();
const {authenticateUser} = require("../middlewares/authentication");
const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} = require("../controllers/userController");


router.get("/", authenticateUser, getAllUsers);
// alternatively, 
// router.route("/").get(getAllUsers);

 
router.get("/showMe", showCurrentUser); 
router.patch("/updateUser", updateUser);
router.patch("/updateUserPassword", updateUserPassword);


router.get("/:id", authenticateUser, getSingleUser);


module.exports = router;
