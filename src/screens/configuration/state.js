import React, { useState, useEffect, useCallback } from "react";
import Header from "../../comp/header/header";
import Sidenav from "../../comp/sidenav/sidenav";
import {
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Slide, Alert,
    TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper, IconButton
} from "@mui/material";
import { maxWidth } from "@mui/system";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Loader from "../../comp/Load/loading";
import SearchIcon from '@mui/icons-material/Search';
import axios from "axios";
import { Link } from "react-router-dom";


const State = () => {
    const [searchdata, setsearchdata] = useState('');
    const [dispState, setdispState] = useState(true);
    const [statedat, setstatedat] = useState([]);

    const token = sessionStorage.getItem("token");
    const [dispalr, setdispalr] = useState(false);
    const [alrstatus, setalrstatus] = useState(false);
    const [alrmes, setalrmes] = useState('');
    const [fet, setfet] = useState(false);
    const success = document.getElementById("suc");
    const failure = document.getElementById("fail");


    useEffect(() => {
        if(token != null){
            fetch('https://erp-tiarx.ondigitalocean.app/api/get?model=state',
            {
                headers: {
                    'Authorization': `token ${token}`
                }
            })
            .then((res) => { return res.json(); })
            .then((data) => {
                setstatedat(data.data)
            })
        } 
    }, [fet])


    const Alr = () => {
        return (
            <div className="alrt">
                <Alert severity={alrstatus === true ? "success" : "error"}
                    onClose={() => { setdispalr(false) }}>{alrmes}</Alert>
            </div>
        );
    }

    const playsuccess = () => {
        success.play();
    }
    const playfailure = () => {
        failure.play();
    }




    const StateTable = (props) => {
        let { searchdata } = props;
        let count = 0;
        const [deletepk, setdeletepk] = useState();
        const [upk, setupk] = useState();
        const [ustate, setustate] = useState('');
        const [deletestate, setdeletestate] = useState('');
        const [open, setOpen] = useState(false);


        const handleClickOpen = () => {
            setOpen(true);
        };

        const handleClose = () => {
            setOpen(false);
        };

        function doDelete() {
            deleteRow(deletepk);
        }

        const deleteRow = (pkobj) => {
            let currentpk = pkobj;
            const deleterowurl = axios.create({ //phase
                baseURL: `https://erp-tiarx.ondigitalocean.app/api/get?model=state&pk=${currentpk}`
            });

            deleterowurl.delete('',
                {
                    headers: {
                        'Authorization': `token ${token}`
                    }
                })
                .then((response) => {
                    setOpen(false);
                    setdispalr(true);
                    setalrstatus(true);
                    setalrmes('One Row Deleted!');
                    setfet(!fet);
                    playsuccess();
                })
                .catch((err) => {
                    console.log(err);
                })
        }
        return (
            <>
                {statedat.length != 0 ?
                    <>
                        <TableContainer component={Paper} sx={{ maxHeight: 650 }}>
                            <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell variant="head" align="left" Width={50} sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white', fontWeight: 'bold' }}>S.No</TableCell>
                                        <TableCell align="center" width={170} sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white', fontWeight: 'bold' }}>State Code</TableCell>
                                        <TableCell align="left" sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white', fontWeight: 'bold' }}>State Name</TableCell>
                                        <TableCell align="right" sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white', fontWeight: 'bold' }}>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {searchdata == '' ?
                                        <>
                                            {statedat.map(sob => (
                                                <>
                                                    <TableRow>
                                                        <TableCell>{++count}</TableCell>
                                                        <TableCell align="center">{sob.state_code}</TableCell>
                                                        <TableCell>{sob.state_name}</TableCell>

                                                        <TableCell align="right">
                                                            {/* <IconButton aria-label="expand row" size="small"
                                                            onClick={() => { setustate(sob.state_name); setupk(sob.pk);  }}
                                                        ><EditIcon /></IconButton> */}
                                                            <IconButton aria-label="expand row" size="small" onClick={() => {
                                                                setdeletepk(sob.pk); handleClickOpen(); setdeletestate(sob.state_name)
                                                            }}
                                                                sx={{ color: 'rgba(255, 0, 0, 0.755)' }}><DeleteIcon /></IconButton>
                                                        </TableCell>
                                                    </TableRow>
                                                </>
                                            ))}
                                        </>
                                        :
                                        <>
                                            {statedat.map(sob => (
                                                <>
                                                    {(sob.state_name.toLowerCase()).match(searchdata) == searchdata ||
                                                        (sob.state_code.toString()).match(searchdata) == searchdata ?
                                                        <TableRow>
                                                            <TableCell>{++count}</TableCell>
                                                            <TableCell>{sob.state_code}</TableCell>
                                                            <TableCell>{sob.state_name}</TableCell>
                                                            <TableCell align="right">
                                                                {/* <IconButton aria-label="expand row" size="small"
                                                                onClick={() => {  }}
                                                            ><EditIcon /></IconButton> */}
                                                                <IconButton aria-label="expand row" size="small" onClick={() => {
                                                                    setdeletepk(sob.pk); handleClickOpen(); setdeletestate(sob.state_name)
                                                                }}
                                                                    sx={{ color: 'rgba(255, 0, 0, 0.755)' }}><DeleteIcon /></IconButton>
                                                            </TableCell>
                                                        </TableRow>
                                                        :
                                                        null}
                                                </>
                                            ))}
                                        </>
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </>
                    : <Loader />}
                <div>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            {"Do You Want To Delete ? "}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                <b style={{ color: 'black' }}>State Name: &emsp;{deletestate}</b>
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button onClick={doDelete} autoFocus sx={{ color: 'red' }}>
                                Delete
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </>
        );
    }


    const AddState = (props) => {
        const { usnme } = props;
        const { uscod } = props;
        const { ubool } = props;
        const [ustatename, setustatename] = useState(usnme);
        const [ustatecode, setustatecode] = useState(uscod);
        const [statename, setstatename] = useState('');
        const [statecode, setstatecode] = useState();
        const poststate = axios.create({
            baseURL: "https://erp-tiarx.ondigitalocean.app/api/get?model=state"
        });

        const poststatefun = (sn, sc) => {
            poststate.post('', {
                state_name: sn,
                state_code: sc
            },
                {
                    headers: {
                        'Authorization': `token ${token}`
                    }
                })
                .then((res) => {
                    if (res.data.status === 'success') {
                        setdispalr(true);
                        setalrstatus(true);
                        setalrmes("New Country Added");
                        setfet(!fet);
                        playsuccess();
                    }
                    if (res.data.status === 'failure') {
                        setdispalr(true);
                        setalrstatus(false);
                        setalrmes(":( Failure Please Try Again..")
                        playfailure();
                    }

                }).catch((err) => {
                    console.log(err);
                })
        };
        const doPost = (e) => {
            e.preventDefault();
            poststatefun(statename, statecode);
        }
        return (
            <>
                <form onSubmit={doPost}>
                    <div className="micard">
                        <h5 className="micardhdr">Add State</h5>
                        <div className="micardbdy row">
                            <div className="col-lg-4">
                                <label className="micardlble" >State Name</label><br />
                                <input className="micardinpt" onChange={(e) => { setstatename(e.target.value); }} required />
                            </div>

                            <div className="col-lg-4">
                                <label className="micardlble" >State Code</label><br />
                                <input className="micardinpt" type={'number'} onChange={(e) => { setstatecode(e.target.value) }} required />
                            </div>

                        </div>
                    </div><br />
                    <button className="comadbtn" type="submit">Add</button>
                    <button className="cancelbtn" onClick={() => { window.location.reload() }} >Back</button>
                </form>
            </>
        );
    }



    return (
        <>
            <audio id="suc">
                <source src="https://drive.google.com/uc?export=download&id=1V_Caw86copGxXg6c9cn2xg2mxQOvEc83" type="audio/mp3" />
            </audio>
            <audio id="fail">
                <source src="https://drive.google.com/uc?export=download&id=1j41aa4YxNua9mihX-qb9p5X_hm2ZPDpJ" type="audio/mp3" />
            </audio>
            {dispalr == true ? <Alr /> : null}
            <div className="row">
                <div className="col-lg-12">
                    <Header />
                </div>
                <div className="col-lg-2">
                    <Sidenav currentmodule={'Admin'} currentbutton={'Configuration'} currentpage={'State'} />
                </div>
                <div className="col-lg-10">
                    <div>
                        <div className="comhed">
                            {dispState === true ? <button className="comadbtn" onClick={() => { setdispState(!dispState) }} >Add</button> : null}
                            <h5>State</h5>
                            <h6>Admin / Configuration / State</h6>
                        </div>

                        <div className="tablepadding">
                            {token == null || token == '' ?
                                <h2>Please Login..&emsp; <Link to={'/'}>Login Page</Link></h2>
                                :
                                <>
                                    {dispState === true ?
                                        <div className="search" style={{ marginBottom: 'unset' }}>
                                            <input type={'search'} className='micardinpt'
                                                placeholder="Search Here...."
                                                onChange={(e) => {
                                                    setsearchdata((e.target.value).toLowerCase());
                                                }} style={{ paddingLeft: '3em' }} />
                                            <div className="sIcon">
                                                <SearchIcon sx={{ fontSize: '2em' }} />
                                            </div>
                                        </div>
                                        : null}
                                    {dispState === true ? <StateTable searchdata={searchdata} /> : <AddState />}
                                </>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}



export default State;