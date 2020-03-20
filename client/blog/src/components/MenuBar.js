import React from "react";
import "./menubar.css";
import "@material-ui/core/IconButton";
import authenticated from "../authentication"
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import SwipeableTemporaryDrawer from './menuLIst'
import AccountCircle from "@material-ui/icons/AccountCircle";
import HomeWork from "@material-ui/icons/HomeWork";
import PersonAdd from "@material-ui/icons/PersonAdd";
import PostAdd from "@material-ui/icons/PostAdd";
import { Redirect, Link } from 'react-router-dom'
import LockOpenTwoToneIcon from '@material-ui/icons/LockOpenTwoTone';
import Button from '@material-ui/core/Button';
import ExitToApp from "@material-ui/icons/ExitToApp"
import auth from "../authentication"

function MenuBar() {
  var redirToLogin = false
  const token = localStorage.getItem("token")
  const logout = () => {
    localStorage.clear()
    redirToLogin = true
    window.location.reload(false);
  }
  if (redirToLogin) {
    return <Redirect to="/login" />
  }



  return (


    <div>
      <div className="container">
        <div className="barItems">
          {
            window.screen.width < 750 ?
              <div className="menuButton">
                <div className="menu">
                  <SwipeableTemporaryDrawer />
                </div>
              </div> : null
          }
          <div className="logo"><Link style={{
            color:"orange"
          }} to={"/"}>BlogS</Link></div>
       




          {window.screen.width > 750 ?

            auth(token) ?
              <div className="actionButtons">

                <Link to={""}>
                  <IconButton color="primary" title="All Blogs">
                    <HomeWork />
                  </IconButton>
                </Link>


                <Link to={"/create"}>
                  <IconButton color="primary" title="Add Blog">
                    <PostAdd />
                  </IconButton>


                  <br />
                </Link>

                <div className="notifications" title="Profile">
                  <Link className="" to="/dashboard">

                    <IconButton color="primary">
                      <AccountCircle />
                    </IconButton>
                  </Link>

                </div>







                <div className="notifications" title="Logout">


                  <Link className="logout" to="/login">
                    <IconButton color="secondary" onClick={logout}>
                      <ExitToApp />
                    </IconButton>
                  </Link>
                </div>




              </div> :
              <div className="actionButtons">
                <div className="notification">
                  <Link to={""}>
                    <IconButton color="primary" title="All Blogs">
                      <HomeWork />
                    </IconButton>
                  </Link>
                </div>
                <div className="notifications" title="Login">

                  <Link to={"/login"}>

                    <Button variant="contained" color="primary" endIcon={<LockOpenTwoToneIcon />}>
                      <strong> Login</strong>
                    </Button>
                  </Link>

                </div>
                <div className="notifications" title="Sign Up">


                  <Link to={"/signup"}>
                    <Button variant="contained" color="primary" endIcon={<PersonAdd />}>
                      <strong> Sign Up</strong>
                    </Button>
                  </Link>
                </div>
              </div>
            : null

          }



        </div>
      </div>
    </div>
  );
}

export default MenuBar;
