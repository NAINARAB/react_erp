import React, { useState, useEffect, useCallback } from "react";
import Header from "../../comp/header/header";
import Sidenav from "../../comp/sidenav/sidenav";
import {
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Slide,
    TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper, IconButton
} from "@mui/material";
import { maxWidth } from "@mui/system";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Loader from "../../comp/Load/loading";
import axios from "axios";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


function Butns() {
    return (
        <>
            <IconButton aria-label="expand row" size="small" sx={{ marginLeft: '0.5em' }}><EditIcon /></IconButton>
            <IconButton aria-label="expand row" size="small" sx={{ color: 'rgba(255, 0, 0, 0.755)', marginRight: '1em' }}><DeleteIcon /></IconButton>
        </>
    );
}


let PhasesRowsComp = (props) => {
    let { arr } = props;
    let count = 0;
    const [pk, setpk] = useState();
    const [delproname, setdelproname] = useState('');
    const [open, setOpen] = useState(false);
    const [Uopen, setUopen] = useState(false);
    const [updtpk, setupdtpk] = useState();
    const [updtphase, setupdtphase] = useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const UhandleClickOpen = () => {
        setUopen(true);
    };

    const UhandleClose = () => {
        setUopen(false);
    };

    const cntryupdt = axios.create({ //phases
        baseURL: `https://erp-test-3wqc9.ondigitalocean.app/api/get?model=productionphase&pk=${updtpk}`
    });
    console.log("Crnt updt PK", updtpk);

    const updtCountry = (ph) => {
        cntryupdt.put('', {
            phase_name: ph
        })
            .then((res) => {
                console.log("Post After", res)
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

    let doPUT = (e) => {
        e.preventDefault();
        updtCountry(updtphase);
    }

    function doDelete() {
        deleteRow(pk);
    }

    const deleteRow = (pkobj) => {
        console.log(pkobj)
        let currentpk = pkobj;
        const deleterowurl = axios.create({ //phase
            baseURL: `https://erp-test-3wqc9.ondigitalocean.app/api/get?model=productionphase&pk=${currentpk}`
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
            {arr.length != 0 ?
                <div>
                    <TableContainer component={Paper} sx={{ maxHeight: 650 }}>
                        <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell variant="head" align="left" Width={120} sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white', fontWeight: 'bold' }}>S.No</TableCell>
                                    <TableCell variant="head" align="left" sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white', fontWeight: 'bold' }}>Phases</TableCell>
                                    <TableCell variant="head" align="right" width={200} sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white', fontWeight: 'bold',paddingRight:'3em' }}>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {arr.map((phrow) => (
                                    <TableRow hover={true} >
                                        <TableCell >{++count}</TableCell>
                                        <TableCell>{phrow.phase_name}</TableCell>
                                        <TableCell align="right">
                                            <IconButton aria-label="expand row" size="small"
                                                onClick={() => { setupdtpk(phrow.pk); setupdtphase(phrow.phase_name); UhandleClickOpen(); }}
                                            ><EditIcon /></IconButton>
                                            <IconButton aria-label="expand row" size="small" onClick={() => { setpk(phrow.pk); setdelproname(phrow.phase_name); handleClickOpen(); }}
                                                sx={{ color: 'rgba(255, 0, 0, 0.755)', marginRight: '1em' }}><DeleteIcon /></IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div> : <Loader />}
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
                            <b style={{ color: 'black' }}>Phase Name: &emsp;{delproname}</b>
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
            <div>
                <Dialog
                    open={Uopen}
                    onClose={UhandleClose}
                    TransitionComponent={Transition}
                >
                    <div className="comhed">
                        <h5>Update Phases</h5>
                    </div>
                    <DialogTitle id="alert-dialog-title">
                        {"Row Details :  "}
                    </DialogTitle>
                    <DialogContent>
                        <div>
                            <label className="micardlble" >Phase Name</label><br />
                            <input className="micardinpt" value={updtphase} onChange={(e) => { setupdtphase(e.target.value) }} required />
                        </div><br />
                        <button className="comadbtn" onClick={doPUT} style={{ marginBottom: 'unset' }}>Update</button>
                        <button className="cancelbtn" onClick={UhandleClose} >Discord</button>
                    </DialogContent>
                </Dialog><br />
            </div>
        </>
    );
}

function Phases() {
    const [phasedata, setphasedata] = useState([])
    useEffect(() => {
        fetch('https://erp-test-3wqc9.ondigitalocean.app/api/get?model=productionphase')
            .then((res) => { return res.json(); })
            .then((data) => {
                setphasedata(data.data)
            })
    }, [])
    const [dispPhases, setDispPhases] = useState(false);
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
                            <button className="comadbtn" id='phasadbtn'
                                onClick={() => {
                                    setDispPhases(true)
                                    document.getElementById('phasadbtn').style.display = 'none';
                                }}
                            >Add</button>
                            <h5>Phases</h5>
                            <h6>Master Data Management / Phases</h6>
                        </div>

                        <div className="tablepadding">
                            {dispPhases === false ? <PhasesRowsComp arr={phasedata} /> : <AddPhases />}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

    function AddPhases() {
        const [phase, setphase] = useState('');
        const postphase = axios.create({
            baseURL: "https://erp-test-3wqc9.ondigitalocean.app/api/get?model=productionphase"
        });

        const postphasefun = (producphase) => {
            postphase.post('', {
                phase_name: producphase
            })
                .then((res) => {
                    console.log("after then", res)
                    if (res.data.status === 'success') {
                        alert("Phase Added");
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
            postphasefun(phase);
        }

        return (
            <>
                <form>
                    <div className="micard">
                        <h5 className="micardhdr">Add Phases</h5>
                        <div className="micardbdy row">
                            <div className="col-lg-4">
                                <label className="micardlble" >Phases</label><br />
                                <input className="micardinpt" onChange={(e) => { setphase(e.target.value) }} required />
                            </div><div className="col-lg-4">{/* <- For Alignment -> */}</div><div className="col-lg-4"></div>
                        </div>
                    </div><br />
                    <button className="comadbtn" type="submit" onClick={doPost}>Add</button>
                    <button className="cancelbtn" onClick={() => {
                        setDispPhases(false)
                        document.getElementById('phasadbtn').style.display = 'block';
                    }} >Back</button>
                </form>
            </>
        );
    }
}



export default Phases;