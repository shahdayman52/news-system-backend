//middlewar/checkadmin.js
module.exports=(req, res , next)=>{
  console.log(req.user.role); // Check what’s inside req.user

  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Access denied" });
  }
}