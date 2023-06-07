const router = require("express").Router();
const {
  authenticateUser,
} = require("../middlewares/authentication");

const {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
} = require("../controllers/reviewController");



router.route('/').post(authenticateUser, createReview)
.get(getAllReviews);

router.route('/:id')
.get(getSingleReview)
.patch(authenticateUser, updateReview)
.delete(authenticateUser, deleteReview);


module.exports = router;