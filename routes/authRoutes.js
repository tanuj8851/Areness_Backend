const express = require("express");
const { signup, login, logout } = require("../controllers/authController");
const { validateSignup } = require("../middlewares/validateInput");

const router = express.Router();

router.post("/signup", validateSignup, signup);
router.post("/login", login);
router.post("/logout", logout);

module.exports = router;
