const express = require("express");
const { registerUser, loginUser , getUser } = require("../controllers/userControllers.js");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/users/:id/username", getUser);

// router.get("/ex",()=>{console.log("test");})

module.exports = router;
