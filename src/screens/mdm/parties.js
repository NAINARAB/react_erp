import React, { useState, useEffect } from "react";
import Header from "../../comp/header/header";
import Sidenav from "../../comp/sidenav/sidenav";
import { IconButton, Box, Collapse, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import '../common.css';


function Butns() {
    return (
        <>
            <IconButton aria-label="expand row" size="small" sx={{ marginLeft: '0.5em' }}><EditIcon /></IconButton>
            <IconButton aria-label="expand row" size="small" sx={{ color: 'rgba(255, 0, 0, 0.755)', marginRight: '1em' }}><DeleteIcon /></IconButton>
        </>
    );
}


function Parties() {
    const [dispparties, setdispparties] = useState();
    const [partydata, setpartydata] = useState([]);

    useEffect(() => {

        fetch('https://erp-dwe8a.ondigitalocean.app/api/get?model=parties')
            .then((res) => { return res.json(); })
            .then((resdata) => {
                setpartydata(resdata.data);
                console.log(resdata.data);
                console.log("partyday",partydata.map(ob => (ob.party_name)))
            })

    }, [])



    function AddParties() {
        return (
            <>
                <div className="micard">
                    <h5 className="micardhdr">Add Parties</h5>
                    <div className="micardbdy row">
                        <div className="col-lg-4">
                            <label className="micardlble">Party Name</label><br />
                            <input className="micardinpt" onChange={(e) => { }} required />
                        </div>

                        <div className="col-lg-4">
                            <label className="micardlble">Party Type</label><br />
                            <select className="micardinpt" onChange={(e) => { }}>
                                <option selected='true' disabled='true' value={''} required>Select Type</option>
                                <option>Admin</option>
                                <option>Consumer</option>
                            </select>
                        </div>

                        <div className="col-lg-4">
                            <label className="micardlble">Contact No</label><br />
                            <select className="micardgrpinpt" onChange={(e) => { }} >
                                <option selected='true'>+91</option>
                            </select>
                            <input type='number' onChange={(e) => { }} className="micardgrpinpt1" />
                        </div>

                        <div className="col-lg-4">
                            <label className="micardlble">Contact Name</label><br />
                            <input className="micardinpt" onChange={(e) => { }} required />
                        </div>

                        <div className="col-lg-4">
                            <label className="micardlble">Email</label><br />
                            <input type='email' className="micardinpt" onChange={(e) => { }} required />
                        </div>

                        <div className="col-lg-4">
                            <label className="micardlble">GSTIN</label><br />
                            <input type='number' className="micardinpt" onChange={(e) => { }} required />
                        </div>


                        <div className="col-lg-4">
                            <label className="micardlble">Country</label><br />
                            <input className="micardinpt" onChange={(e) => { }} required />
                        </div>

                        <div className="col-lg-4">
                            <label className="micardlble">State</label><br />
                            <input className="micardinpt" onChange={(e) => { }} required />
                        </div>

                        <div className="col-lg-4">
                            <label className="micardlble">Address</label><br />
                            <input className="micardinpt" onChange={(e) => { }} required />
                        </div>

                        <div className="col-lg-4">
                            <label className="micardlble">Pin Code</label><br />
                            <input type='number' className="micardinpt" onChange={(e) => { }} required />
                        </div>
                        <div className="col-lg-4"></div><div className="col-lg-4"></div>
                    </div>
                </div><br />
                <button className="comadbtn">Add</button>
                <button className="cancelbtn" onClick={() => {
                    setdispparties();
                    document.getElementById("prtyadbtn").style.display = 'block';
                }}>Back</button>
            </>
        );
    }
    const [open, setOpen] = useState(false);
    let count = 0;
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
                    <div style={{ padding: '0em 1em' }}>
                        <br />
                        {partydata.length != 0 ?
                            <TableContainer component={Paper} sx={{ maxHeight: 640 }}>
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
                                        {partydata.map((propobj) => () => {
                                            return (
                                                <>
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
                                                            <TableCell align="center">{propobj.party_gstin == null ? "Null" : propobj.party_gstin}</TableCell>
                                                            <TableCell align="center">{propobj.party_address == null ? "Null" : propobj.party_address}</TableCell>
                                                            <TableCell width={300} align="center">
                                                                <IconButton
                                                                    aria-label="expand row"
                                                                    size="small"
                                                                    onClick={() => setOpen(!open)}
                                                                >
                                                                    {open ? <KeyboardArrowUpIcon sx={{ fontSize: '2rem' }} /> : <KeyboardArrowDownIcon sx={{ fontSize: '2rem' }} />}
                                                                </IconButton>
                                                            </TableCell>
                                                        </TableRow>

                                                        {/* <TableRow>
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
                                                        </TableRow> */}
                                                    </React.Fragment>
                                                </>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer> : "Looking for data... "}
                    </div>
                </div>
            </div>
        </>
    );
}


export default Parties;