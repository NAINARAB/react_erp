import React, { useState, useEffect } from "react";
import Header from "../../comp/header/header";
import Sidenav from "../../comp/sidenav/sidenav";
import { IconButton, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import '../common.css';
import Loader from "../../comp/Load/loading";

function Butns() {
    return (
        <>
            <IconButton aria-label="expand row" size="small" sx={{ marginLeft: '0.5em' }}><EditIcon /></IconButton>
            <IconButton aria-label="expand row" size="small" sx={{ color: 'rgba(255, 0, 0, 0.755)', marginRight: '1em' }}><DeleteIcon /></IconButton>
        </>
    );
}


let UserComp = (props) => {
    const {users} = props;
    let count =0;
    return (
        <>
            {users.length != 0 ? <TableContainer component={Paper} sx={{ maxHeight: 640 }}>
                <Table stickyHeader aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ backgroundColor: 'rgb(15, 11, 42)', fontWeight: 'bold', color: 'white' }}>S.No</TableCell>
                            <TableCell sx={{ backgroundColor: 'rgb(15, 11, 42)', fontWeight: 'bold', color: 'white' }}>Employee ID</TableCell>
                            <TableCell sx={{ backgroundColor: 'rgb(15, 11, 42)', fontWeight: 'bold', color: 'white' }}>Name</TableCell>
                            <TableCell sx={{ backgroundColor: 'rgb(15, 11, 42)', fontWeight: 'bold', color: 'white' }}>Email</TableCell>
                            <TableCell sx={{ backgroundColor: 'rgb(15, 11, 42)', fontWeight: 'bold', color: 'white' }}>Phone</TableCell>
                            <TableCell sx={{ backgroundColor: 'rgb(15, 11, 42)', fontWeight: 'bold', color: 'white' }}>Role</TableCell>
                            <TableCell sx={{ backgroundColor: 'rgb(15, 11, 42)', fontWeight: 'bold', color: 'white' }}>Branch</TableCell>
                            <TableCell sx={{ backgroundColor: 'rgb(15, 11, 42)', fontWeight: 'bold', color: 'white' }}>Action</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {users.map((usr) => (
                            <TableRow hover='true'>
                                <TableCell>{++count}</TableCell>
                                <TableCell>{usr.employee_id != null ? usr.employee_id : "Null"}</TableCell>
                                <TableCell>{usr.name != null ? usr.name : "Null"}</TableCell>
                                <TableCell>{usr.email != null ? usr.email : "Null"}</TableCell>
                                <TableCell>{usr.phone != null ? usr.phone : "Null"}</TableCell>
                                <TableCell>{usr.role_get != null ? usr.role_get : "Null"}</TableCell>
                                <TableCell>{usr.branch != null ? usr.branch : "Null"}</TableCell>
                                <TableCell><Butns /></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer> : <Loader />}
        </>
    );
}





function Users() {
    const [dispUser, setdispUser] = useState(false);
    const [usersdata, setusersdata ] = useState([]);

    useEffect(() => {
        fetch('https://erp-dwe8a.ondigitalocean.app/api/get?model=user')
            .then((res) => { return res.json(); })
            .then((data) => {
                console.log(data.data);
                setusersdata(data.data)
            })
    }, [])

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
                        setdispUser(false)
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
                            setdispUser(true);
                            document.getElementById("useradbtn").style.display = 'none';
                        }}>Add</button>
                        <h5>Users</h5>
                        <h6>Manage Users / User </h6>
                    </div>
                    <div className="tablepadding">
                        {dispUser == false ? <UserComp users={usersdata} /> : <AddUsers />}
                    </div>
                </div>
            </div>
        </>
    );
}


export default Users;