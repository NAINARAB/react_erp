import React, { useState } from "react";
import Header from "../../comp/header/header";
import Sidenav from "../../comp/sidenav/sidenav";
import { TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper, IconButton } from "@mui/material";
import '../common.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { maxWidth } from "@mui/system";



function createDepartmentData(sno, departmentname, role, action) {
    return { sno, departmentname, role, action }
}

let Butns = () => {
    return (
        <>
            <IconButton aria-label="expand row" size="small" sx={{ color: 'rgba(255, 0, 0, 0.755)', backgroundColor: '#f2f2f2' }}><DeleteIcon /></IconButton>
            <IconButton aria-label="expand row" size="small" sx={{ backgroundColor: '#f2f2f2', marginLeft: '1em' }}><EditIcon /></IconButton>
        </>
    );
}



const Departmentrows = [
    createDepartmentData(1, 'Chennai', 'TamilNadu', <Butns />),
    createDepartmentData(1, 'Chennai', 'TamilNadu', <Butns />),
    createDepartmentData(1, 'Chennai', 'TamilNadu', <Butns />),
    createDepartmentData(1, 'Chennai', 'TamilNadu', <Butns />),
    createDepartmentData(1, 'Chennai', 'TamilNadu', <Butns />),
    createDepartmentData(1, 'Chennai', 'TamilNadu', <Butns />),
    createDepartmentData(1, 'Chennai', 'TamilNadu', <Butns />),
    createDepartmentData(1, 'Chennai', 'TamilNadu', <Butns />),
    createDepartmentData(1, 'Chennai', 'TamilNadu', <Butns />),
    createDepartmentData(1, 'Chennai', 'TamilNadu', <Butns />),
];


let DepartmentComp = () => {
    return (
        <>
            <TableContainer component={Paper} sx={{ maxHeight: 650 }}>
                <Table stickyHeader aria-label="simple table">
                    <TableHead >
                        <TableRow>
                            <TableCell width={100} variant="head" sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white' }}>S.No</TableCell>
                            <TableCell width={250} variant="head" sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white' }}>Department Name</TableCell>
                            <TableCell variant="head" sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white' }}>Role</TableCell>
                            <TableCell width={200} variant="head" sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white' }}>Action</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {Departmentrows.map((dept) => (
                            <TableRow hover='true'>
                                <TableCell>{dept.sno}</TableCell>
                                <TableCell>{dept.departmentname}</TableCell>
                                <TableCell>{dept.role}</TableCell>
                                <TableCell>{dept.action}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}





function Department() {
    const [dispdept, setdispdept] = useState(<DepartmentComp />);

    function AddDepartment() {
        return (
            <>
                <div className="micard">
                    <h5 className="micardhdr">Add Department</h5>
                    <div className="micardbdy row">
                        <div className="col-lg-4">
                            <label className="micardlble" >Product Name</label><br />
                            <input className="micardinpt" onChange={(e) => { }} required />
                        </div>
                        <div className="col-lg-4">
                            <label className="micardlble" >Product Name</label><br />
                            <input className="micardinpt" onChange={(e) => { }} required />
                        </div><div className="col-lg-4"></div>
                    </div>
                </div><br />
                <button className="comadbtn">Add</button>
                <button className="cancelbtn" onClick={() => {setdispdept(<DepartmentComp />)
                    document.getElementById("departmentadbtn").style.display = 'block';
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
                            <button className="comadbtn" id='departmentadbtn' onClick={() => {
                                setdispdept(<AddDepartment />);
                                document.getElementById('departmentadbtn').style.display = 'none';
                            }} >Add</button>
                            <h5>Departments</h5>
                            <h6>Manage Users / Departments</h6>
                        </div>
                        <div className="tablepadding">
                            {dispdept}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}



export default Department;