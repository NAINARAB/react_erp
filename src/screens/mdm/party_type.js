import React, { useState, useEffect } from "react";
import Header from "../../comp/header/header";
import Sidenav from "../../comp/sidenav/sidenav";
import {
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Slide,
    TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper, IconButton, Alert
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { maxWidth } from "@mui/system";
import Loader from "../../comp/Load/loading";
import SearchIcon from '@mui/icons-material/Search';
import axios from "axios";
import { Link } from "react-router-dom";




const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const Partytype = () => {

    const token = sessionStorage.getItem("token");
    const [disppartytypes, setdisppartytypes] = useState(false);
    const [partttypedata, setpartytypedata] = useState([]);
    const [searchdata, setsearchdata] = useState('');

    const [dispalr, setdispalr] = useState(false);
    const [alrstatus, setalrstatus] = useState(false);
    const [alrmes, setalrmes] = useState('');
    const [fet, setfet] = useState(false);
    const success = document.getElementById("suc");
    const failure = document.getElementById("fail");
    

    useEffect(() => {
        if(token != null){
            fetch('https://erp-tiarx.ondigitalocean.app/api/get?model=partytype',
            {
                headers: {
                    'Authorization': `token ${token}`
                }
            })
            .then((res) => { return res.json(); })
            .then((data) => {
                setpartytypedata(data.data)
            })    
        }
    }, [fet])

    const playsuccess = () => {
        success.play();
    }
    const playfailure = () => {
        failure.play();
    }


    const Alr = () => {
        return (
            <div className="alrt">
                <Alert severity={alrstatus === true ? "success" : "error"}
                    onClose={() => { setdispalr(false) }}>{alrmes}</Alert>
            </div>
        );
    }


    const PartyTypecomp = (props) => {
        const { PartyTypeRows } = props;
        let { searchdata } = props;
        let count = 0;
        const [pk, setpk] = useState();
        const [delproname, setdelproname] = useState('');
        const [open, setOpen] = useState(false);

        {/* Update Party Variables */ }

        const [Uopen, setUopen] = useState(false);
        const [updtpk, setupdtpk] = useState();
        const [updprttyp, setupdprttyp] = useState('');

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

        const prttypupdt = axios.create({ //partytype
            baseURL: `https://erp-tiarx.ondigitalocean.app/api/get?model=partytype&pk=${updtpk}`
        });

        const updtPartytype = (prttyp) => {
            prttypupdt.put('', {
                party_type: prttyp
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
            updtPartytype(updprttyp);
        }

        function doDelete() {
            deleteRow(pk);
        }

        const deleteRow = (pkobj) => {
            let currentpk = pkobj;
            const deleterowurl = axios.create({ //phase
                baseURL: `https://erp-tiarx.ondigitalocean.app/api/get?model=partytype&pk=${currentpk}`
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
                {PartyTypeRows.length != 0 ?

                    <div>
                        <TableContainer component={Paper} sx={{ maxHeight: 640 }}>
                            <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell variant="head" align="left" Width={120} sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white', fontWeight: 'bold' }}>S.No</TableCell>
                                        <TableCell variant="head" align="left" width={maxWidth} sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white', fontWeight: 'bold' }}>Party Type</TableCell>
                                        <TableCell variant="head" align="left" width={200} sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white', fontWeight: 'bold' }}>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {searchdata == '' ?
                                        <>
                                            {PartyTypeRows.map((ptr) => (
                                                <TableRow hover='true'>
                                                    <TableCell >{++count}</TableCell>
                                                    <TableCell>{ptr.party_type}</TableCell>
                                                    <TableCell align="left">
                                                        <IconButton aria-label="expand row" size="small"
                                                            onClick={() => { setupdtpk(ptr.pk); setupdprttyp(ptr.party_type); UhandleClickOpen(); }}
                                                        ><EditIcon /></IconButton>
                                                        <IconButton aria-label="expand row" size="small"
                                                            onClick={() => { setpk(ptr.pk); setdelproname(ptr.party_type); handleClickOpen(); }}
                                                            sx={{ color: 'rgba(255, 0, 0, 0.755)', marginRight: '1em' }}><DeleteIcon /></IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </>
                                        :
                                        <>
                                            {PartyTypeRows.map((ptr) => (
                                                <>
                                                    {(ptr.party_type.toLowerCase()).match(searchdata) == searchdata ?
                                                        <>
                                                            <TableRow hover='true'>
                                                                <TableCell >{++count}</TableCell>
                                                                <TableCell>{ptr.party_type}</TableCell>
                                                                <TableCell align="left">
                                                                    <IconButton aria-label="expand row" size="small"
                                                                        onClick={() => { setupdtpk(ptr.pk); setupdprttyp(ptr.party_type); UhandleClickOpen(); }}
                                                                    ><EditIcon /></IconButton>
                                                                    <IconButton aria-label="expand row" size="small"
                                                                        onClick={() => { setpk(ptr.pk); setdelproname(ptr.party_type); handleClickOpen(); }}
                                                                        sx={{ color: 'rgba(255, 0, 0, 0.755)', marginRight: '1em' }}><DeleteIcon /></IconButton>
                                                                </TableCell>
                                                            </TableRow>
                                                        </>
                                                        : null
                                                    }
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
                                <b style={{ color: 'black' }}> Party Type: &emsp;{delproname}</b>
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
                            <h5>Update Party Type</h5>
                        </div>
                        <DialogTitle id="alert-dialog-title">
                            {"Row Details :  "}
                        </DialogTitle>
                        <DialogContent>
                            <form onSubmit={doPUT}>
                                <div>
                                    <label className="micardlble" >Party Type</label><br />
                                    <input className="micardinpt" value={updprttyp} onChange={(e) => { setupdprttyp(e.target.value) }} required />
                                </div><br />
                                <button className="comadbtn" type={'submit'} style={{ marginBottom: 'unset' }}>Update</button>
                                <button className="cancelbtn" onClick={UhandleClose} >Discord</button>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
            </>
        );
    }


    const AddPartyType = () => {
        const [partyinpt, setpartyinpt] = useState('');
        const postprtytype = axios.create({
            baseURL: "https://erp-tiarx.ondigitalocean.app/api/get?model=partytype"
        });

        const postPT = (prty) => {
            postprtytype.post('', {
                party_type: prty
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
                        setalrmes("New Party-Type Added");
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
            postPT(partyinpt);
        }


        return (
            <>
                <form onSubmit={doPost}>
                    <div className="micard">
                        <h5 className="micardhdr">Add Party Type</h5>
                        <div className="micardbdy row">
                            <div className="col-lg-4">
                                <label className="micardlble" >Party Type</label><br />
                                <input className="micardinpt" onChange={(e) => { setpartyinpt(e.target.value) }} required />
                            </div><div className="col-lg-4"></div><div className="col-lg-4"></div>
                        </div>
                    </div><br />
                    <button className="comadbtn" type={'submit'}>Add</button>
                    <button className="cancelbtn" onClick={() => {
                        setdisppartytypes(false)
                    }} >Back</button>
                </form>
            </>
        );
    }
//https://studio.code.org/docs/ide/gamelab/expressions/playSound https://audio.code.org/win3.mp3

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
                    <Sidenav currentmodule={'Admin'} currentbutton={'Configuration'} currentpage={'Party Type'} />
                </div>
                <div className="col-lg-10">
                    <div>
                        <div className="comhed">
                            {disppartytypes == false ?
                                <button className="comadbtn" id='prtytypeadbtn' onClick={() => {
                                    setdisppartytypes(true);
                                }}>Add</button>
                                :
                                null
                            }
                            <h5>Party Type</h5>
                            <h6>Admin / Master Data Management / Party Type</h6>
                        </div>
                        <div className="tablepadding">
                            {token == null || token == '' ?
                                <h2>Please Login..&emsp; <Link to={'/'}>Login Page</Link></h2>
                                :
                                <>
                                    {disppartytypes === false ?
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
                                    {disppartytypes === false ? <PartyTypecomp PartyTypeRows={partttypedata} searchdata={searchdata} /> : <AddPartyType />}
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}


export default Partytype;