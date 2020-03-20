import React, { Component } from 'react'
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import DynamicFeedOutlinedIcon from '@material-ui/icons/DynamicFeedOutlined';
import axios from "axios";
import PROXY from "../Proxy.js"
import "./EditBlogForm.css"
class EditBlogForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: this.props.title,
            description: this.props.description,
            findTitle: this.props.title

        }
    }
    titleChange = event => {
        this.setState({
            title: event.target.value
        })
    }
    descriptionChange = event => {
        this.setState({
            description: event.target.value
        })
    }

    update_blog = event => {
       
        const blog = {
            title: this.state.title,
            description: this.state.description,

            token: localStorage.getItem("token"),
            findTitle: this.state.findTitle

        };
        console.log(this.state.findTitle);

        axios.put(`${PROXY.PROXY}/blog/update`, blog, {
            headers: {
                token: localStorage.getItem("token"),

            }
        }).then((result) => {
            console.log(result);
            window.location.reload(false);


        })

    }

    render() {
        return (
            <div className="editBlogFormContainer">
                <form

                    style={{
                        display: "flex",
                        flexDirection: "column"
                        ,
                     
                    }}
                    className="editBlogForm"
                    validate="true"
                    autoComplete="on"
                    method="update"
                >

                    <TextField
                        className="textFields"
                        required
                        label="Add Title"
                        margin="normal"
                        onChange={this.titleChange}
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
                        value={this.state.description}

                        onChange={this.descriptionChange}
                        multiline
                    />

                    <br />
                    <div>
                        <Button

                            variant="contained"
                            color="primary"
                            type="submit"
                            size="small"
                            startIcon={<DynamicFeedOutlinedIcon />}
                            onClick={this.update_blog}
                        >
                            Update
            </Button>
                    </div>
                </form>

            </div>
        )
    }
}

export default EditBlogForm
