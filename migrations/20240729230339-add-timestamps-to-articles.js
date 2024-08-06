// migrations/XXXX-add-timestamps-to-articles.js
module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("Articles", "createdAt", {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      }),
      queryInterface.addColumn("Articles", "updatedAt", {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      }),
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn("Articles", "createdAt"),
      queryInterface.removeColumn("Articles", "updatedAt"),
    ]);
  },
};
