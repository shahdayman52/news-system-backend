// routes/articleRoutes.js
const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const articleController = require("../controllers/articleController");
const auth = require("../middleware/auth");

router.post(
  "/articles",
  auth,
  [
    body("title")
      .notEmpty()
      .withMessage("Title is required")
      .isLength({ min: 3, max: 150 })
      .withMessage("Title must be between 3 and 150 characters"),
    body("content")
      .optional()
      .isLength({ max: 500 })
      .withMessage("Content cannot exceed 500 characters"),
    body("category").notEmpty().withMessage("Category is required"),
  ],
  articleController.createArticle
);

router.get("/articles/:id", articleController.getArticle);

router.put(
  "/articles/:id",
  auth,
  [
    body("title")
      .optional()
      .isLength({ min: 3, max: 150 })
      .withMessage("Title must be between 3 and 150 characters"),
    body("content")
      .optional()
      .isLength({ max: 500 })
      .withMessage("Content cannot exceed 500 characters"),
    body("category").optional().notEmpty().withMessage("Category is required"),
  ],
  articleController.updateArticle
);

router.delete("/articles/:id", auth, articleController.deleteArticle);


router.get("/articles", (req, res) => {
  console.log("GET /articles route hit");
  articleController.listArticles(req, res);
});

// router.get("/articles", articleController.listArticles);

module.exports = router;
