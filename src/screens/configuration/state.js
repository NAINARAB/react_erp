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


const StateTable = (props) => {
    let { searchdata } = props;
    let count = 0;
    const [statedat, setstatedat] = useState([]);
    const [deletepk, setdeletepk] = useState();
    const [upk, setupk] = useState();
    const [ustate, setustate] = useState('');
    const [deletestate, setdeletestate] = useState('');
    const [open, setOpen] = useState(false);
    useEffect(() => {
        fetch('https://erp-test-3wqc9.ondigitalocean.app/api/get?model=state')
            .then((res) => { return res.json(); })
            .then((data) => {
                setstatedat(data.data)
            })
    }, [])

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
            baseURL: `https://erp-test-3wqc9.ondigitalocean.app/api/get?model=state&pk=${currentpk}`
        });

        deleterowurl.delete('', {
        })
            .then((response) => {
                console.log("after then", response);
                window.location.reload();
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
                                                            setdeletepk(sob.pk); handleClickOpen(); setdeletestate(sob.state_name) }}
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
                                                                setdeletepk(sob.pk); handleClickOpen();setdeletestate(sob.state_name) }}
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
    const {usnme} = props;
    const {uscod} = props;
    const {ubool} = props;
    const [ustatename, setustatename] = useState(usnme);
    const [ustatecode, setustatecode] = useState(uscod);
    const [statename, setstatename] = useState('');
    const [statecode, setstatecode] = useState();
    const poststate = axios.create({
        baseURL: "https://erp-test-3wqc9.ondigitalocean.app/api/get?model=state"
    });

    const poststatefun = (sn, sc) => {
        poststate.post('', {
            state_name: sn,
            state_code: sc
        })
            .then((res) => {
                console.log("after then", res)
                if (res.data.status === 'success') {
                    window.location.reload();
                }
                else {
                    if (res.data.status === 'failure') {
                        alert('Something Went Wrong Please Try Again...');
                    }
                }

            }).catch((err) => {
                console.log(err);
            })
    };
    let doPost = (e) => {
        e.preventDefault();
        poststatefun(statename, statecode);
    }
    return (
        <>
            <form>
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
                <button className="comadbtn" onClick={doPost}>Add</button>
                <button className="cancelbtn" onClick={() => { window.location.reload() }} >Back</button>
            </form>
        </>
    );
}


const State = () => {
    const [searchdata, setsearchdata] = useState('');
    const [dispState, setdispState] = useState(true);
    return (
        <>
            <div className="row">
                <div className="col-lg-12">
                    <Header />
                </div>
                <div className="col-lg-2">
                    <Sidenav />
                </div>
                <div className="col-lg-10">
                    <div>
                        <div className="comhed">
                            {dispState === true ? <button className="comadbtn" onClick={() => { setdispState(!dispState) }} >Add</button> : null}
                            <h5>State</h5>
                            <h6>Admin / Configuration / State</h6>
                        </div>

                        <div className="tablepadding">
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
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}



export default State;