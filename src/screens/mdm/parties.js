import React, { useState } from "react";
import Header from "../../comp/header/header";
import Sidenav from "../../comp/sidenav/sidenav";
import { IconButton, Box, Collapse, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import '../common.css';


function createData(sno, party_name, party_type, contact_no, contact_name, email, gstin, products, action, country, state, address, pincode) {
    return { sno, party_name, party_type, contact_no, contact_name, email, gstin, products, action, country, state, address, pincode };
}


function Butns() {
    return (
        <>
            <IconButton aria-label="expand row" size="small" sx={{ marginLeft: '0.5em' }}><EditIcon /></IconButton>
            <IconButton aria-label="expand row" size="small" sx={{ color: 'rgba(255, 0, 0, 0.755)', marginRight: '1em' }}><DeleteIcon /></IconButton>
        </>
    );
}


function Row(props) {

    const { row } = props;
    const [open, setOpen] = React.useState(false);



    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} hover='true' onClick={() => setOpen(!open)}>
                <TableCell align="center" component="th" scope="row">
                    {row.sno}
                </TableCell>
                <TableCell align="center">{row.party_name}</TableCell>
                <TableCell align="center">{row.party_type}</TableCell>
                <TableCell align="center">{row.contact_no}</TableCell>
                <TableCell align="center">{row.contact_name}</TableCell>
                <TableCell align="center">{row.email}</TableCell>
                <TableCell align="center">{row.gstin}</TableCell>
                <TableCell align="center">{row.products}</TableCell>
                <TableCell width={300} align="center">{row.action}
                    <IconButton
                        aria-label="expand row"
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
                                            <TableCell align="center" sx={{ borderBottom: '0px solid transparent' }}>{row.country}</TableCell>
                                            <TableCell align="center" sx={{ borderBottom: '0px solid transparent' }}>{row.state}</TableCell>
                                            <TableCell align="center" sx={{ borderBottom: '0px solid transparent' }}>{row.address}</TableCell>
                                            <TableCell align="center" sx={{ borderBottom: '0px solid transparent' }}>{row.pincode}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}



const rows = [
    createData(1, 'NainarAB', 'Admin', 8383472927, 'NainarAB', 'karthick@123', 112222, 'Cooker', <Butns />, 'India', 'TamilNadu', '26/A Murugan Kovil Street', 625532),
    createData(1, 'NainarAB', 'Admin', 8383472927, 'NainarAB', 'karthick@123', 112222, 'Cooker', <Butns />, 'India', 'TamilNadu', '26/A Murugan Kovil Street', 625532),
    createData(1, 'NainarAB', 'Admin', 8383472927, 'NainarAB', 'karthick@123', 112222, 'Cooker', <Butns />, 'India', 'TamilNadu', '26/A Murugan Kovil Street', 625532),
    createData(1, 'NainarAB', 'Admin', 8383472927, 'NainarAB', 'karthick@123', 112222, 'Cooker', <Butns />, 'India', 'TamilNadu', '26/A Murugan Kovil Street', 625532),
    createData(1, 'NainarAB', 'Admin', 8383472927, 'NainarAB', 'karthick@123', 112222, 'Cooker', <Butns />, 'India', 'TamilNadu', '26/A Murugan Kovil Street', 625532),
];




function Parties() {

    let Prty = () => {
        return (
            <>
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
                            {rows.map((row) => (
                                <Row row={row} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </>
        );
    }


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
                    setdispparties(<Prty />);
                    document.getElementById("prtyadbtn").style.display = 'block';
                }}>Back</button>
            </>
        );
    }

    const [dispparties, setdispparties] = useState(<Prty />);

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
                    <div style={{padding:'0em 1em'}}>
                        <br />
                        {dispparties}
                    </div>
                </div>
            </div>
        </>
    );
}


export default Parties;