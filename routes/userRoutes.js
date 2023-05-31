const router = require("express").Router();
const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} = require("../controllers/userController");


router.get("/", getAllUsers);
// alternatively, 
// router.route("/").get(getAllUsers);


router.get("/showMe", showCurrentUser); 
router.post("/updateUser", updateUser);
router.post("/updateUserPassword", updateUserPassword);

router.get("/:id", getSingleUser);


module.exports = router;
