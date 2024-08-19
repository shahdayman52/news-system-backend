//controllers/adminController
const{Article, User}= require('../models');

const getSubmittedArticles = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      sort = "createdAt",
      dir = "DESC",
    } = req.query;
  
    const articles = await Article.findAndCountAll({
      where: { status: "New" },
      order: [[sort, dir]],
      limit: parseInt(limit),
      offset: (page - 1) * limit,
      include: [
        {
          model: User,
          as: "author", 
          attributes: ["username"], 
        },
      ],
    });

    res.json({
      articles: articles.rows,
      pagination: {
        page: parseInt(page),
        total: articles.count,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};



const acceptArticle= async(req,res)=>{
    try{
      // console.log(`Accepting article with ID: ${req.params.id}`); 

      const article = await Article.findByPk(req.params.id);
      if (!article) {
        return res.status(404).json({ message: "Article not found" });
      }
      article.status = "Approved";
      await article.save();
      res.json({ message: "Article accepeted successfully" });
    }catch(error){
        res.status(500).json({message:'Internal Server Error'});
    }
};

const rejectArticle=async(req,res)=>{
    try{
        const article=await Article.findByPk(req.params.id);
        if(!article){
            return res.status(404).json({message:'Article not found'});
        }
        article.status='Rejected';
        await article.save();
        res.json({message:'Article rejected successfully'})
    }catch(error){
        res.status(500).json({message:'Internal server error'});
    }
};


module.exports={
    getSubmittedArticles, acceptArticle, rejectArticle
};
