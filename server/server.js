
const express = require("express");
const cors=require("cors")
require("dotenv").config()
const blogRoutes=require('./routes/blogs')
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const middleware=require("./middleware/isAuth")
const path=require('path')
const mongoose=require("mongoose")

const app = express();
app.use(cors())
app.use(express.json());


const uri=process.env.ATLAS_URI
mongoose.connect(uri, { useNewUrlParser: true ,useUnifiedTopology: true,useCreateIndex:true });
const connection=mongoose.connection;
connection.once('open',()=>{
  console.log("connected");
})
app.use("/blog", blogRoutes);
app.use("/user", userRoutes);
app.use("/auth", authRoutes);

if (process.env.NODE_ENV = 'production'){
  app.use(express.static("../client/blog/build"))
  app.use("*", (req, res) => {
    res.writeHead(200, { "content-type": "text/html" })
    // res.sendFile(path.resolve(__dirname, "..", "client", "blog", "build", "index.html"))
    res.send("Hello Bloging app")
  })
}


const port=process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`server listening to ${port} localy`);
})