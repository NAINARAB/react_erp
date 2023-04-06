import React, { useState, useEffect } from "react";
import Header from "../../comp/header/header";
import Sidenav from "../../comp/sidenav/sidenav";
import {
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Slide,
    TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper, IconButton
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { maxWidth } from "@mui/system";
import Loader from "../../comp/Load/loading";
import SearchIcon from '@mui/icons-material/Search';
import axios from "axios";

const token = sessionStorage.getItem("token");

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


let PartyTypecomp = (props) => {
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
        baseURL: `https://erp-test-3wqc9.ondigitalocean.app/api/get?model=partytype&pk=${updtpk}`
    });
    console.log("Crnt updt PK", updtpk);

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
        updtPartytype(updprttyp);
    }

    function doDelete() {
        deleteRow(pk);
    }

    const deleteRow = (pkobj) => {
        console.log(pkobj)
        let currentpk = pkobj;
        const deleterowurl = axios.create({ //phase
            baseURL: `https://erp-test-3wqc9.ondigitalocean.app/api/get?model=partytype&pk=${currentpk}`
        });

        deleterowurl.delete('', {
        },
        {
            headers: {
                'Authorization': `token ${token}`
            }
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
                        <div>
                            <label className="micardlble" >Party Type</label><br />
                            <input className="micardinpt" value={updprttyp} onChange={(e) => { setupdprttyp(e.target.value) }} required />
                        </div><br />
                        <button className="comadbtn" onClick={doPUT} style={{ marginBottom: 'unset' }}>Update</button>
                        <button className="cancelbtn" onClick={UhandleClose} >Discord</button>
                    </DialogContent>
                </Dialog>
            </div>
        </>
    );
}



function Partytype() {

    const [disppartytypes, setdisppartytypes] = useState(false);
    const [partttypedata, setpartytypedata] = useState([]);

    useEffect(() => {
        fetch('https://erp-test-3wqc9.ondigitalocean.app/api/get?model=partytype',
        {
            headers: {
                'Authorization': `token ${token}`
            }
        })
            .then((res) => { return res.json(); })
            .then((data) => {
                setpartytypedata(data.data)
            })

    }, [])


    let AddPartyType = () => {
        const [partyinpt, setpartyinpt] = useState('');
        const postprtytype = axios.create({
            baseURL: "https://erp-test-3wqc9.ondigitalocean.app/api/get?model=partytype"
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
            postPT(partyinpt);
        }


        return (
            <>
                <form>
                    <div className="micard">
                        <h5 className="micardhdr">Add Party Type</h5>
                        <div className="micardbdy row">
                            <div className="col-lg-4">
                                <label className="micardlble" >Party Type</label><br />
                                <input className="micardinpt" onChange={(e) => { setpartyinpt(e.target.value) }} required />
                            </div><div className="col-lg-4"></div><div className="col-lg-4"></div>
                        </div>
                    </div><br />
                    <button className="comadbtn" onClick={doPost}>Add</button>
                    <button className="cancelbtn" onClick={() => {
                        setdisppartytypes(false)
                        document.getElementById('prtytypeadbtn').style.display = 'block';
                    }} >Back</button>
                </form>
            </>
        );
    }


    const [searchdata, setsearchdata] = useState('');

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
                            <button className="comadbtn" id='prtytypeadbtn' onClick={() => {
                                setdisppartytypes(true)
                                document.getElementById('prtytypeadbtn').style.display = 'none';
                            }}>Add</button>
                            <h5>Party Type</h5>
                            <h6>Master Data Management / Party Type</h6>
                        </div>
                        <div className="tablepadding">
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
                            {disppartytypes === false ? <PartyTypecomp PartyTypeRows={partttypedata} searchdata={searchdata} /> : <AddPartyType />}
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}


export default Partytype;