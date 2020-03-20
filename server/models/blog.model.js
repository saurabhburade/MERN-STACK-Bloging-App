const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var uniqueValidator = require("mongoose-unique-validator");
const blogSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique:false  
     
    },
    
    token: {
      type: String,

      required: true,
      maxlength: 50000


    },
    title: {
      type: String,
      required: true,
     
    },
    description: {
      type: String,
      required: true,
      minlength: 5,
      unique: true
    }
  },
  {
    timestamps: true
  }
);
blogSchema.plugin(uniqueValidator);
const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;