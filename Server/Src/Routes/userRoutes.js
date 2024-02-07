const express = require("express");
const { Register } = require("../Controllers/userControllers");
const router = express.Router();

router.post("/", Register);

module.exports = router;
