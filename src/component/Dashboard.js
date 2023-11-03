import { Button, Typography } from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from 'react-materialize';
import Notification from "./Edit";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
    TextField,
    Switch,
    Dialog,
    DialogTitle,
    DialogContent,
    FormControlLabel,
    DialogContentText,
    Alert,
    AlertTitle,
    DialogActions,
} from "@mui/material";
import { setDefaultEventParameters } from "firebase/analytics";
import { SettingsOutlined } from "@mui/icons-material";

export default function Dashboard () {

    const [open, setOpen] = useState( false );
    const handleClose = () => {
        setOpen( false );
    };
    const baseURL = `https://6336fad05327df4c43cd921b.mockapi.io/PE_FER201m`;
    const formik = useFormik( {
        initialValues: {
            title: "",
            img: "",
            description: "",
            content: 0,
            status: "",
            views: "",
            actractive: "",
        },

        onSubmit: ( values ) => {
            setOpen( true );
        }
    } );

    ////////////////////////////////////////////////////////////////////////////////////////////
    const [APIData, setAPIData] = useState( [] );
    const [title, setTitle] = useState( "" );
    const [description, setDescription] = useState( "" );
    const [content, setContent] = useState( "" );
    const [status, setStatus] = useState( false );
    const [views, setViews] = useState( "" );
    const [actractive, setActractive] = useState( false );
    const [img, setImg] = useState( "" );
    const [id, setId] = useState( null );
    const baseUrl = `https://6336fad05327df4c43cd921b.mockapi.io/PE_FER201m`;
    const [buttonPopup, setButtonPopup] = useState( false );
    function getUsers () {
        fetch( baseUrl ).then( ( result ) => {
            result.json().then( ( resp ) => {
                setAPIData( resp );
                setTitle( resp[0].title );
                setImg( resp[0].img );
                setDescription( resp[0].description );
                setContent( resp[0].content );
                setStatus( resp[0].status );
                setViews( resp[0].views );
                setActractive( resp[0].actractive );
                setId( resp[0].id );
            } );
        } );
    }
    useEffect( () => {
        getUsers();
    }, [] );

    function deleteUser ( id ) {
        fetch( `https://6336fad05327df4c43cd921b.mockapi.io/PE_FER201m/${id}`, {
            method: 'DELETE'
        } ).then( ( result ) => {
            result.json().then( ( resp ) => {
                console.warn( resp );
                getUsers();
            } );
        } );
    }

    function selectUser ( id ) {
        console.warn( "function called", APIData[id - 1] );
        let item = APIData[id - 1];
        setTitle( item.title );
        setImg( item.img );
        setDescription( item.description );
        setContent( item.content );
        setStatus( item.status );
        setViews( item.views );
        setActractive( item.actractive );
        setId( item.id );
    }
    function updateUser () {
        let item = { title, description, content, img, status, views, actractive };
        console.warn( "item", item );
        fetch( `https://6336fad05327df4c43cd921b.mockapi.io/PE_FER201m${id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify( item )
        } ).then( ( result ) => {
            result.json().then( ( resp ) => {
                console.warn( resp );
                getUsers();
            } );
        } );
    }

    function buttonpop () {
        setButtonPopup( true );
    }
    function buttonclose () {
        setButtonPopup( false );
    }


    return (
        <div className="Dashboard_main">
            <div className="add_post">
                <div className="addc">
                    <h1>Dashboard DataBase</h1>
                </div>
                <Typography className="Dashboard_add">
                    <Link to='/add' style={{ textDecoration: "none" }} className="Dashboard_adda">
                        <Icon>add_circle_outline</Icon> Add data
                    </Link>
                </Typography>

            </div>
            <div className="head_tab">
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Title</th>
                            <th>Img</th>
                            <th>Description</th>
                            <th>Content</th>
                            <th>Views</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {APIData.map( ( data ) => (
                            <tr>
                                <td>{data.id}</td>
                                <td>{data.title}</td>
                                <td><img src={data.img} /></td>
                                <td>{data.description}</td>
                                <td>{data.content}</td>
                                <td>{String( data.views )}</td>
                                <td>
                                    <button onClick={
                                        function buttona () {
                                            selectUser( data.id );
                                            buttonpop();
                                        }
                                    }
                                        style={{ marginBottom: '10px' }}
                                    >
                                        <Icon left >edit</Icon>
                                    </button>

                                    <button onClick={() => deleteUser( data.id )}>
                                        <Icon left >remove</Icon>
                                    </button>
                                </td>
                            </tr>
                        ) )}
                    </tbody>
                </table>






                {/*------------------------------------------------------------------------- PopUp Zone ---------------------------------------------------------------------*/}
                <Notification trigger={buttonPopup} setTrigger={setButtonPopup}>
                    <div>
                        <div className='Add_info'>
                            <form onSubmit={formik.handleSubmit} className='Add_info'>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    name="title"
                                    label="Title"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    value={title}
                                    onChange={( e ) => { setTitle( e.target.value ); }}
                                />

                                <TextField
                                    autoFocus
                                    margin="dense"
                                    name="description"
                                    label="Description"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    value={description}
                                    onChange={( e ) => { setDescription( e.target.value ); }}
                                />

                                <TextField
                                    autoFocus
                                    margin="dense"
                                    name="content"
                                    label="Content"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    value={content}
                                    onChange={( e ) => { setContent( e.target.value ); }}
                                />

                                <TextField
                                    margin="dense"
                                    name="img"
                                    label="URL of image"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    value={img}
                                    onChange={( e ) => { setImg( e.target.value ); }}
                                />
                                <TextField
                                    margin="dense"
                                    name="views"
                                    label="Views"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    value={views}
                                    onChange={( e ) => { setViews( e.target.value ); }}
                                />
                                <FormControlLabel
                                    control={<Switch />}
                                    label="Status"
                                    name="status"
                                    value={formik.values.views}
                                    onChange={formik.handleChange}
                                />
                                <FormControlLabel
                                    control={<Switch />}
                                    label="Attractive"
                                    name="Attractive"
                                    value={formik.values.views}
                                    onChange={formik.handleChange}
                                />
                                <br />
                                <Button variant="contained" size="medium" className='Add_button' type="submit"
                                    onClick={updateUser}
                                >
                                    <p className='Add_buttonc'>Edit</p>
                                </Button>

                                <Dialog
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                >
                                    <DialogTitle id="alert-dialog-title">
                                        {"Congraturation"}
                                    </DialogTitle>
                                    <DialogContent>
                                        <DialogContentText id="alert-dialog-description">
                                            <Alert severity="success">
                                                <AlertTitle>Edit successful!</AlertTitle>
                                            </Alert>
                                        </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button autoFocus onClick={
                                            function buttonb () {
                                                handleClose();
                                                buttonclose();
                                            }
                                        }>
                                            Close
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </form>
                        </div>
                    </div>
                </Notification>
            </div>
        </div>
    );
}