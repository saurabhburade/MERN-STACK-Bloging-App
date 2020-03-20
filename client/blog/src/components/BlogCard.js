import React, { Component, Fragment } from 'react';
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import "./BlogCard.css"
import mountain from "./images/mountain.jpg"
import { Link } from "react-router-dom";

class BlogCard extends Component {

    render() {

        return (


            <Fragment>


                <div className="blog-card">
                    <div className="leftBlock">
                        <div className="card-img">

                            <img src={mountain} alt="" />
                        </div>
                    </div>
                    <div className="rightBlock">
                        <Link to={"/" + this.props.username + "/" + this.props._id}>
                            <h1>#{this.props.title}</h1>


                        </Link>

                        <div className="profile">
                            <div className="avtar">

                                <IconButton color="inherit" size="small" className="profileIcon">
                                    <Avatar aria-label="recipe">
                                        {this.props.avtar}
                                    </Avatar>
                                </IconButton>
                            </div>
                            <div className="user">
                                <h3>{this.props.username}</h3>
                                <p>{this.props.date}</p>
                            </div>
                        </div>
                        <div className="detail">
                            <p>{this.props.description}
                            </p>
                        </div>
                    </div>
                </div>


            </Fragment>



        );
    }
}

export default BlogCard;