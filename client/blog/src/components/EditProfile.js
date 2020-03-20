import React, { Component, Fragment } from 'react';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "./register.css";
import axios from "axios";
import PROXY from "../Proxy.js"

class EditProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fname: this.props.fname,
            lname: this.props.lname,
            Current_upwd: "",
            upwd: "",
            upwdc: "",

        }
    }
    usernameChange = event => {
        this.setState({
            username: event.target.value
        });
    };
    
    
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
    Current_upwdChange = event => {
        this.setState({
            Current_upwd: event.target.value
        });
    };
    
    
    
    updateSubmit = event => {
        event.preventDefault();
        const user = {
            fname: this.state.fname,
            lname: this.state.lname,
            Current_upwd: this.state.Current_upwd,
         
            upwd: this.state.upwd,
            token: localStorage.getItem("token"),


        };
        if (user.upwd === this.state.upwdc) {
            axios.post(`${ PROXY.PROXY }/user/update`, user).then((result) => {
                console.log(result);
                if (result.data.errors) {
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
                    upwdc: "",
                    Current_upwd: "",


                });

            });
        } else {
            alert("Password Not Match")
        }

    };
    
    render() {
        // console.log(localStorage.getItem("token"));
        return (
            <Fragment>

                <div>

                    <div className="regContainer">
                        <form
                            validate="true"
                            autoComplete="off"
                            onSubmit={this.updateSubmit}
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
                                type="password"
                                label="Enter Current Password"
                                margin="normal"
                                variant="outlined"
                                name="upwd"
                                onChange={this.Current_upwdChange}
                                value={this.state.Current_upwd}
                            />
                            <TextField
                                className="textFields"
                                required
                                type="password"
                                label="New Password"
                                margin="normal"
                                variant="outlined"
                                name="upwdc"
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
                                Update Profile
            </Button>
                        </form>
                    </div>
                </div>

            </Fragment>


        );
    }
}

export default EditProfile;