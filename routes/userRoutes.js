const router = require("express").Router();
const {authenticateUser, authorizePermissions } = require("../middlewares/authentication");
const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} = require("../controllers/userController");


router.get("/", authenticateUser, authorizePermissions('admin'), getAllUsers);
// alternatively, 
// router.route("/").get(getAllUsers);

 
router.get("/showMe",authenticateUser, showCurrentUser); 
router.patch("/updateUser", authenticateUser,  updateUser);
router.patch("/updateUserPassword", authenticateUser, updateUserPassword);


router.get("/:id", authenticateUser, getSingleUser);


module.exports = router;
