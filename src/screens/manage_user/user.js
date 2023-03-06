import React, { useState } from "react";
import Header from "../../comp/header/header";
import Sidenav from "../../comp/sidenav/sidenav";
import { IconButton, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import '../common.css';


function createUserData(sno, name, email, phone, department, subdevision, role, action) {
    return { sno, name, email, phone, department, subdevision, role, action }
}

function Butns() {
    return (
        <>
            <IconButton aria-label="expand row" size="small" sx={{ marginLeft: '0.5em' }}><EditIcon /></IconButton>
            <IconButton aria-label="expand row" size="small" sx={{ color: 'rgba(255, 0, 0, 0.755)', marginRight: '1em' }}><DeleteIcon /></IconButton>
        </>
    );
}

const userData = [
    createUserData(1, 'Raj', 'raj@gmail.com', 1122334455, 'QA', 'QA2', 'Admin', <Butns />),
    createUserData(1, 'Raj', 'raj@gmail.com', 1122334455, 'QA', 'QA2', 'Admin', <Butns />),
    createUserData(1, 'Raj', 'raj@gmail.com', 1122334455, 'QA', 'QA2', 'Admin', <Butns />),
    createUserData(1, 'Raj', 'raj@gmail.com', 1122334455, 'QA', 'QA2', 'Admin', <Butns />),
    createUserData(1, 'Raj', 'raj@gmail.com', 1122334455, 'QA', 'QA2', 'Admin', <Butns />),
    createUserData(1, 'Raj', 'raj@gmail.com', 1122334455, 'QA', 'QA2', 'Admin', <Butns />),
    createUserData(1, 'Raj', 'raj@gmail.com', 1122334455, 'QA', 'QA2', 'Admin', <Butns />),
    createUserData(1, 'Raj', 'raj@gmail.com', 1122334455, 'QA', 'QA2', 'Admin', <Butns />),
    createUserData(1, 'Raj', 'raj@gmail.com', 1122334455, 'QA', 'QA2', 'Admin', <Butns />),
    createUserData(1, 'Raj', 'raj@gmail.com', 1122334455, 'QA', 'QA2', 'Admin', <Butns />),
]

let UserComp = () => {
    return (
        <>
            <TableContainer component={Paper} sx={{ maxHeight: 640 }}>
                <Table stickyHeader aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ backgroundColor: 'rgb(15, 11, 42)', fontWeight: 'bold', color: 'white' }}>S.No</TableCell>
                            <TableCell sx={{ backgroundColor: 'rgb(15, 11, 42)', fontWeight: 'bold', color: 'white' }}>Name</TableCell>
                            <TableCell sx={{ backgroundColor: 'rgb(15, 11, 42)', fontWeight: 'bold', color: 'white' }}>Email</TableCell>
                            <TableCell sx={{ backgroundColor: 'rgb(15, 11, 42)', fontWeight: 'bold', color: 'white' }}>Phone</TableCell>
                            <TableCell sx={{ backgroundColor: 'rgb(15, 11, 42)', fontWeight: 'bold', color: 'white' }}>Department</TableCell>
                            <TableCell sx={{ backgroundColor: 'rgb(15, 11, 42)', fontWeight: 'bold', color: 'white' }}>Sub Devision</TableCell>
                            <TableCell sx={{ backgroundColor: 'rgb(15, 11, 42)', fontWeight: 'bold', color: 'white' }}>Role</TableCell>
                            <TableCell sx={{ backgroundColor: 'rgb(15, 11, 42)', fontWeight: 'bold', color: 'white' }}>Action</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {userData.map((usr) => (
                            <TableRow hover='true'>
                                <TableCell>{usr.sno}</TableCell>
                                <TableCell>{usr.name}</TableCell>
                                <TableCell>{usr.email}</TableCell>
                                <TableCell>{usr.phone}</TableCell>
                                <TableCell>{usr.department}</TableCell>
                                <TableCell>{usr.subdevision}</TableCell>
                                <TableCell>{usr.role}</TableCell>
                                <TableCell>{usr.action}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}





function Users() {
    const [dispUser, setdispUser] = useState(<UserComp />);

    let AddUsers = () => {
        return (
            <>
                <div className="micard">
                    <h5 className="micardhdr">Add User</h5>
                    <div className="micardbdy row">
                        <div className="col-lg-4">
                            <label className="micardlble">User Name</label><br />
                            <input className="micardinpt" onChange={(e) => { }} required />
                        </div>
                        <div className="col-lg-4">
                            <label className="micardlble">Email</label><br />
                            <input className="micardinpt" onChange={(e) => { }} required />
                        </div>
                        <div className="col-lg-4">
                            <label className="micardlble">Phone</label><br />
                            <input className="micardinpt" onChange={(e) => { }} required />
                        </div>
                        <div className="col-lg-4">
                            <label className="micardlble">Department</label><br />
                            <select className="micardinpt" onChange={(e) => { }}>
                                <option selected='true' disabled='true' value={''} required>Select Department</option>
                                <option>QA</option>
                                <option>QA2</option>
                            </select>
                        </div>
                        <div className="col-lg-4">
                            <label className="micardlble">Devision</label><br />
                            <select className="micardinpt" onChange={(e) => {}}>
                                <option selected='true' disabled='true' value={''} required>Select Type</option>
                                <option>QA2</option>
                                <option>sample</option>
                            </select>
                        </div>
                        <div className="col-lg-4">
                            <label className="micardlble">User Role</label><br />
                            <select className="micardinpt" onChange={(e) => {  }}>
                                <option selected='true' disabled='true' value={''} required>Select Role</option>
                                <option>Admin</option>
                                <option>User</option>
                            </select>
                        </div>
                    </div>
                </div><br />
                    <button className="comadbtn">Add</button>
                    <button className="cancelbtn" onClick={() => {
                        setdispUser(<UserComp />)
                        document.getElementById("useradbtn").style.display = 'block';
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
                        <button className="comadbtn" id="useradbtn" onClick={() => {
                            setdispUser(<AddUsers />)
                            document.getElementById("useradbtn").style.display = 'none';
                        }}>Add</button>
                        <h5>Users</h5>
                        <h6>Manage Users / User </h6>
                    </div>
                    <div className="tablepadding">
                        {dispUser}
                    </div>
                </div>
            </div>
        </>
    );
}


export default Users;