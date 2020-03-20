import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import auth from "../authentication"
import { Redirect, Link } from 'react-router-dom'
import HomeWork from "@material-ui/icons/HomeWork";
import PostAdd from "@material-ui/icons/PostAdd";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ExitToApp from "@material-ui/icons/ExitToApp"
import LockOpenTwoToneIcon from '@material-ui/icons/LockOpenTwoTone';
import PersonAdd from "@material-ui/icons/PersonAdd";

import "./menubar.css";

const useStyles = makeStyles({
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  }
});

export default function SwipeableTemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false
  });

  const toggleDrawer = (side, open) => event => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [side]: open });
  };
  const token = localStorage.getItem("token")

  const sideList = side => (
    
 
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      
       { auth(token)?   
 
 
      <List>
        {/*home */}
        
        <ListItem button >
          <ListItemIcon>
            <Link to={""}>    <HomeWork /></Link>
          </ListItemIcon>
          <Link to={""}>       <ListItemText primary="Home" /></Link>
        </ListItem>
      <Divider />
{/* create */}
        <ListItem button >
          <ListItemIcon>
            <Link to={"/create"}>    <PostAdd /></Link>
          </ListItemIcon>
          <Link to={"/create"}>    <ListItemText primary="Add Blog" /></Link>
        </ListItem>
      <Divider />
{/* profile */}
        <ListItem button >
          <ListItemIcon>
            <Link to={"/dashboard"}><AccountCircle /></Link>
          </ListItemIcon>
          <Link to={"/dashboard"}>    <ListItemText primary="Pofile" /></Link>
        </ListItem>
        <Divider />
{/* logout */}
        <ListItem button onClick={logout} >
          <ListItemIcon onClick={logout}>
            <Link to={"/login"}>   <ExitToApp /> </Link>
          </ListItemIcon>
          <Link to={"/login"} onClick={logout}>    <ListItemText primary="Logout" /></Link>
        </ListItem>
        <Divider />
      </List>:  <List>
        
        
        {/* Login */}
        <ListItem button >
          <ListItemIcon>
            <Link to={"/login"}> <LockOpenTwoToneIcon /> </Link>
          </ListItemIcon>
          <Link to={"/login"}>    <ListItemText primary="Login" /></Link>
        </ListItem> 
        <Divider />
{/* Sign Up */}
        <ListItem button >
          <ListItemIcon>
            <Link to={"/signup"}> <PersonAdd /> </Link>
          </ListItemIcon>
          <Link to={"/signup"}>    <ListItemText primary="Sign Up" /></Link>
        </ListItem>

        {/* <Link className="" to="/dashboard">

          <IconButton color="primary">
            <AccountCircle />
          </IconButton>
        </Link>
        
            <Link className="logout" to="/login">
                    <IconButton color="secondary" onClick={logout}>
                      <ExitToApp />
                    </IconButton>
                  </Link>        
        */
        }






      </List>}
     
    </div>
  );

  //   const fullList = side => (
  //     <div
  //       className={classes.fullList}
  //       role="presentation"
  //       onClick={toggleDrawer(side, false)}
  //       onKeyDown={toggleDrawer(side, false)}
  //     >
  //       <List>
  //         {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
  //           <ListItem button key={text}>
  //             <ListItemIcon>
  //               {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
  //             </ListItemIcon>
  //             <ListItemText primary={text} />
  //           </ListItem>
  //         ))}
  //       </List>
  //       <Divider />
  //       <List>
  //         {["All mail", "Trash", "Spam"].map((text, index) => (
  //           <ListItem button key={text}>
  //             <ListItemIcon>
  //               {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
  //             </ListItemIcon>
  //             <ListItemText primary={text} />
  //           </ListItem>
  //         ))}
  //       </List>
  //     </div>
  //   );
  var redirToLogin = false

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


      <IconButton
        onClick={toggleDrawer("left", true)}
        className="menuIcon"
        type="submit"
      >
        <MenuIcon className="menuLines" />
      </IconButton>
      <SwipeableDrawer
        open={state.left}
        onClose={toggleDrawer("left", false)}
        onOpen={toggleDrawer("left", true)}
      >
        {sideList("left")}
      </SwipeableDrawer>
    </div>
  );
}
