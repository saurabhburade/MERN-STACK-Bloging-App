import React, { Component, Fragment } from 'react';
import "./single_blog.css"
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import mountain from "./images/mountain.jpg"
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import TwitterIcon from '@material-ui/icons/Twitter';
import { blue } from '@material-ui/core/colors';
import PROXY from "../Proxy.js"
// import Fab from '@material-ui/core/Fab';
import axios from "axios";

class Single_blog extends Component {
    constructor(props) {
        super(props)
        this.state = {

            blog: {},
            avatar: "",
            err: false

        }

    }
    componentWillMount() {
console.log("env ##"+process.env.PORT);   
        const token = {
            "token": localStorage.getItem("token"),

        }
        axios.post(`${PROXY.PROXY}/blog/userBlogs/` + this.props.match.params.blog_id + "", token).then(

            blog => {

                this.setState({
                    blog: { ...blog.data[0] },
                    avatar: blog.data[0].username.charAt(0)
                })
                console.log(this.state.blog);
            }


        )
            .catch(err => {
                this.setState({
                    err: true
                })
               
                console.log("ERROR" + err);
            })
    }
    copyToClipboard=()=>{
        // const element = "localhost:3000" + this.props.location.pathname
        // element.select()
        // document.execCommand("copy")
        console.log("localhost:3000"+this.props.location.pathname)
        
    }
    render() {

        console.log(this.props.match.params.blog_id);
        return (

            <Fragment>
                {this.state.err ? <div className="single_blog_container"><h1>OOPS... Blog Not Found         </h1></div>: <div className="single_blog_container">

                    <div>


                        <div className="linkShare">
                            <div className="fb" title="Facebook">
                                <IconButton color="inherit" size="medium" className="profileIcon" >
                                    <FacebookIcon style={{ fontSize: 35 }} color="primary" />
                                </IconButton>

                            </div>
                            <div className="fb" title="LinkedIn">
                                <IconButton color="inherit" size="large" className="profileIcon">
                                    <LinkedInIcon style={{ fontSize: 35 }} />
                                </IconButton>

                            </div> <div className="fb" title="Twitter">
                                <IconButton color="inherit" size="large" className="profileIcon">
                                    <TwitterIcon style={{
                                        fontSize: 35,
                                        color: blue[500]
                                    }} />
                                </IconButton>



                            </div>
                            <div className="fb" onClick={this.copyToClipboard} title="Copy Link">
                                <IconButton color="primary" size="large" className="profileIcon">
                                    <FileCopyIcon style={{ fontSize: 35 }} color="action" />
                                </IconButton>
                                {/* <Fab color="primary" aria-label="add">
                                    <FileCopyIcon  />
                                </Fab> */}

                            </div>
                        </div>



                    </div>


                    <div className="blog_items">




                        <div className="head_elements">
                            <div className="single_blog_heading">
                                <h1>#{this.state.blog.title} </h1>
                            </div>
                            <div className="single_blog_user">



                                <div className="profile">
                                    <div className="avtar">

                                        <IconButton color="inherit" size="small" className="profileIcon">
                                            <Avatar aria-label="recipe">
                                                {this.state.avatar}
                                            </Avatar>
                                        </IconButton>
                                    </div>
                                    <div className="user">
                                        <h3>{this.state.blog.username}</h3>
                                        <p>{this.state.blog.updatedAt} </p>
                                    </div>
                                </div>



                            </div>
                        </div>
                        <div className="single_blog_description">
                            <img src={mountain} alt="" className="single_blog_img" />
                            <p className="blog_description">

                                <pre> {this.state.blog.description}
</pre>
                            </p>


                        </div>
                    </div>







                </div>
} 

            </Fragment>


        );
    }
}

export default Single_blog;