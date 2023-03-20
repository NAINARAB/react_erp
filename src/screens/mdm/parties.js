import React, { useState, useEffect } from "react";
import Header from "../../comp/header/header";
import Sidenav from "../../comp/sidenav/sidenav";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, IconButton, Box, Collapse, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import '../common.css';
import Loader from "../../comp/Load/loading";
import axios from "axios";

let count = 0;


function Butns() {
    return (
        <>
            <IconButton aria-label="expand row" size="small" sx={{ marginLeft: '0.5em' }}><EditIcon /></IconButton>
            <IconButton aria-label="expand row" size="small" sx={{ color: 'rgba(255, 0, 0, 0.755)', marginRight: '1em' }}><DeleteIcon /></IconButton>
        </>
    );
}

let PartyComp = (props) => {
    const { propobj } = props;
    const [open, setOpen] = useState(false);
    const [pk, setpk] = useState();
    const [delproname, setdelproname] = useState('');
    const [Dopen, setDOpen] = useState(false);

    const handleClickOpen = () => {
        setDOpen(true);
    };

    const handleClose = () => {
        setDOpen(false);
    };

    function doDelete() {
        deleteRow(pk);
    }

    const deleteRow = (pkobj) => {
        console.log(pkobj)
        let currentpk = pkobj;
        const deleterowurl = axios.create({
            baseURL: `https://erp-new-production.up.railway.app/api/get?model=parties&pk=${currentpk}`
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
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} hover='true' onClick={() => setOpen(!open)} key={count}>
                <TableCell align="center" component="th" scope="row">
                    {++count}
                </TableCell>
                <TableCell align="center">{propobj.party_name == null ? "Null" : propobj.party_name}</TableCell>
                <TableCell align="center">{propobj.party_type == null ? "Null" : propobj.party_type}</TableCell>
                <TableCell align="center">{propobj.party_contact_no == null ? "Null" : propobj.party_contact_no}</TableCell>
                <TableCell align="center">{propobj.party_contact_name == null ? "Null" : propobj.party_contact_name}</TableCell>
                <TableCell align="center">{propobj.party_email == null ? "Null" : propobj.party_email}</TableCell>
                <TableCell align="center">{propobj.party_GSTIN == null ? "Null" : propobj.party_GSTIN}</TableCell>
                <TableCell align="center">{propobj.party_address == null ? "Null" : propobj.party_address}</TableCell>
                <TableCell width={300} align="center">
                    <IconButton aria-label="expand" onClick={() => { setpk(propobj.pk); setdelproname(propobj.party_name); handleClickOpen(); }}
                        size="small" sx={{ color: 'rgba(255, 0, 0, 0.755)', marginRight: '1em' }}>
                        <DeleteIcon /></IconButton>
                    <IconButton
                        aria-label="expand"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon sx={{ fontSize: '2rem' }} /> : <KeyboardArrowDownIcon sx={{ fontSize: '2rem' }} />}
                    </IconButton>
                </TableCell>
            </TableRow>

            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 3 }}>
                            <TableContainer>
                                <Table size="small" sx={{ width: '50%', background: 'transparant' }}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center" sx={{ padding: '1em', fontWeight: 'bold', fontSize: '0.9rem', borderBottom: '0px solid transparent' }}>Country</TableCell>
                                            <TableCell align="center" sx={{ padding: '1em', fontWeight: 'bold', fontSize: '0.9rem', borderBottom: '0px solid transparent' }}>State</TableCell>
                                            <TableCell align="center" sx={{ padding: '1em', fontWeight: 'bold', fontSize: '0.9rem', borderBottom: '0px solid transparent' }}>Address</TableCell>
                                            <TableCell align="center" sx={{ padding: '1em', fontWeight: 'bold', fontSize: '0.9rem', borderBottom: '0px solid transparent' }}>Pin Code</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell align="center" sx={{ borderBottom: '0px solid transparent' }}>{propobj.party_country_get == null ? "Null" : propobj.party_country_get}</TableCell>
                                            <TableCell align="center" sx={{ borderBottom: '0px solid transparent' }}>{propobj.party_state == null ? "Null" : propobj.party_state}</TableCell>
                                            <TableCell align="center" sx={{ borderBottom: '0px solid transparent' }}>{propobj.party_address == null ? "Null" : propobj.party_address}</TableCell>
                                            <TableCell align="center" sx={{ borderBottom: '0px solid transparent' }}>{propobj.party_pincode == null ? "Null" : propobj.party_pincode}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
            <div>
                <Dialog
                    open={Dopen}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Do You Want To Delete ? "}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            <b style={{ color: 'black' }}>Party Name: &emsp;{delproname}</b>
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
        </React.Fragment>
    );
}


