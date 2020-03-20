import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from "@material-ui/core/Button";
import Divider from '@material-ui/core/Divider';
// import axios from "axios";
import EditBlogForm from "./EditBlogForm"
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';

const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: "none",
        padding:"0",
        margin:"0"

    },
    paper: {
        border: "none"
        ,
        backgroundColor: "white",
        borderRadius: "5px",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        width: "80%",


        MozUserFocus: "none"
    },
    form: {
        width: "100%",
        display: 'flex',
        flexDirection: "column",

        border: "none"
    }
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
    // const delete_blog = () => {
    //     console.log(props.title);

    //     axios.delete("http://localhost:8000/blog/delete_blog", {

    //         headers: {
    //             token: localStorage.getItem("token"),

    //             title: props.title
    //         }
    //     }).then(result => {
    //         console.log(result);
    //         if (result.data === "success") {
    //             console.log(result);
    //             window.location.reload(false);

    //         }
    //     })

    // }

    return (
        <div>

            <Button
                onClick={handleOpen}

                variant="contained"
                color="primary"
                size="small"
                startIcon={<EditOutlinedIcon />}
            >
                edit
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


                            <h2 id="transition-modal-title">Edit Blog</h2>
                            <p id="transition-modal-description">{props.title}</p>


                            <EditBlogForm title={props.title} description={props.description}/>
                          


                            <br />

                            <Divider />
                            <br />
                            </div>

                    </div>
                </Fade>
            </Modal>
        </div>
    );
}