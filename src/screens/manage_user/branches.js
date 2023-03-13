import React, { useState, useEffect } from "react";
import Header from "../../comp/header/header";
import Sidenav from "../../comp/sidenav/sidenav";
import { TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper, IconButton } from "@mui/material";
import '../common.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Loader from "../../comp/Load/loading";
function Butns() {
    return (
        <>
            <IconButton aria-label="expand row" size="small" sx={{ marginLeft: '0.5em' }}><EditIcon /></IconButton>
            <IconButton aria-label="expand row" size="small" sx={{ color: 'rgba(255, 0, 0, 0.755)', marginRight: '1em' }}><DeleteIcon /></IconButton>
        </>
    );
}


let BranchesTble = (props) => {
    const { branch } = props;
    let count =0;
    return (
        <>
            {branch.length != 0 ? 
            <TableContainer component={Paper} sx={{ maxHeight: 650 }}>
            <Table stickyHeader aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell width={100} variant="head" sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white',fontWeight:'bold' }}>S.No</TableCell>
                        <TableCell variant="head" sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white',fontWeight:'bold' }}>City Name</TableCell>
                        <TableCell variant="head" sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white',fontWeight:'bold' }}>State</TableCell>
                        <TableCell variant="head" sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white',fontWeight:'bold' }}>Country</TableCell>
                        <TableCell variant="head" sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white',fontWeight:'bold' }}>Pin Code</TableCell>
                        <TableCell variant="head" sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white',fontWeight:'bold' }}>GST Number</TableCell>
                        <TableCell variant="head" sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white',fontWeight:'bold' }}>Action</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {branch.map((brs) => (
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} hover='true'>
                            <TableCell>{++count}</TableCell>
                            <TableCell>{brs.cityname}</TableCell>
                            <TableCell>{brs.state}</TableCell>
                            <TableCell>{brs.country_get}</TableCell>
                            <TableCell>{brs.pincode}</TableCell>
                            <TableCell>{brs.GST_Number}</TableCell>
                            <TableCell><Butns /></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer> : <Loader /> }
        </>
    );
}


function Branches() {
    const [dispbranch, setdispbranch] = useState(false);
    const [branchdata, setbranchdata] = useState([]);
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
                <button className="cancelbtn" onClick={() => { setdispbranch(false)
                    document.getElementById('branchadbtn').style.display ='block';
                }} >Back</button>
            </>
        );
    }

    useEffect(() => {
        fetch('https://erp-dwe8a.ondigitalocean.app/api/get?model=branch')
            .then((res) => { return res.json(); })
            .then((data) => {
                console.log(data.data);
                setbranchdata(data.data)
            })
    }, [])
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
                            <button className="comadbtn" id='branchadbtn' onClick={() => { setdispbranch(true)
                                document.getElementById('branchadbtn').style.display ='none';
                        }} >Add</button>
                            <h5>Branches</h5>
                            <h6>Manage Users / Branches</h6>
                        </div>
                        <div className="tablepadding">
                            {dispbranch == false ? <BranchesTble branch={branchdata} /> : <AddBranches />}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}



export default Branches;