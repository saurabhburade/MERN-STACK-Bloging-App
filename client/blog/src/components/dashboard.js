import React, { Component } from 'react'
import "./dashboard.css"
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import CallToActionTwoToneIcon from '@material-ui/icons/CallToActionTwoTone';
import RecentActorsTwoToneIcon from '@material-ui/icons/RecentActorsTwoTone';
import PostAdd from "@material-ui/icons/PostAdd";
import ExitToApp from "@material-ui/icons/ExitToApp"
import user_profiles from './images/user-profiles.svg'
import EditProfile from "./EditProfile"
import axios from "axios";
import { Redirect, Link } from 'react-router-dom'
import AddBlog from "./AddBlog";
import AllUserBlogs from "./AllUserBlogs"
import PROXY from "../Proxy.js"

class Dashboard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            allBlogs: [],
            load: 0,
            username: "",
            logout: false,
            dash_new_bog: false,
            dash_myblogs: true,
            dash_edit_profile:false,
            fname:"",
            lname:""
        }
    }

    logout = () => {
        localStorage.clear()
       
        this.setState({
            logout: true
        })

    }
    dash_new_blog = () => {
        this.setState({
            dash_new_bog: true,
            dash_myblogs: false,
          

        })
    }
    
    dash_edit_profile = () => {
        this.setState({
            dash_new_bog: false,
            dash_myblogs: false,
            dash_edit_profile: true,


        })
    }
    
        dash_myblogs = () => {
        this.setState({
            dash_myblogs: true,
            dash_new_bog: false,
         


        })
    
    }


    componentWillMount() {
        this.setState({

            load: 1
        })
        axios.get(`${PROXY.PROXY}/user/`, {
            headers: {
                token: localStorage.getItem("token")
            }
        }
        ).then(user => {
            
            this.setState({
                fname: user.data.fname,
                lname: user.data.lname
            })
        })

    }


    componentDidMount() {

        const token = {
            "token": localStorage.getItem("token")
        }
       
        axios.post("/blog/userBlogs", token
        ).then(result => {
         
            this.setState({
                allBlogs: [...result.data],
                username: result.data[0].username
            });
          
        })
            .catch(err => {
                console.log("no blog");
           
            })

        setTimeout(() => {
           
            this.setState({
                username: this.state.username
                ,
                load: 0

            });
        }, 2000);
      

    }
    componentWillUnmount() {
        window.location.reload(false)

    }
    render() {
        

        
      
        if (this.state.logout === true) {
            return <Redirect exact to="/login" />

        }
        return (
            <div className="dash-container">

                <div className="dash-left">

                    {
                        this.state.load === 1 ?
                            <div className="card-load">
                                <div className="loaderdiv">
                                    <div className="loader"></div>
                                    <br />
                                    <h3>Loading.....</h3>
                                </div>
                            </div>
                            : null
                    }
                    
                        {this.state.dash_new_bog ? <AddBlog /> :
                        
                        this.state.dash_myblogs?
                        
                            <div className="Short_blog_card_container">
                              
                              
                                <AllUserBlogs />
                               
                                
                            </div> : this.state.dash_edit_profile ? <EditProfile fname={this.state.fname} lname={this.state.lname} /> :null
                     
                        }
                  
                    {/* <EditProfile username={this.state.username}/> */}
                </div>
                <div className="dash-right">
                    <div className="dash-profile-card">
                        <div className="dash-profile" title="Profile">
                            <img src={user_profiles} alt="" />

                        </div>

                        <h6>{this.state.fname + " " + this.state.lname}</h6>

                    </div>
                    <div className="dash-profile-items">

                        <List component="nav" aria-label="main mailbox folders">
                            <ListItem button onClick={this.dash_myblogs}>
                                <ListItemIcon>
                                    <CallToActionTwoToneIcon />
                                </ListItemIcon>
                                <ListItemText primary="My Blogs" />
                            </ListItem>
                            <Divider />
                            <ListItem button onClick={this.dash_new_blog}>
                                <ListItemIcon>
                                    <PostAdd />
                                </ListItemIcon>
                                <ListItemText primary="New Blog" />
                            </ListItem>
                            <Divider />

                            <ListItem button onClick={this.dash_edit_profile}>
                                <ListItemIcon>
                                    <RecentActorsTwoToneIcon />
                                </ListItemIcon>
                                <ListItemText primary="Edit Profile" />
                            </ListItem>
                            <Divider />
                            <Link to="/login">
                                <ListItem button onClick={this.logout}>

                                    <ListItemIcon>
                                        <ExitToApp />
                                    </ListItemIcon>
                                    <ListItemText color="secondary"  >
                                        <p className="dash-logout">Log Out</p>
                                    </ListItemText>
                                </ListItem>

                            </Link>

                        </List>

                    </div>
                </div>
              
            </div>
           

            
        )
    }
}

export default Dashboard
