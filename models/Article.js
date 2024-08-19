// models/article.js
module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define(
    "Article",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status:{
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue:'New'
      }
      ,
    },
    {
      timestamps: true, // This will add `createdAt` and `updatedAt` fields
    }
  );

  Article.associate = function (models) {
    Article.belongsTo(models.User, { foreignKey: "userId", as: "author" });
  };
  return Article;
};
