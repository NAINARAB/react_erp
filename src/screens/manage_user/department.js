import React, { useState, useEffect } from "react";
import Header from "../../comp/header/header";
import Sidenav from "../../comp/sidenav/sidenav";
import { TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper, IconButton } from "@mui/material";
import '../common.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { maxWidth } from "@mui/system";
import Loader from "../../comp/Load/loading";
import axios from "axios";


function Butns() {
    return (
        <>
            <IconButton aria-label="expand row" size="small" sx={{ marginLeft: '0.5em' }}><EditIcon /></IconButton>
            <IconButton aria-label="expand row" size="small" sx={{ color: 'rgba(255, 0, 0, 0.755)', marginRight: '1em' }}><DeleteIcon /></IconButton>
        </>
    );
}

let DepartmentComp = (props) => {
    const { deprt } = props;
    let count = 0;
    return (
        <>
            {deprt.length != 0 ?
                <TableContainer component={Paper} sx={{ maxHeight: 650 }}>
                    <Table stickyHeader aria-label="simple table">
                        <TableHead >
                            <TableRow>
                                <TableCell width={100} variant="head" sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white', fontWeight: 'bold' }}>S.No</TableCell>
                                <TableCell width={250} variant="head" sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white', fontWeight: 'bold' }}>Department Name</TableCell>
                                <TableCell variant="head" sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white', fontWeight: 'bold' }}>Role</TableCell>
                                <TableCell width={200} variant="head" sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white', fontWeight: 'bold' }}>Action</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {deprt.map((dept) => (
                                <TableRow hover='true'>
                                    <TableCell>{++count}</TableCell>
                                    <TableCell>{dept.name}</TableCell>
                                    <TableCell>{dept.role}</TableCell>
                                    <TableCell><Butns /></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer> : <Loader />}
        </>
    );
}

function Department() {
    const [dispdept, setdispdept] = useState(false);
    const [departmentdata, setdepartmentdata] = useState([]);

    useEffect(() => {
        fetch('https://erp-new-production.up.railway.app/api/get?model=department')
            .then((res) => { return res.json(); })
            .then((data) => {
                console.log(data.data);
                setdepartmentdata(data.data)
            })
    }, [])

    function AddDepartment() {
        const [deptname, setdeptname] = useState('');
        const [deptrole, setdeptrole] = useState('');
        const postdept = axios.create({
            baseURL: "https://erp-new-production.up.railway.app/api/get?model=department"
        });

        const postdeptfun = (depart,deptrl) => {
            postdept.post('', {
                name: depart,
                role: deptrl
            })
                .then((res) => {
                    console.log("after then", res)
                    if (res.data.status === 'success') {
                        alert("Department Added");
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
            postdeptfun(deptname,deptrole);
        }
        return (
            <>
                <form>
                    <div className="micard">
                        <h5 className="micardhdr">Add Department</h5>
                        <div className="micardbdy row">
                            <div className="col-lg-4">
                                <label className="micardlble" >Department Name</label><br />
                                <input className="micardinpt" onChange={(e) => { setdeptname(e.target.value) }} required />
                            </div>
                            <div className="col-lg-4">
                                <label className="micardlble" >Role</label><br />
                                <input className="micardinpt" onChange={(e) => { setdeptrole(e.target.value) }} required />
                            </div><div className="col-lg-4"></div>
                        </div>
                    </div><br />
                    <button className="comadbtn" onClick={doPost} type='submit'>Add</button>
                    <button className="cancelbtn" onClick={() => {
                        setdispdept(false)
                        document.getElementById("departmentadbtn").style.display = 'block';
                    }} >Back</button>
                </form>
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
                                setdispdept(true);
                                document.getElementById('departmentadbtn').style.display = 'none';
                            }} >Add</button>
                            <h5>Departments</h5>
                            <h6>Manage Users / Departments</h6>
                        </div>
                        <div className="tablepadding">
                            {dispdept == false ? <DepartmentComp deprt={departmentdata} /> : <AddDepartment />}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}



export default Department;