const router = require("express").Router();
let Blog = require("../models/blog.model");
// const isAuth = require("../middleware/isAuth");
let User = require("../models/users.model");
const middleware = require("../middleware/isAuth")

router.route('/userBlogs/:blog_id').post((req, res) => {
  const blog_id = req.params.blog_id
  console.log(req.params.blog_id);
  console.log("**Fetch a blog **\n");

  Blog.find({ _id: blog_id })
    .select("-token")
    .select("-_id")
    .select(
      "-createdAt")
    .then(blog => res.json(blog))
    .catch(err => res.status(400).json('error' + err))
})


router.route("/").get((req, res) => {
  console.log("**Fetch all Blog **\n");

  Blog.find()
    .select("-token")
    .then(blogs => res.json(blogs))
    .catch(err => res.status(400).json('error' + err))
})
router.use(middleware)

router.route("/delete_blog").delete((req, res) => {
  const title = req.headers.title
  console.log("**Delete Blog **\n");

  Blog.findOneAndDelete({ title })
    .then(blogs => res.json("success"))
    .catch(err => res.status(400).json('error**' + err))
})

router.route("/update").put((req, res) => {
  const title = req.body.title
  const findTitle = req.body.findTitle
  const token = req.body.token
  const description = req.body.description
  const Updated_blog = {
    title,
    description

  }
  console.log(Updated_blog);
  console.log("update req start *******\n \n", description, "update req end");
  Blog.updateOne({ title: findTitle }, Updated_blog, (err, result) => {
    console.log("**Update Blog **\n", result);
  })


})

router.route("/userBlogs").post((req, res) => {
  const token = req.body.token;
  console.log("**Fetch user specific Blog **\n");
  console.log("token");

  Blog.find({ token })
    .select("-token")
    .select("-_id")
    .then(blogs => res.json(blogs))
    .catch(err => res.status(400).json('error' + err))
})


router.post("/add", (req, res) => {


  console.log("**Save New  Blog **\n");

  const title = req.body.title;
  const description = req.body.description;
  const token = req.body.token;
  var username
  User.find({ token })
    .then(user => {

      username = user[0].fname + " " + user[0].lname;
      const newBlog = new Blog({
        token,
        username,
        title,
        description
      });
      newBlog.save()
        .then(() => {
          console.log("blog uploaded");
          res.json("blog uploaded");
        })
        .catch((err) => {
          console.log("from \n \n" + err);
          res.json(err);


        })
    });

});

module.exports = router