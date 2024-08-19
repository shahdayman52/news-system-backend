// controllers/articleController.js
const { Article } = require("../models");
const { validationResult } = require("express-validator");
const { Op } = require("sequelize");


exports.createArticle = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const article = await Article.create({
      title: req.body.title,
      content: req.body.content,
      category: req.body.category,
      userId: req.user.id,
    });
    res.status(201).json({ message: "Article created successfully", article });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.getArticle = async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.id);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.status(200).json({ article });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.updateArticle = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const article = await Article.findByPk(req.params.id);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    await article.update({
      title: req.body.title,
      content: req.body.content,
      category: req.body.category,
    });

    res.status(200).json({ message: "Article updated successfully", article });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.deleteArticle = async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.id);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    await article.destroy();
    res.status(200).json({ message: "Article deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};




exports.listArticles = async (req, res) => {
  const { page = 1, sort = "createdAt", dir = "desc", search = "" } = req.query;
  const limit = 3; // Set the limit to 3 articles per page
  const offset = (page - 1) * limit; //dah bykhali el articles shown in prev page matt3adsh

  try { // findand count hakhod menha 3adad elarticles w array of rows el heya articles
    const { count, rows: articles } = await Article.findAndCountAll({
      where: {
        title: {
          [Op.like]: `%${search}%`,
        },
      },
      order: [[sort, dir]],
      limit,
      offset,
    });

    res.status(200).json({
      articles,
      pagination: {
        page: parseInt(page),
        total: count,
      },
    });
    console.log("Query Parameters:", req.query);

  } catch (error) {
    console.error("Error in listArticles:", error); // Log the error to the console
    res.status(500).json({ message: "Server error", error: error.message || error });
  }
};

