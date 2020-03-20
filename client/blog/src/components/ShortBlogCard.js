import React, { Component } from "react";
import mountain from "./images/mountain.jpg"
import Divider from '@material-ui/core/Divider';
import DeleteModal from "./DeleteModal"
import EditModal from "./EditModal"
import "./Short_blog_card.css";

class ShortBlogCard extends Component {
  constructor(props) {
    super(props)
    this.state={
      delete_blog_title:"",
      description:props.description
    }
  }
  edit_blog=(event)=>{
    console.log(event.target.parentElement.value);
    if (event.target.parentElement.value!= null) {
     this.setState({
       delete_blog_title: event.target.parentElement.value
     })
    
   }
  }

  render() {
    
    return (
      <div className="short-card">
        <div className="card-img">
          <img src={mountain} alt="" />
        </div>
        <div className="short-card-title">
          <p>{this.props.title}</p>
        </div>
        <Divider />

        <div className="actionButtonsSmallCard">

          <EditModal title={this.props.title} description={this.props.description}/>

          <div onClick={this.edit_blog} value={this.props.title}>

            <DeleteModal title={this.props.title}  />
</div>
        </div>
      </div>
    );
  }
}

export default ShortBlogCard;
