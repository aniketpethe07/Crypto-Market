const express = require("express");
const router = express.Router();
const { apiFetch } = require("../controllers/apiController");

router.get("/home", apiFetch);

module.exports = router;
