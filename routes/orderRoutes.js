const router = require("express").Router();
const {
  authenticateUser,
  authorizePermissions,
} = require("../middlewares/authentication");

const {
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
  createOrder,
  updateOrder,
} = require('../controllers/orderController');


router.route('/')
    .post(authenticateUser, createOrder)
    .get(authenticateUser, authorizePermissions("admin"), getAllOrders);

router.route('/showAllMyOrders').get(authenticateUser, getCurrentUserOrders);

router.route('/:id')
    .get(authenticateUser, getSingleOrder)
    .patch(authenticateUser, updateOrder);



module.exports = router;

    





