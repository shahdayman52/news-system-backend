const express = require("express");
const { registerUser, loginUser } = require("../controllers/userControllers.js");
const router = express.Router();

router.post("/register", registerUser);

// Signin route
router.post("/login", loginUser);
router.get("/ex",()=>{console.log("test");})

module.exports = router;
