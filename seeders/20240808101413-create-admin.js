'use strict';
//seeders/20240808101413-create-admin.js
const bcrypt = require("bcrypt");
const { User } = require("../models");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     const hashedPassword = await bcrypt.hash("AdminPassword123!", 10);

     await User.create({
       username: "admin",
       email: "admin@example.com",
       password: hashedPassword,
       role: "admin",
     });
  },

  async down (queryInterface, Sequelize) {
       await User.destroy({ where: { email: "admin@example.com" } });

  }
};
