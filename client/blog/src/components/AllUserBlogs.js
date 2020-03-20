import React, { Component } from 'react'
import ShortBlogCard from "./ShortBlogCard"
import axios from "axios";
import PROXY from "../Proxy.js"

class AllUserBlogs extends Component {
    constructor(props) {
        super(props)

        this.state = {
            allBlogs: [],
            load: 0,   
            username: this.props.username, 
        }
    }
    
    
    componentWillMount() {
        this.setState({

            load: 1
        })
     
        
        
        const token = {
            "token": localStorage.getItem("token")
        }

        axios.post(`${PROXY.PROXY}/blog/userBlogs`, token
        ).then(result => {

            this.setState({
                allBlogs: [...result.data],
             
            });

        })
       

    }

    componentDidMount(){

        setTimeout(() => {

            this.setState({
                username: this.state.username
                ,
                load: 0

            });
        }, 2000);
    }
    render() {
        return (
            <div style={{
                display:"flex"
                ,
                justifyContent:"center"
            }}>
                {this.state.allBlogs.map((element, index) => {
                    console.log(this.state)
                    return (


                        <ShortBlogCard title={this.state.allBlogs[index].title} description={this.state.allBlogs[index].description} />
                    )
                })}
            </div>
        )
    }
}

export default AllUserBlogs
