const express = require("express");
const cors = require("cors");
const http = require("http");
const bodyParser = require("body-parser");
const { sequelize } = require('./models');
const { User,Article } = require("./models");
const userRoutes = require("./routes/userRoutes");
const articleRoutes = require("./routes/articleRoutes");
const adminRoutes = require("./routes/adminRoutes");

const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT || 3002;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", userRoutes);
app.use("/api", articleRoutes);
app.use("/api", adminRoutes);

const server = http.createServer(app);

server.headersTimeout = 60000;
server.maxHeaderSize = 16 * 1024 * 1024;

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({
    message: "Something went wrong!",
    error: err.message || "Internal Server Error",
  });
});

User.sync().then(() => {
  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
});


