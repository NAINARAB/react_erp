import * as React from 'react';
import { useState, useEffect } from "react";
import './header.css';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import {
    Dialog, DialogActions, DialogContent, DialogContentText, Button, Slide, IconButton, Switch
} from "@mui/material";
import { useNavigate } from 'react-router-dom';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const Header = () => {
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const token = sessionStorage.getItem("token");
    const [crntusrnme, setcrntusrnme] = useState('');
    const [usrrol, setusrrol] = useState('');
    const navigate = useNavigate();

    const [che, setche] = useState(false);

    function openFullscreen() {
        let elem = document.documentElement;
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) { /* Safari */
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE11 */
            elem.msRequestFullscreen();
        }
    }
    function closeFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { /* Safari */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE11 */
            document.msExitFullscreen();
        }
    }

    function action() {
        if (che == false) {
            openFullscreen();
            setche(true);
        }
        if (che == true) {
            closeFullscreen();
            setche(false);
        }
    }

    useEffect(() => {
        if (token != null) {
            fetch('https://erp-test-3wqc9.ondigitalocean.app/api/profile/',
                {
                    headers: {
                        'Authorization': `token ${token}`
                    }
                })
                .then((res) => { return res.json(); })
                .then((data) => {
                    setcrntusrnme(data.data.name);
                    setusrrol(data.data.role_get);
                })
        }
    }, [])

    const handleClose = () => {
        setOpen(false);
    };
    const handleClose1 = () => {
        setOpen1(false);
    };

    return (
        <>
            <div>
                <div className='hed'>
                    <div className='hedpos'>
                        <IconButton onClick={() => setOpen1(true)}><NotificationsIcon sx={{ color: 'white' }} /></IconButton>
                        <IconButton onClick={() => setOpen(true)}><SettingsIcon sx={{ color: 'white' }} /></IconButton>
                    </div>
                </div>
            </div>
            <div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    TransitionComponent={Transition}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <div className="comhed">
                        <h5>Settings</h5>
                    </div>
                    {/* <DialogTitle id="alert-dialog-title">
                        {"Settings "}
                    </DialogTitle> */}
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            <div style={{ padding: '0 70px' }}>
                                <img className='avatar' src="https://cdn.pixabay.com/photo/2021/07/25/08/03/account-6491185_960_720.png" alt="user" />
                            </div>
                            <br />
                            <div>
                                <center><b>{crntusrnme} - <p style={{ display: 'unset' }}>{usrrol}</p></b></center>
                                <center>
                                    <h5>Full-Screen Mode &emsp;
                                        <Switch checked={che} onChange={action} />
                                    </h5>
                                </center>
                            </div><br />
                            <div style={{ fontSize: '12px' }}>
                                <center>Devloped By - RajNainaar (rajnainaar@gmail.com)</center>
                            </div>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button sx={{ fontFamily: 'prosans' }} onClick={() => setOpen(false)}>close</Button>
                        <Button sx={{ fontFamily: 'prosans', color: 'red' }} onClick={() => { sessionStorage.clear(); navigate('/'); }}>Logout</Button>
                    </DialogActions>
                </Dialog>
            </div>
            <div>
                <Dialog
                    open={open1}
                    onClose={handleClose1}
                    TransitionComponent={Transition}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <div className="comhed">
                        <h5>Notifications</h5>
                    </div>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">

                            <div>
                                <center style={{ fontWeight: "700", padding: '100px 70px' }}>NULL</center>
                            </div>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button sx={{ fontFamily: 'prosans' }} onClick={() => setOpen1(false)}>close</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </>
    );
}

export default Header;