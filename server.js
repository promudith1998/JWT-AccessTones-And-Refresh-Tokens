require("dotenv").config();
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");

app.use(express.json());
const posts = [
  {
    username: "Promu",
    title: "post 1",
  },
  {
    username: "Jim",
    title: "post 2",
  },
];

app.get("/posts", authenticateToken, (req, res, next) => {
    // console.log(req.user)
   // res.json(posts)
  res.json(posts.filter(post => post.username === req.user.name));
});


function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
//   console.log(authHeader)
  const token = authHeader && authHeader.split(" ")[1];
if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.Access_Token_Secret, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

app.listen(3001);
