const router = require("express").Router();
const {
  authenticateUser,
  authorizePermissions,
} = require("../middlewares/authentication");


const { createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    uploadImage } = require("../controllers/productController");


router.post("/", authenticateUser, authorizePermissions("admin"), createProduct);

router.get("/", getAllProducts);

router.get("/:id",getSingleProduct);

router.patch("/:id", authenticateUser, authorizePermissions("admin"), updateProduct);

router.delete("/:id", authenticateUser, authorizePermissions("admin"), deleteProduct);

router.post("/uploadImage", authenticateUser, authorizePermissions("admin"), uploadImage);


module.exports = router;
