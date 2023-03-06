import React, { useState } from "react";
import Header from "../../comp/header/header";
import Sidenav from "../../comp/sidenav/sidenav";
import { IconButton, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import '../common.css';
import { maxWidth } from "@mui/system";


function createDevisionData(sno, devision, department, action) {
    return { sno, devision, department, action }
}

function Butns() {
    return (
        <>
            <IconButton aria-label="expand row" size="small" sx={{ marginLeft: '0.5em' }}><EditIcon /></IconButton>
            <IconButton aria-label="expand row" size="small" sx={{ color: 'rgba(255, 0, 0, 0.755)', marginRight: '1em' }}><DeleteIcon /></IconButton>
        </>
    );
}

const devisionData = [
    createDevisionData(1, "Chennai", "TamilNadu", <Butns />),
    createDevisionData(1, "Chennai", "TamilNadu", <Butns />),
    createDevisionData(1, "Chennai", "TamilNadu", <Butns />),
    createDevisionData(1, "Chennai", "TamilNadu", <Butns />),
    createDevisionData(1, "Chennai", "TamilNadu", <Butns />),
    createDevisionData(1, "Chennai", "TamilNadu", <Butns />),
    createDevisionData(1, "Chennai", "TamilNadu", <Butns />),
    createDevisionData(1, "Chennai", "TamilNadu", <Butns />),
    createDevisionData(1, "Chennai", "TamilNadu", <Butns />),
]


let Devisioncomp = () => {
    return (
        <TableContainer component={Paper} sx={{ maxHeight: 640 }}>
            <Table stickyHeader aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell width={100} sx={{ backgroundColor: 'rgb(15, 11, 42)', fontWeight: 'bold', color: 'white' }}>S.No</TableCell>
                        <TableCell width={250} sx={{ backgroundColor: 'rgb(15, 11, 42)', fontWeight: 'bold', color: 'white' }}>Devision</TableCell>
                        <TableCell width={maxWidth} sx={{ backgroundColor: 'rgb(15, 11, 42)', fontWeight: 'bold', color: 'white' }}>Department</TableCell>
                        <TableCell width={200} sx={{ backgroundColor: 'rgb(15, 11, 42)', fontWeight: 'bold', color: 'white' }}>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {devisionData.map((devdata) => (
                        <TableRow hover='true'>
                            <TableCell>{devdata.sno}</TableCell>
                            <TableCell>{devdata.devision}</TableCell>
                            <TableCell>{devdata.department}</TableCell>
                            <TableCell>{devdata.action}</TableCell>
                        </TableRow>
                    ))}

                </TableBody>
            </Table>
        </TableContainer>
    );
}



function Devision() {
    const [dispDevision, setdispDevision] = useState(<Devisioncomp />);

    let AddDevision = () => {
        return (
            <>
                <div className="micard">
                    <h5 className="micardhdr">Add Devision</h5>
                    <div className="micardbdy row">
                        <div className="col-lg-4">
                            <label className="micardlble">Devision Name</label><br />
                            <input className="micardinpt" onChange={(e) => { }} required />
                        </div>
                        <div className="col-lg-4">
                            <label className="micardlble">Department Name</label><br />
                            <input className="micardinpt" onChange={(e) => { }} required />
                        </div><div className="col-lg-4"></div>
                    </div>
                </div><br />
                <button className="comadbtn">Add</button>
                <button className="cancelbtn" onClick={() => {
                    setdispDevision(<Devisioncomp />);
                    document.getElementById("devisionadbtn").style.display = 'block';
                }}>Back</button>
            </>
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
                        <button className="comadbtn" id="devisionadbtn" onClick={() => {
                            setdispDevision(<AddDevision />)
                            document.getElementById("devisionadbtn").style.display = 'none';
                        }}>Add</button>
                        <h5>Devision</h5>
                        <h6>Manage Users / Devision </h6>
                    </div>
                    <div className="tablepadding">
                        {dispDevision}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Devision;