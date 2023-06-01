const router = require("express").Router();
const {authenticateUser, authorizePermissions } = require("../middlewares/authentication");
const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} = require("../controllers/userController");


router.get("/", authenticateUser, authorizePermissions,getAllUsers);
// alternatively, 
// router.route("/").get(getAllUsers);

 
router.get("/showMe", showCurrentUser); 
router.patch("/updateUser", updateUser);
router.patch("/updateUserPassword", updateUserPassword);


router.get("/:id", authenticateUser,authorizePermissions,getSingleUser);


module.exports = router;
