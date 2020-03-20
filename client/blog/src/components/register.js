import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "./register.css";
import axios from "axios";
import PROXY from "../Proxy.js"

class register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: "",
      lname: "",
      email: "",
      upwd: "",
      upwdc: "",
      islogin:false,
      token:""
    };
  }
  fnameChange = event => {
    this.setState({
      fname: event.target.value
    });
  };

  lnameChange = event => {
    this.setState({
      lname: event.target.value
    });
  };
  emailChange = event => {
    this.setState({
    email: event.target.value
    });
  };
upwdChange = event => {
    this.setState({
      upwd: event.target.value
    });
  };
  upwdcChange = event => {
    this.setState({
      upwdc: event.target.value
    });
  };

  regSubmit = event => {
    event.preventDefault();
    const user = {
      fname: this.state.fname,
      lname: this.state.lname,
      email: this.state.email,
      upwd: this.state.upwd,
     
     
    };
    if (user.upwd===this.state.upwdc) {
      axios.post(`${PROXY.PROXY}/user/add`, user).then((result) => {
        console.log(result);
      if(result.data.errors) {
        alert("invalid credentials \n values should be  unique ");
      
      }
      if (!result.data.errors) {
        
            
        alert("Registered Successfilly");
        window.location.reload(false);

      }
      this.setState({
        fname: "",
        lname: "",
        email: "",
        upwd: "",
        upwdc: ""
        
      });
        localStorage.setItem("token", result.data.token);
        console.log(localStorage);
        console.log(result);
      });
    }else{
      alert("Password Not Match")
    }
    
  };

  render() {
      
    
    return (
      <div>
       
        <div className="regContainer">
          <form
            validate="true"
            autoComplete="off"
            onSubmit={this.regSubmit}
            method="post"
          >
            <TextField
              className="textFields"
              required
              label="First Name"
              margin="normal"
              variant="outlined"
              name="fname"
              value={this.state.fname}
              onChange={this.fnameChange}
            />
            <TextField
              className="textFields"
              required
              label="Last Name"
              margin="normal"
              variant="outlined"
              name="lname"
              onChange={this.lnameChange}
              value={this.state.lname}
            />
            <TextField
              className="textFields"
              required
              type="email"
              label="Email"
              margin="normal"
              variant="outlined"
              name="email"
              onChange={this.emailChange}
              value={this.state.email}
            />
            <TextField
              className="textFields"
              required
              type="password"
              label="Password"
              margin="normal"
              variant="outlined"
              name="upwd"
              onChange={this.upwdChange}
              value={this.state.upwd}
            />
            <TextField
              className="textFields"
              required
              type="password"
              label="Confirm Password"
              margin="normal"
              variant="outlined"
              name="upwdc"
              onChange={this.upwdcChange}
              value={this.state.upwdc}
            />
            <br />
            <Button
              className="btn"
              variant="contained"
              color="primary"
              type="submit"
            >
              Register
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default register;