function Parties() {
    const [dispparties, setdispparties] = useState(false);
    const [partydata, setpartydata] = useState([]);
    const [partytypedat, setpartytypedat] = useState([]);
    const [countrydat, setcountrydat] = useState([]);
    const [statedat, setstatedat] = useState([]);

    useEffect(() => {

        fetch('https://erp-new-production.up.railway.app/api/get?model=parties')
            .then((res) => { return res.json(); })
            .then((resdata) => {
                setpartydata(resdata.data);
            })
        fetch('https://erp-new-production.up.railway.app/api/get?model=partytype')
            .then((res) => { return res.json(); })
            .then((data) => {
                setpartytypedat(data.data)
            })
        fetch('https://erp-new-production.up.railway.app/api/get?model=country')
            .then((res) => { return res.json(); })
            .then((data) => {
                setcountrydat(data.data);
            })
        fetch('https://erp-dwe8a.ondigitalocean.app/api/get?model=state')
            .then((res) => { return res.json(); })
            .then((data) => {
                setstatedat(data.data);
            })

    }, [])



    function AddParties() {

        const [partyname, setpartyname] = useState('');
        const [partycountry, setpartycountry] = useState();
        const [partytype, setpartytype] = useState('');
        const [partystate, setpartystate] = useState();
        const [partyaddress, setpartyaddress] = useState('');
        const [partypincode, setpartypincode] = useState('');
        const [partycontactno, setpartycontactno] = useState('');
        const [partycontactname, setpartycontactname] = useState('');
        const [partyemail, setpartyemail] = useState('');
        const [partygstin, setpartygstin] = useState('');

        const partypost = axios.create({
            baseURL: "https://erp-new-production.up.railway.app/api/get?model=parties"
        });

        const postParties = (nme, cntry, type, state, adres, pin, cntno, cntnme, emil, gst ) => {
            partypost.post('', {
                party_name : nme,
                party_country: cntry,
                party_type: type,
                party_state: state,
                party_address: adres,
                party_pincode: pin,
                party_contact_no : cntno,
                party_contact_name: cntnme,
                party_email: emil,
                party_gstin: gst
            })
                .then((res) => {
                    console.log("after then", res)
                    if (res.data.status === 'success') {
                        alert("Post Successfully");
                        console.log("Posted the data")
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
            postParties(partyname,partycountry,partytype,partystate, partyaddress, partypincode,
                 partycontactno, partycontactname, partyemail, partygstin);
                 window.location.reload();
        }


        return (
            <form>
                <div className="micard">
                    <h5 className="micardhdr">Add Parties</h5>
                    <div className="micardbdy row">

                        <div className="col-lg-4">
                            <label className="micardlble">Party Type</label><br />
                            <select className="micardinpt" onChange={(e) => { setpartytype(e.target.value) }}>
                                <option selected='true' disabled='true' value={''} >Select Type</option>
                                {partytypedat.map(prtobj => (
                                    <option>{prtobj.party_type}</option>
                                ))}
                            </select>
                        </div>

                        <div className="col-lg-4">
                            <label className="micardlble">Party Name</label><br />
                            <input className="micardinpt" onChange={(e) => { setpartyname(e.target.value) }} required />
                        </div>

                        <div className="col-lg-4">
                            <label className="micardlble">Contact No</label><br />
                            <input type='number' onChange={(e) => { setpartycontactno(e.target.value) }} className="micardinpt" />
                        </div>

                        <div className="col-lg-4">
                            <label className="micardlble">Contact Name</label><br />
                            <input className="micardinpt" onChange={(e) => { setpartycontactname(e.target.value) }} required />
                        </div>

                        <div className="col-lg-4">
                            <label className="micardlble">Email</label><br />
                            <input type='email' className="micardinpt" onChange={(e) => { setpartyemail(e.target.value) }} required />
                        </div>

                        <div className="col-lg-4">
                            <label className="micardlble">GSTIN</label><br />
                            <input type='number' className="micardinpt" onChange={(e) => { setpartygstin(e.target.value) }} required />
                        </div>


                        <div className="col-lg-4">
                            <label className="micardlble">Country</label><br />
                            <select className="micardinpt" onChange={(e) => { setpartycountry(e.target.value) }} required>
                                <option disabled={true} selected={true} value="">Select Country</option>
                                {countrydat.map(cntryobj => (
                                    <option value={cntryobj.pk}>{cntryobj.country_name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="col-lg-4">
                            <label className="micardlble">State</label><br />
                            <select className="micardinpt" onChange={(e) => { setpartystate(e.target.value) }} required>
                                <option value="" disabled={true} selected={true}>Select State</option>
                                {statedat.map(statobj => (
                                    <option value={statobj.pk}>{statobj.state_name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="col-lg-4">
                            <label className="micardlble">Address</label><br />
                            <input className="micardinpt" onChange={(e) => { setpartyaddress(e.target.value) }} required />
                        </div>

                        <div className="col-lg-4">
                            <label className="micardlble">Pin Code</label><br />
                            <input type='number' className="micardinpt" onChange={(e) => { setpartypincode(e.target.value) }} required />
                        </div>
                        <div className="col-lg-4"></div><div className="col-lg-4"></div>
                    </div>
                </div><br />
                <button className="comadbtn" type="submit" onClick={doPost}>Add</button>
                <button className="cancelbtn" onClick={() => {
                    setdispparties(false);
                    document.getElementById("prtyadbtn").style.display = 'block';
                }}>Back</button>
            </form>
        );
    }

    return (
        <>
            <div className="row" >
                <div className="col-lg-12">
                    <Header />
                </div>
                <div className="col-lg-2">
                    <Sidenav />
                </div>
                <div className="col-lg-10">
                    <div className="comhed">
                        <button className="comadbtn" id="prtyadbtn" onClick={() => {
                            setdispparties(<AddParties />);
                            document.getElementById("prtyadbtn").style.display = 'none';
                        }}>Add</button>
                        <h5>Parties</h5>
                        <h6>Master Data Management / Parties </h6>
                    </div>
                    <div className="tablepadding">
                        {dispparties === false ? <>
                            {partydata.length !== 0 ? <TableContainer component={Paper} sx={{ maxHeight: 640 }}>
                                <Table stickyHeader aria-label="collapsible table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={{ backgroundColor: 'rgb(15, 11, 42)', fontWeight: 'bold', color: 'white' }} align="center">S.No</TableCell>
                                            <TableCell sx={{ backgroundColor: 'rgb(15, 11, 42)', fontWeight: 'bold', color: 'white' }} align="center">Party Name</TableCell>
                                            <TableCell sx={{ backgroundColor: 'rgb(15, 11, 42)', fontWeight: 'bold', color: 'white' }} align="center">Party Type</TableCell>
                                            <TableCell sx={{ backgroundColor: 'rgb(15, 11, 42)', fontWeight: 'bold', color: 'white' }} align="center">Contact No</TableCell>
                                            <TableCell sx={{ backgroundColor: 'rgb(15, 11, 42)', fontWeight: 'bold', color: 'white' }} align="center">Contact Name</TableCell>
                                            <TableCell sx={{ backgroundColor: 'rgb(15, 11, 42)', fontWeight: 'bold', color: 'white' }} align="center">Email</TableCell>
                                            <TableCell sx={{ backgroundColor: 'rgb(15, 11, 42)', fontWeight: 'bold', color: 'white' }} align="center">GSTIN</TableCell>
                                            <TableCell sx={{ backgroundColor: 'rgb(15, 11, 42)', fontWeight: 'bold', color: 'white' }} align="center">Products</TableCell>
                                            <TableCell sx={{ backgroundColor: 'rgb(15, 11, 42)', fontWeight: 'bold', color: 'white' }} align="center">Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {partydata.map(propobject => (
                                            <PartyComp propobj={propobject} />
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer> : <Loader />} </> : <AddParties />}
                    </div>
                </div>
            </div>
        </>
    );
}


export default Parties;