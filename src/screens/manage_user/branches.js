import React, { useState } from "react";
import Header from "../../comp/header/header";
import Sidenav from "../../comp/sidenav/sidenav";
import { TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper, IconButton } from "@mui/material";
import '../common.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function createBranchesData(sno, cityname, state, country, pincode, gstnumber, action) {
    return { sno, cityname, state, country, pincode, gstnumber, action };
}

let Butns = () => {
    return (
        <>
            <IconButton aria-label="expand row" size="small" sx={{ color: 'rgba(255, 0, 0, 0.755)', backgroundColor: '#f2f2f2' }}><DeleteIcon /></IconButton>
            <IconButton aria-label="expand row" size="small" sx={{ backgroundColor: '#f2f2f2', marginLeft: '1em' }}><EditIcon /></IconButton>
        </>
    );
}

const Branchesrows = [
    createBranchesData(1, 'Madurai', 'Tamilnadu', 'India', 123456, 123456789012, <Butns />),
    createBranchesData(1, 'Madurai', 'Tamilnadu', 'India', 123456, 123456789012, <Butns />),
    createBranchesData(1, 'Madurai', 'Tamilnadu', 'India', 123456, 123456789012, <Butns />),
    createBranchesData(1, 'Madurai', 'Tamilnadu', 'India', 123456, 123456789012, <Butns />),
    createBranchesData(1, 'Madurai', 'Tamilnadu', 'India', 123456, 123456789012, <Butns />),
    createBranchesData(1, 'Madurai', 'Tamilnadu', 'India', 123456, 123456789012, <Butns />),
    createBranchesData(1, 'Madurai', 'Tamilnadu', 'India', 123456, 123456789012, <Butns />),
    createBranchesData(1, 'Madurai', 'Tamilnadu', 'India', 123456, 123456789012, <Butns />),
    createBranchesData(1, 'Madurai', 'Tamilnadu', 'India', 123456, 123456789012, <Butns />),
    createBranchesData(1, 'Madurai', 'Tamilnadu', 'India', 123456, 123456789012, <Butns />),
];



let BranchesTble = () => {
    return (
        <>
            <TableContainer component={Paper} sx={{ maxHeight: 650 }}>
                <Table stickyHeader aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell width={100} variant="head" sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white' }}>S.No</TableCell>
                            <TableCell variant="head" sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white' }}>City Name</TableCell>
                            <TableCell variant="head" sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white' }}>State</TableCell>
                            <TableCell variant="head" sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white' }}>Country</TableCell>
                            <TableCell variant="head" sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white' }}>Pin Code</TableCell>
                            <TableCell variant="head" sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white' }}>GST Number</TableCell>
                            <TableCell variant="head" sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white' }}>Action</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {Branchesrows.map((brs) => (
                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} hover='true'>
                                <TableCell>{brs.sno}</TableCell>
                                <TableCell>{brs.cityname}</TableCell>
                                <TableCell>{brs.state}</TableCell>
                                <TableCell>{brs.country}</TableCell>
                                <TableCell>{brs.pincode}</TableCell>
                                <TableCell>{brs.gstnumber}</TableCell>
                                <TableCell>{brs.action}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}





function Branches() {
    const [dispbranch, setdispbranch] = useState(<BranchesTble />);

    function AddBranches() {
        return (
            <>
                <div className="micard">
                    <h5 className="micardhdr" >Add Branches</h5>

                    <div className="micardbdy row">
                        <div className="col-lg-4">
                            <label className="micardlble" >City Name</label><br />
                            <input className="micardinpt" onChange={(e) => { }} required />
                        </div>

                        <div className="col-lg-4">
                            <label className="micardlble" >State</label><br />
                            <input className="micardinpt" onChange={(e) => { }} required />
                        </div>

                        <div className="col-lg-4">
                            <label className="micardlble" >Country</label><br />
                            <select className="micardinpt" onChange={(e) => { }}>
                                <option selected='true' disabled='true' value={''} required>Select Country</option>
                                <option>India</option>
                                <option>USA</option>
                            </select>
                        </div>

                        <div className="col-lg-4">
                            <label className="micardlble" >Pin code</label><br />
                            <input type='number' className="micardinpt" onChange={(e) => { }} required />
                        </div>

                        <div className="col-lg-4">
                            <label className="micardlble" >GST Number</label><br />
                            <input type='number' className="micardinpt" onChange={(e) => { }} required />
                        </div><div className="col-lg-4"></div>
                    </div>
                </div><br />
                <button className="comadbtn">Add</button>
                <button className="cancelbtn" onClick={() => { setdispbranch(<BranchesTble />)
                    document.getElementById('branchadbtn').style.display ='block';
                }} >Back</button>
            </>
        );
    }
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
                            <button className="comadbtn" id='branchadbtn' onClick={() => { setdispbranch(<AddBranches />)
                                document.getElementById('branchadbtn').style.display ='none';
                        }} >Add</button>
                            <h5>Branches</h5>
                            <h6>Manage Users / Branches</h6>
                        </div>
                        <div className="tablepadding">
                            {dispbranch}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}



export default Branches;