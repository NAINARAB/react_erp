import React, { useState, useEffect } from "react";
import Header from "../../comp/header/header";
import Sidenav from "../../comp/sidenav/sidenav";
import { IconButton, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import '../common.css';
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


let Devisioncomp = (props) => {
    const { devision } = props;
    let count = 0;
    return (
        <> {devision.length != 0 ?
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
                        {devision.map((devdata) => (
                            <TableRow hover='true'>
                                <TableCell>{++count}</TableCell>
                                <TableCell>{devdata.name}</TableCell>
                                <TableCell>{devdata.department_get}</TableCell>
                                <TableCell><Butns /></TableCell>
                            </TableRow>
                        ))}

                    </TableBody>
                </Table>
            </TableContainer>
            : <Loader />}
        </>
    );
}



function Devision() {
    const [dispDevision, setdispDevision] = useState(false);
    const [devisiondata, setdevisiondata] = useState([]);
    useEffect(() => {
        fetch('https://erp-dwe8a.ondigitalocean.app/api/get?model=subdivision')
            .then((res) => { return res.json(); })
            .then((data) => {
                console.log(data.data);
                setdevisiondata(data.data)
            })
    }, [])

    let AddDevision = () => {
        const [devisionname, setdevisionname] = useState('');
        const [departmentname, setdepartmentname] = useState('');
        const [deptdat, setdeptdat] = useState([]);

        useEffect(() => {
            fetch('https://erp-dwe8a.ondigitalocean.app/api/get?model=department')
                .then((res) => { return res.json(); })
                .then((data) => {
                    setdeptdat(data.data);
                })
        }, [])

        const postdev = axios.create({
            baseURL: "https://erp-dwe8a.ondigitalocean.app/api/get?model=subdivision"
        });

        const postdevfun = (dep,rol) => {
            postdev.post('', {
                department: dep,
                name: rol
            })
                .then((res) => {
                    console.log("after then", res)
                    if (res.data.status === 'success') {
                        alert("Devision Added");
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
            postdevfun(departmentname, devisionname);
        }
        return (
            <>
                <form>
                    <div className="micard">
                        <h5 className="micardhdr">Add Devision</h5>
                        <div className="micardbdy row">
                            <div className="col-lg-4">
                                <label className="micardlble">Devision Name</label><br />
                                <input className="micardinpt" onChange={(e) => { setdevisionname(e.target.value) }} required />
                            </div>
                            <div className="col-lg-4">
                                <label className="micardlble">Department Name</label><br />
                                <select className="micardinpt" onChange={(e) => { setdepartmentname(e.target.value) }} required >
                                    <option selected='true' disabled='true' value={''} required>Select Department</option>
                                    {deptdat.map(deptobj => (
                                        <>
                                            <option value={deptobj.pk}>{deptobj.name}</option>
                                        </>
                                    ))}
                                </select>
                            </div><div className="col-lg-4"></div>
                        </div>
                    </div><br />
                    <button className="comadbtn" onClick={doPost}>Add</button>
                    <button className="cancelbtn" onClick={() => {
                        setdispDevision(false);
                        document.getElementById("devisionadbtn").style.display = 'block';
                    }}>Back</button>
                </form>
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
                            setdispDevision(true)
                            document.getElementById("devisionadbtn").style.display = 'none';
                        }}>Add</button>
                        <h5>Devision</h5>
                        <h6>Manage Users / Devision </h6>
                    </div>
                    <div className="tablepadding">
                        {dispDevision == false ? <Devisioncomp devision={devisiondata} /> : <AddDevision />}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Devision;