import React, { Component } from 'react'
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "./loader.css";
import PROXY from "../Proxy.js"
import MobileFriendlyDash from "./MobileFriendlyDash"
import "./addBlog.css";
import axios from "axios";
class AddBlog extends Component {
  constructor(props) {
    super(props);

    this.state = {
        username:"",
        title:"",
        description:"",
      load: 1

    };
  }
  componentWillMount() {
    this.setState({
      load: 1
    })

  }
  componentDidMount() {

    setTimeout(() => {
      this.setState({
        load: 0
      });
    }, 2000);

  }
  titleChange=event=>{
      this.setState({
            title:event.target.value
      })
  }
  descriptionChange=event=>{
      this.setState({
            description:event.target.value
      })
  }
  addblog = event => {
  
    event.preventDefault();

    const blog = {
      token: localStorage.getItem("token"),
        title:this.state.title,
        description:this.state.description,

    };
    axios.post(`${PROXY.PROXY}/blog/add`, blog).then((result) => {
        if (result.data.errors) {
          console.log(result.data.errors);
        alert("invalid credentials \n values should be  unique ");
        }else{
        alert("Blog is Posted");
            
        }
      console.log(result.data);
    });
    
    
    this.setState({
      username: "",
      title: "",
      description: ""
    });
  };

  render() {
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
      <div>
        <div className="BlogFieldContainer">
          <form
            validate="true"
            autoComplete="on"
            onSubmit={this.addblog}
            method="post"
          >

            <TextField
              className="textFields"
              required
              label="Add Title"
              margin="normal"
              onChange={this.titleChange}
              name="title"
              value={this.state.title}
              inputProps={{
                maxLength: 60,
              }}
            />
            <TextField
              className="textFields"
              required
              label="Blog Description"
              margin="normal"
              variant="outlined"
              name="description"
              rows="10"
              onChange={this.descriptionChange}
              multiline
              value={this.state.description}
            />

            <br />
            <Button
              className="btn"
              variant="contained"
              color="primary"
              type="submit"
            >
              Post Blog
            </Button>
          </form>
        </div>
        {/* <MobileFriendlyDash/> */}
      </div>
    );
  }
}

export default AddBlog
