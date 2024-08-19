//routes/adminRoutes
const express= require('express');
const router=express.Router();
const authMiddleware = require("../middleware/auth");
const checkAdmin=require('../middleware/checkAdmin');
const adminController=require('../controllers/adminController');

router.use(authMiddleware);
router.get("/admin/submitted", checkAdmin, adminController.getSubmittedArticles);
router.post("/articles/accept/:id",checkAdmin,adminController.acceptArticle);
router.post("/articles/reject/:id", checkAdmin,adminController.rejectArticle);

module.exports= router;