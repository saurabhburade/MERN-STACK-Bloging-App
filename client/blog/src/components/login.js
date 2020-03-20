import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import './login.css';
import axios from "axios";
import { Redirect } from 'react-router-dom'

import PROXY from "../Proxy.js"


class login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      upwd: "",
      isAvail:true,
      load: 1,
      isLoggedIn:false

    };
  }

  componentWillMount() {
    this.setState({
      load: 1
    })

  }
  
  componentDidMount() {
    console.log("did mount ");

    setTimeout(() => {
      this.setState({
        load: 0
      });
    }, 2000);

  }
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
  login=(event)=>{
     event.preventDefault();
    const user = {
      email: this.state.email,
      upwd: this.state.upwd
    };
    

    
    axios.post(`${PROXY.PROXY}/auth/`, user).then(result => {
       if (result.data.err) {
         alert(result.data.err)
  
         if (result.data.err === "User Not Found") {
           alert(result.data.err)

this.setState({
  isAvail: false

})
          
         }
         console.log("login unsuccess ");
         
       } else {
      
         console.log("login Successfilly");
 

         localStorage.setItem("token", result.data.user[0].token);
    

  

    
    
    
         this.setState({  

           email: "",
           upwd: "",
           isAvail: true,
isLoggedIn: true

         });
         window.location.reload(false);

       }
      
console.log(Headers);
       console.log(result);
     });
  }
  render() {
    
   
    if (this.state.isLoggedIn===true) {

      return <Redirect to="/" />

    }
    if (this.state.load === 1) {
      return (
        <div className="loaderdiv">
          <div className="loader"></div>
          <br />
          <h3>Loading.....</h3>
        </div>

      );
    }
    if (!this.state.isAvail) {
    return  <Redirect  to="/signup" />
    }
    return (
      <div className="loginContainer">
        <form
          validate="true"
          autoComplete="on"
          method="post"
          onSubmit={this.login}
        >
          <div className="loginDiv">
            <TextField
              type="email"
              className="textFields"
              required
              label="Username"
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
            <br />
            <Button
              className="btn"
              variant="contained"
              color="primary"
              type="submit"
            >
              Login
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

export default login
