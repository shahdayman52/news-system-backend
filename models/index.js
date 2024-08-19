"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
// const fs = require("fs");
// const path = require("path");
// const Sequelize = require("sequelize");
// // require("dotenv").config();

// const process = require("process");
// const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || "development";
// const config = require(__dirname + "/../config/config.json")[env];
// const db = {};

// let sequelize;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   // console.log(process.env.DB_NAME);
//   // console.log(process.env.DB_USER);
//   // console.log(process.env.DB_PASSWORD);
//   // console.log(config.database);
//   // console.log(config.username);
//   // console.log(config.password);
//   sequelize = new Sequelize(
//     config.database,
//     config.username,
//     config.password,
//     config
//   );
// }

// fs.readdirSync(__dirname)
//   .filter((file) => {
//     return (
//       file.indexOf(".") !== 0 &&
//       file !== basename &&
//       file.slice(-3) === ".js" &&
//       file.indexOf(".test.js") === -1
//     );
//   })
//   .forEach((file) => {
//     const model = require(path.join(__dirname, file))(
//       sequelize,
//       Sequelize.DataTypes
//     );
//     db[model.name] = model;
//   });

// Object.keys(db).forEach((modelName) => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// // module.exports = db;// "use strict";

// // const fs = require("fs");
// // const path = require("path");
// // const Sequelize = require("sequelize");
// // const process = require("process");

// // // Load environment variables from .env file
// // require("dotenv").config();

// // const basename = path.basename(__filename);
// // const env = process.env.NODE_ENV || "development";
// // const db = {};

// // let sequelize;
// // // let sequelize;
// // // if (config.use_env_variable) {
// // //   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// // // } else {
// // //   // console.log(process.env.DB_NAME);
// // //   // console.log(process.env.DB_USER);
// // //   // console.log(process.env.DB_PASSWORD);
// // //   // console.log(config.database);
// // //   // console.log(config.username);
// // //   // console.log(config.password);
// // //   sequelize = new Sequelize(
// // //     config.database,
// // //     config.username,
// // //     config.password,
// // //     config
// // //   );
// // // }

// // if (env === "development") {
// //   sequelize = new Sequelize(
// //     process.env.DB_NAME,
// //     process.env.DB_USER,
// //     process.env.DB_PASSWORD,
// //     {
// //       host: process.env.DB_HOST,
// //       dialect: "mysql",
// //     }
// //   );
// // } else {
// //   sequelize = new Sequelize(process.env[process.env.DATABASE_URL], {
// //     dialect: "mysql",
// //     protocol: "mysql",
// //     logging: true,
// //   });
// // }

// // // console.log(process.env.DB_NAME);
// // // console.log(process.env.DB_USER);
// // // console.log(process.env.DB_PASSWORD);

// // fs.readdirSync(__dirname)
// //   .filter((file) => {
// //     return (
// //       file.indexOf(".") !== 0 &&
// //       file !== basename &&
// //       file.slice(-3) === ".js" &&
// //       file.indexOf(".test.js") === -1
// //     );
// //   })
// //   .forEach((file) => {
// //     const model = require(path.join(__dirname, file))(
// //       sequelize,
// //       Sequelize.DataTypes
// //     );
// //     db[model.name] = model;
// //   });

// // Object.keys(db).forEach((modelName) => {
// //   if (db[modelName].associate) {
// //     db[modelName].associate(db);
// //   }
// // });

// // db.sequelize = sequelize;
// // db.Sequelize = Sequelize;

// // module.exports = db;// "use strict";

// // // 'use strict';

// // // const fs = require('fs');
// // // const path = require('path');
// // // const Sequelize = require('sequelize');
// // // const process = require('process');
// // // const basename = path.basename(__filename);
// // // const env = process.env.NODE_ENV || 'development';
// // // const config = require(__dirname + '/../config/config.json')[env];
// // // const db = {};

// // // let sequelize;
// // // if (config.use_env_variable) {
// // //   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// // // } else {
// // //   sequelize = new Sequelize(config.database, config.username, config.password, config);
// // // }

// // // fs
// // //   .readdirSync(__dirname)
// // //   .filter(file => {
// // //     return (
// // //       file.indexOf('.') !== 0 &&
// // //       file !== basename &&
// // //       file.slice(-3) === '.js' &&
// // //       file.indexOf('.test.js') === -1
// // //     );
// // //   })
// // //   .forEach(file => {
// // //     const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
// // //     db[model.name] = model;
// // //   });

// // // Object.keys(db).forEach(modelName => {
// // //   if (db[modelName].associate) {
// // //     db[modelName].associate(db);
// // //   }
// // // });

// // // db.sequelize = sequelize;
// // // db.Sequelize = Sequelize;

// // // module.exports = db;
