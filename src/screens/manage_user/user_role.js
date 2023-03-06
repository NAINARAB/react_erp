import React, { useState } from "react";
import Header from "../../comp/header/header";
import Sidenav from "../../comp/sidenav/sidenav";
import { IconButton, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import '../common.css';
import { maxWidth } from "@mui/system";

function createUserroleData(sno, role, department, action) {
    return { sno, role, department, action };
}

function Butns() {
    return (
        <>
            <IconButton aria-label="expand row" size="small" sx={{ marginLeft: '0.5em' }}><EditIcon /></IconButton>
            <IconButton aria-label="expand row" size="small" sx={{ color: 'rgba(255, 0, 0, 0.755)', marginRight: '1em' }}><DeleteIcon /></IconButton>
        </>
    );
}

const userroledata = [
    createUserroleData(1, "Manager", "Department", <Butns />),
    createUserroleData(1, "Manager", "Department", <Butns />),
    createUserroleData(1, "Manager", "Department", <Butns />),
    createUserroleData(1, "Manager", "Department", <Butns />),
    createUserroleData(1, "Manager", "Department", <Butns />),
    createUserroleData(1, "Manager", "Department", <Butns />),
    createUserroleData(1, "Manager", "Department", <Butns />),
    createUserroleData(1, "Manager", "Department", <Butns />),
    createUserroleData(1, "Manager", "Department", <Butns />),
    createUserroleData(1, "Manager", "Department", <Butns />),
]

let UserRoleComp = () => {
    return (
        <>
            <TableContainer component={Paper} sx={{ maxHeight: 640 }}>
                <Table stickyHeader aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell width={100} sx={{ backgroundColor: 'rgb(15, 11, 42)', fontWeight: 'bold', color: 'white' }}>S.No</TableCell>
                            <TableCell width={250} sx={{ backgroundColor: 'rgb(15, 11, 42)', fontWeight: 'bold', color: 'white' }}>Role</TableCell>
                            <TableCell width={maxWidth} sx={{ backgroundColor: 'rgb(15, 11, 42)', fontWeight: 'bold', color: 'white' }}>Department</TableCell>
                            <TableCell width={200} sx={{ backgroundColor: 'rgb(15, 11, 42)', fontWeight: 'bold', color: 'white' }}>Action</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {userroledata.map((urd) => (
                            <TableRow hover='true'>
                                <TableCell>{urd.sno}</TableCell>
                                <TableCell>{urd.role}</TableCell>
                                <TableCell>{urd.department}</TableCell>
                                <TableCell>{urd.action}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}


function Userrole() {

    const [dispUserRole, setUserRole] = useState(<UserRoleComp />)

    let AddUserRole = () => {
        return (
            <>
                <div className="micard">
                    <h5 className="micardhdr">Add User Role</h5>
                    <div className="micardbdy row">
                        <div className="col-lg-4">
                            <label className="micardlble">User Role</label><br />
                            <input className="micardinpt" onChange={(e) => { }} required />
                        </div>
                        <div className="col-lg-4">
                            <label className="micardlble">Department</label><br />
                            <select className="micardinpt" onChange={(e) => { }}>
                                <option selected='true' disabled='true' value={''} required>Select Department</option>
                                <option>QA</option>
                                <option>QA2</option>
                            </select>
                        </div><div className="col-lg-4"></div>
                    </div>
                </div><br />
                <button className="comadbtn">Add</button>
                <button className="cancelbtn" onClick={() => {
                    setUserRole(<UserRoleComp />)
                    document.getElementById("userroleadbtn").style.display = 'block';
                }} >Back</button>
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
                        <button className="comadbtn" id="userroleadbtn" onClick={() => {
                            setUserRole(<AddUserRole />);
                            document.getElementById("userroleadbtn").style.display = 'none';
                        }}>Add</button>
                        <h5>User Role</h5>
                        <h6>Manage Users / User Role </h6>
                    </div>
                    <div className="tablepadding">
                        {dispUserRole}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Userrole;