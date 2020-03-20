const router = require("express").Router();
let User = require("../models/users.model");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const bcrypt = require("bcrypt");
router.route("/").get((req, res) => {
  console.log("**Fetch specific users**\n");

  const token = req.headers.token;
  User.find({ token })
    .then(users => {
      res.json(
        {
          fname: users[0].fname,
          lname: users[0].lname
        }
      )
    })
    .catch(err => res.status(400).json("error" + err));
});




router.route("/add").post((req, res) => {
  console.log("** Register users**\n");

  const fname = req.body.fname;
  const lname = req.body.lname;
  const email = req.body.email;
  const upwd = req.body.upwd;

  // User.find({ email }).then(user => {
  //   console.log(user);
  // });

  const newUser = new User({
    token: "",
    fname,
    lname,
    email,
    upwd
  });

  jwt.sign({ email: newUser.email }, JWT_SECRET, (err, token) => {
    if (err) throw err;
    newUser.token = token;
  });

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.upwd, salt, (err, hash) => {
      if (err) throw err;
      newUser.upwd = hash;
    });
  });

  newUser
    .save()
    .then(newUser => {
      newUser.token = newUser.token
      res.status(200).json(newUser);
      res.status(200).json(newUser.token);

      console.log(newUser.token, "Registered Successfilly");
    })
    .catch(err => {

      res.json(err);
    });
});



router.route("/update").post((req, res) => {
  console.log("** Update user**\n");

  const Current_upwd = req.body.Current_upwd;
  const New_upwd = req.body.upwd

  const New_fname = req.body.fname;
  const token = req.body.token;
  const New_lname = req.body.lname;

  const Updated_User = {

    fname: New_fname,
    lname: New_lname,
    upwd: New_upwd,

  }


  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(Updated_User.upwd, salt, (err, hash) => {
      if (err) throw err;
      Updated_User.upwd = hash;
    });
  });

  User.find({ token })
    .then(user => {
      console.log(token);
      console.log("user update", user);

      bcrypt.compare(Current_upwd, user[0].upwd)
        .then(isMatch => {
          console.log("ismatch  ", isMatch);
          if (!isMatch) {
            console.log("not match");
            res.json({ "err": "Incorrect Password" })

          }

          User.findOneAndUpdate({ token }, Updated_User, function (err, result) {
            if (err) {
              console.log(err);

            }

            console.log("updated user", result);

          });


          res.send({
            user
          });
          console.log(token, user)




        })
    })



});


module.exports = router;
