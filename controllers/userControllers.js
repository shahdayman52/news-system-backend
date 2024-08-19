const bcrypt = require("bcryptjs");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

const jwtSecretKey = "secret_key@";

const userSchema = Joi.object({
  username: Joi.string().min(3).max(150).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .pattern(new RegExp("(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[@$!%*?&])"))
    .required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  const { error } = userSchema.validate({ username, email, password });
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    return res.status(400).json({ message: "Email is already in use" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  res.status(201).json({ message: "User registered successfully" });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const { error } = loginSchema.validate({ email, password });
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(400).json({ message: "Email does not exist" });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(400).json({ message: "Incorrect password" });
  }

  const token = jwt.sign(
    { id: user.id, role: user.role, email: user.email },
    jwtSecretKey,
    {
      expiresIn: "1h",
    }
  );

  res.status(200).json({ message: "Login successful", token });
};

const getUser = async(req,res)=>{
  try {
    const {id}=req.params;
    const user= await User.findByPk(id,{
      attributes:['username'],
    });

    if(!user){
      return res.status(404).json({message:'User not found!'})
    }

    res.json({username:user.username})
  }
  catch(error){
    console.error("Error fetching username:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
module.exports = { registerUser, loginUser, getUser };

