import React, { Component } from "react";
import "./Viewblogs.css"
import PROXY from "../Proxy.js" 
import axios from "axios";
import BlogCard from "./BlogCard"
class Viewblogs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allBlogs: [
        {
          username: "",
          title: "",
          description: `
             `,
          load: 1

        }
      ]
    };
  }
  
  componentWillMount() {
    this.setState({
      load: 1
    })

  }
 

componentDidMount() {
    console.log("clicked");
    const token={
      "token": localStorage.getItem("token")
    }
  axios.get(`${PROXY.PROXY}/blog/`,token
  ).then(result => {
      console.log(result.data);
      this.setState({
        allBlogs: [...result.data]
        
      });
    });
    
  setTimeout(() => {
    this.setState({
      load: 0
    });
  }, 2000);
    
    
  }

  render() {
    console.log(PROXY);
    if (this.state.load === 1) {
      return (
        <div className="loaderdiv">
          <div className="loader"></div>
          <br />
          <h3>Loading.....</h3>
        </div>

      );
    }
    
    
    return (
      <div className="blogContainer" id="blogContainer">
       
        {this.state.allBlogs.reverse().map((element,index)=>
        {return (

          <BlogCard title={this.state.allBlogs[index].title}
          
            avtar={this.state.allBlogs[index].username.charAt(0)}
          
            username={this.state.allBlogs[index].username}
          description={this.state.allBlogs[index].description} 
            _id={this.state.allBlogs[index]._id}

          date={
            this.state.allBlogs[index].createdAt
          } />
          
         );
        }
        )}
      </div>
      
    );
  }
}

export default Viewblogs;
