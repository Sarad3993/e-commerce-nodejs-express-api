const router = require('express').Router();
const { register, login, logout } = require('../controllers/authController');


router.post('/register',register);
router.post('/login',login);
router.get('/logout',logout); // get is used for logout because we are not sending any data to the server we are just logging out so we don't need to use post request


module.exports = router;