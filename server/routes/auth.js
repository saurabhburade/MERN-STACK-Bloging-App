const router = require("express").Router();
let User = require("../models/users.model");
require("dotenv").config();
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;


router.post("/", (req, res) => {
    const email = req.body.email;
    const upwd = req.body.upwd
    console.log(req.body);
    console.log("email",email);
    User.find({ email })
        .then(user => {
            
            console.log("user",user);
         
            bcrypt.compare(req.body.upwd, user[0].upwd)
                .then(isMatch => {
                    console.log("ismatch  ",isMatch);
                    if (!isMatch) {
                        console.log("not match");
                        res.json({ "err": "Incorrect Password" })

                    }

                    // jwt.sign({ email }, JWT_SECRET, (err, token) => {
                    //     if (err) {
                    //         console.log("token Not Exist");

                    //         res.json("token Not Exist");

                    //     }
                        res.json({
                            user
                        });
                    //     console.log(token, user)

                    // })


                })
        })
        .catch(err => {
        
                                
                        console.log("User Not Found");

                        res.json({ "err": "User Not Found" })
                
        })


})








module.exports = router