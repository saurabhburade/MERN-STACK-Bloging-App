import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from "@material-ui/core/Button";
import DeleteTwoToneIcon from "@material-ui/icons/DeleteTwoTone";
import Divider from '@material-ui/core/Divider';
import ConfirmationNumberOutlinedIcon from '@material-ui/icons/ConfirmationNumberOutlined';
import axios from "axios";
import PROXY from "../Proxy.js"

const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: "none"

    },
    paper: {
        border: "none"
        ,
        backgroundColor: "white",
        borderRadius: "5px",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        width:"200px",
        
        
        MozUserFocus: "none"
    },
}));

export default function TransitionsModal(props) {
    
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
 const   delete_blog=()=>{
        console.log(props.title);
        
     axios.delete(`${PROXY.PROXY}/blog/delete_blog`, {
        
         headers:{
             token: localStorage.getItem("token"),

             title: props.title
         }
     }).then(result=>{
         console.log(result);
         if (result.data==="success") {
             console.log(result);
             window.location.reload(false);

         }
     })
        
    }

    return (
        <div>
            <Button
                size="small"
                variant="contained"
                color="secondary"
                startIcon={<DeleteTwoToneIcon />}
             
                onClick={handleOpen}
                value={props.title}
            >

                DELETE
            </Button>
            <Modal
                disableAutoFocus={true}
                disableEnforceFocus={true}
             
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 300,
                }}
            >

                <Fade in={open}  >
                   <div className="del_modal">
                        <div className={classes.paper} >


                            <h2 id="transition-modal-title">Do you want to delete?</h2>
                            <p id="transition-modal-description">{props.title}</p>
                            <br />

                            <Divider/>
                            <br/>
                            <Button
                                size="small"
                                variant="contained"
                                color="primary"
                                startIcon={<ConfirmationNumberOutlinedIcon />}

                                onClick={delete_blog}
                                value={props.title}
                            >

                                confirm
            </Button>
                        </div>
                      
                   </div>
                </Fade>
            </Modal>
        </div>
    );
}