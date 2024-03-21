const express = require("express");
const router = express.Router();
const { homePageApi } = require("../controllers/apiController");

router.get("/home", homePageApi);

module.exports = router;
