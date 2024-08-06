const express = require("express");
const cors = require('cors');

const http = require("http");
const bodyParser = require("body-parser");
const { User } = require("./models"); 
const userRoutes = require("./routes/userRoutes");
const articleRoutes = require("./routes/articleRoutes");

// const dotenv = require('dotenv');
// dotenv.config();
// const port=process.env.PORT;
const app = express();
const port = 3002;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use("/api", userRoutes);
app.use("/api", articleRoutes); // Register article routes

const server = http.createServer(app);

server.headersTimeout = 60000;
server.maxHeaderSize = 16 * 1024 * 1024;

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({
    message: 'Something went wrong!',
    error: err.message || 'Internal Server Error',
  });
});

User.sync().then(() => {
  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
});

// const express =require('express');
// const cors = require('cors');
// const dotenv = require('dotenv');
// // const port = 3002;
// const router=require('./routes/route.js');
// dotenv.config();
// const port=process.env.PORT;
// const app=express();
// app.use(express.json());
// app.use(cors());
// app.use('/api',router);
// app.listen(port, () => {
//       console.log(`Server running on http://localhost:${port}`);
//     });

//   User.sync().then(() => {
//     app.listen(port, () => {
//       console.log(`Server running on http://localhost:${port}`);
//     });
//   });

// const express = require("express");
// const http = require("http");

// const app = express();
// const port = 3002;
// const bodyParser = require("body-parser");
// const bcrypt = require("bcryptjs");
// const Joi = require("joi");
// const { User } = require("./models"); // Import the User model

// //login code
// const jwt=require('jsonwebtoken');
// const jwtSecretKey='secret_key@'
// //

// app.use(bodyParser.json());

// app.use(bodyParser.urlencoded({ extended: true }));

// // Your route handlers...

// const server = http.createServer(app);

// // Increase the maximum header size
// server.headersTimeout = 60000;
// server.maxHeaderSize = 16 * 1024 * 1024;

// // app.get("/", (req, res) => {
// //   res.send("Hello, world!");
// // });

// const userSchema = Joi.object({
//   username: Joi.string().min(3).max(150).required(),
//   email: Joi.string().email().required(),
//   password: Joi.string()
//     .min(8)
//     .pattern(new RegExp("(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[@$!%*?&])"))
//     .required(),
// });

// app.post("/api/register", async (req, res) => {
//   const { username, email, password } = req.body;

//   const { error } = userSchema.validate({ username, email, password });
//   if (error) {
//     return res.status(400).json({ message: error.details[0].message });
//   }

//   const existingUser = await User.findOne({ where: { email } });
//   if (existingUser) {
//     return res.status(400).json({ message: "Email is already in use" });
//   }

//   const hashedPassword = await bcrypt.hash(password, 10);

//   const newUser = await User.create({
//     username,
//     email,
//     password: hashedPassword,
//   });

//   res.status(201).json({ message: "User registered successfully" });
// });

// //login code
// //1-login schema
// const loginSchema= Joi.object({
//     email:Joi.string().email().required(),
//     password:Joi.string().required()
// });

// //2-login route
// app.post('/api/login', async(req,res)=>{
// const{email,password}=req.body;

// const { error } = loginSchema.validate({ email, password });
// if (error) {
//   return res.status(400).json({ message: error.details[0].message });
// }

// //3-checking user availability
// const user = await User.findOne({where:{email}});
// if(!user){
//     return res.status(400).json({message:"Email does not exist "})
// }

// //4-checking if pw match
// const validPassword=await bcrypt.compare(password,user.password)
// if(!validPassword){
//     return res.status(400).json({message:"Incorrect password"})
// }

// //5-generate el gwt token
// const token = jwt.sign({ id: user.id, email: user.email }, jwtSecretKey, {
//   expiresIn: "1h",
// });
//   res.status(200).json({ message: "Login successful", token });

// })

// User.sync().then(() => {
//   app.listen(port, () => {
//     console.log(`Server running on http://localhost:${port}`);
//   });
// });

//////////////////////////

// app.get("/select", (req, res) => {
//   User.findAll({ where: { username: "name" } })
//     .then((users) => {
//       res.send(users);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// app.get("/insert", (req, res) => {
//   User.create({
//     username: "name",
//     email: "dots@gmail.com",
//     password: "True@2003",
//   }).catch((err) => {
//     if (err) {
//       console.log(err);
//     }
//   });
//   res.send("insert");
// });

// app.get("/delete", (req, res) => {
//   User.destory({ where: { id: 10 } });
//   res.send("delete");
// });
