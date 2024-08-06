// middleware/auth.js
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const jwtSecretKey = "secret_key@";
module.exports = async (req, res, next) => {
  const authHeader = req.header("Authorization");
  console.log("Raw Authorization Header:", authHeader);

  if (!authHeader) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  const token = authHeader.split(" ")[1]; // Remove 'Bearer' prefix
  console.log("Extracted Token:", token);

  if (!token) {
    return res
      .status(401)
      .json({ message: "Token missing, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, jwtSecretKey);
    console.log("Decoded Token:", decoded);

    req.user = await User.findByPk(decoded.id);
    if (!req.user) {
      return res
        .status(401)
        .json({ message: "User not found, authorization denied" });
    }
    next(); //bt-pass control to the next middleware or route handler.
  } catch (error) {
    console.log("Token Verification Error:", error.message);
    res.status(401).json({ message: "Token is not valid" });
  }
};

// middleware/auth.js
// const jwt = require("jsonwebtoken");
// const { User } = require("../models");
// const { jwtSecretKey}=require("../controllers/userControllers");

// module.exports = async (req, res, next) => {
//  const authHeader = req.headers["Authorization"];
//  const token = authHeader && authHeader.split(" ")[1];

//   if (!token) {
//     return res.status(401).json({ message: "No token, authorization denied" });
//   }

//   try {
//     const decoded = jwt.verify(token, jwtSecretKey);
//     req.user = await User.findByPk(decoded.id);
//     if (!req.user) {
//       return res
//         .status(401)
//         .json({ message: "User not found, authorization denied" });
//     }
//     next();
//   } catch (error) {
//     res.status(401).json({ message: "Token is not valid" });
//   }
// };

//user9
//user9@gmail.com
//P@ss1239_
// {
//     "email":"user9@gmail.com",
//     "password":"P@ss1239_"
// }


 ///////// try  post create article b link http://localhost:3002/api/articles
//{
//     "title": "My First Article",
//     "content": "This is the content of the article.",
//     "category": "Technology",
//     "userId": 1
// }


 ///////// try  to get  articleby id b link http://localhost:3002/api/articles/:id"



  ///////// try  to update  article by id b link http://localhost:3002/api/articles/:id"


  //////// delete by id

  /////////list http://localhost:3002/api/articles?page=2&sort=title&dir=desc&search=article
