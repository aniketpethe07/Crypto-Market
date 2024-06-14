const express = require("express");
const { registerUser, loginUser, homePageApi, infoPageApi } = require("../controllers/userController");
const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/home').get(homePageApi);
router.route('/info').get(infoPageApi);
router.route('/cart').get(infoPageApi);

module.exports = router;
