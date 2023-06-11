import React, { useState, useEffect, useCallback } from "react";
import Header from "../../comp/header/header";
import Sidenav from "../../comp/sidenav/sidenav";
import {
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Slide,
    TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper, IconButton, Alert
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Loader from "../../comp/Load/loading";
import SearchIcon from '@mui/icons-material/Search';
import axios from "axios";
import { Link } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function Phases() {
    const [phasedata, setphasedata] = useState([]);
    const [dispPhases, setDispPhases] = useState(false);
    const [searchdata, setsearchdata] = useState('');

    const token = sessionStorage.getItem("token");
    const [dispalr, setdispalr] = useState(false);
    const [alrstatus, setalrstatus] = useState(false);
    const [alrmes, setalrmes] = useState('');
    const [fet, setfet] = useState(false);
    const success = document.getElementById("suc");
    const failure = document.getElementById("fail");

    useEffect(() => {
        if(token != null){
            fetch('https://erp-test-3wqc9.ondigitalocean.app/api/master-data-management?model=productionphase',
            {
                headers: {
                    'Authorization': `token ${token}`
                }
            })
            .then((res) => { return res.json(); })
            .then((data) => {
                setphasedata(data.data)
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

    const PhasesRowsComp = (props) => {
        let { arr } = props;
        let { searchdata } = props;
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
            baseURL: `https://erp-test-3wqc9.ondigitalocean.app/api/master-data-management?model=productionphase&pk=${updtpk}`
        });

        const updtCountry = (ph) => {
            cntryupdt.put('', {
                phase_name: ph
            },
                {
                    headers: {
                        'Authorization': `token ${token}`
                    }
                })
                .then((res) => {
                    if (res.data.status === 'success') {
                        setUopen(false);
                        setdispalr(true);
                        setalrstatus(true);
                        setalrmes("Changes Saved Successfully");
                        setfet(!fet);
                        playsuccess();
                    }
                    if (res.data.status === 'failure') {
                        setUopen(false);
                        setdispalr(true);
                        setalrstatus(false);
                        setalrmes(":( Failed to Save");
                        playfailure();
                    }

                }).catch((err) => {
                    console.log(err);
                })
        };

        const doPUT = (e) => {
            e.preventDefault();
            updtCountry(updtphase);
        }

        function doDelete() {
            deleteRow(pk);
        }

        const deleteRow = (pkobj) => {
            let currentpk = pkobj;
            const deleterowurl = axios.create({ //phase
                baseURL: `https://erp-test-3wqc9.ondigitalocean.app/api/master-data-management?model=productionphase&pk=${currentpk}`
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
                {arr.length != 0 ?
                    <div>
                        <TableContainer component={Paper} sx={{ maxHeight: 650 }}>
                            <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell variant="head" align="left" Width={120} sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white', fontWeight: 'bold' }}>S.No</TableCell>
                                        <TableCell variant="head" align="left" sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white', fontWeight: 'bold' }}>Phases</TableCell>
                                        <TableCell variant="head" align="right" width={200} sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white', fontWeight: 'bold', paddingRight: '3em' }}>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {searchdata == '' ?
                                        <>
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
                                        </>
                                        :
                                        <>
                                            {arr.map((phrow) => (
                                                <>
                                                    {(phrow.phase_name.toLowerCase()).match(searchdata) == searchdata ?
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
                                                        : null}
                                                </>
                                            ))}
                                        </>
                                    }
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
                            <form onSubmit={doPUT}>
                                <div>
                                    <label className="micardlble" >Phase Name</label><br />
                                    <input className="micardinpt" value={updtphase} onChange={(e) => { setupdtphase(e.target.value) }} required />
                                </div><br />
                                <button className="comadbtn" type="submit" style={{ marginBottom: 'unset' }}>Update</button>
                                <button className="cancelbtn" onClick={UhandleClose} >Discord</button>
                            </form>
                        </DialogContent>
                    </Dialog><br />
                </div>
            </>
        );
    }


    const AddPhases = () => {
        const [phase, setphase] = useState('');
        const postphase = axios.create({
            baseURL: "https://erp-test-3wqc9.ondigitalocean.app/api/master-data-management?model=productionphase"
        });

        const postphasefun = (producphase) => {
            postphase.post('', {
                phase_name: producphase
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
                        setalrmes("New Phase Added");
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
        let doPost = (e) => {
            e.preventDefault();
            postphasefun(phase);
        }

        return (
            <>
                <form onSubmit={doPost}>
                    <div className="micard">
                        <h5 className="micardhdr">Add Phases</h5>
                        <div className="micardbdy row">
                            <div className="col-lg-4">
                                <label className="micardlble" >Phases</label><br />
                                <input className="micardinpt" onChange={(e) => { setphase(e.target.value) }} required />
                            </div><div className="col-lg-4">{/* <- For Alignment -> */}</div><div className="col-lg-4"></div>
                        </div>
                    </div><br />
                    <button className="comadbtn" type="submit">Add</button>
                    <button className="cancelbtn" onClick={() => {
                        setDispPhases(false)
                        document.getElementById('phasadbtn').style.display = 'block';
                    }} >Back</button>
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
                    <Sidenav currentmodule={'Admin'} currentbutton={'Configuration'} currentpage={'Production Phases'} />
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
                            <h5>Production Phases</h5>
                            <h6>Admin / Master Data Management / Production Phases</h6>
                        </div>

                        <div className="tablepadding">
                            {token == null || token == '' ?
                                <h2>Please Login..&emsp; <Link to={'/'}>Login Page</Link></h2>
                                :
                                <>
                                    {dispPhases === false ?
                                        <>
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
                                        </> :
                                        null}
                                    {dispPhases === false ? <PhasesRowsComp arr={phasedata} searchdata={searchdata} /> : <AddPhases />}
                                </>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );


}



export default Phases;