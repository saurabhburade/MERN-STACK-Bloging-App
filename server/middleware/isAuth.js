let User = require("../models/users.model");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
// const bodyparser=require(bodyparser)

 const isAuth=(req, res, next) =>{
  const token = req.body.token||req.headers.token;
  
  if (!token) {
    res.status(400).json("No  Token");
    console.log("no  Token");

  }
  try{
      const decode = jwt.verify(token, JWT_SECRET);
  req.user = decode;
    console.log("valid  Token");
    console.log(decode);

  next();
  }
  catch(e){
    console.log("Invalid  Token");
    res.status(400).json("Invalid  Token");
      
  }
}
module.exports=isAuth