import React, { useState, useEffect } from "react";
import Header from "../../comp/header/header";
import Sidenav from "../../comp/sidenav/sidenav";
import {
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Slide,
    TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper, IconButton, Alert
} from "@mui/material";
import '../common.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Loader from "../../comp/Load/loading";
import axios from "axios";
import SearchIcon from '@mui/icons-material/Search';
import { Link } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function Department() {
    const [dispalr, setdispalr] = useState(false);
    const [alrstatus, setalrstatus] = useState(false);
    const [alrmes, setalrmes] = useState('');
    const [dispdept, setdispdept] = useState(false);
    const [departmentdata, setdepartmentdata] = useState([]);

    const token = sessionStorage.getItem("token");
    const [fet, setfet] = useState(false);
    const success = document.getElementById("suc");
    const failure = document.getElementById("fail");

    useEffect(() => {
        if(token != null){
            fetch('https://erp-test-3wqc9.ondigitalocean.app/api/master-data-management?model=department',
            {
                headers: {
                    'Authorization': `token ${token}`
                }
            })
            .then((res) => { return res.json(); })
            .then((data) => {
                setdepartmentdata(data.data)
            })
        }
    }, [fet])

    const playsuccess = () => {
        success.play();
    }
    const playfailure = () => {
        failure.play();
    }


    const Alr = () => {
        return (
            <div className="alrt">
                <Alert severity={alrstatus === true ? "success" : "error"}
                    onClose={() => { setdispalr(false) }}>{alrmes}</Alert>
            </div>
        );
    }


    const DepartmentComp = (props) => {

        const { deprt } = props;
        let { searchdata } = props;
        let count = 0;
        const [pk, setpk] = useState();
        const [delproname, setdelproname] = useState('');
        const [open, setOpen] = useState(false);

        {/* Up variables */ }

        const [Uopen, setUopen] = useState(false);
        const [updtpk, setupdtpk] = useState();
        const [upnme, setupnme] = useState('');
        const [uprol, setuprol] = useState('');

        const UhandleClickOpen = () => {
            setUopen(true);
        };

        const UhandleClose = () => {
            setUopen(false);
        };

        const cntryupdt = axios.create({ //department
            baseURL: `https://erp-test-3wqc9.ondigitalocean.app/api/master-data-management?model=department&pk=${updtpk}`
        });

        const updtCountry = (nme, rol) => {
            cntryupdt.put('', {
                name: nme,
                role: rol
            },
                {
                    headers: {
                        'Authorization': `token ${token}`
                    }
                })
                .then((res) => {
                    if (res.data.status === 'success') {
                        setUopen(false);
                        setdispalr(true);
                        setalrstatus(true);
                        setalrmes("Changes Saved Successfully");
                        setfet(!fet);
                        playsuccess();
                    }
                    if (res.data.status === 'failure') {
                        setUopen(false);
                        setdispalr(true);
                        setalrstatus(false);
                        setalrmes(":( Failed to Save");
                        playfailure();
                    }

                }).catch((err) => {
                    console.log(err);
                })
        };

        let doPUT = (e) => {
            e.preventDefault();
            updtCountry(upnme, uprol);
        }


        const handleClickOpen = () => {
            setOpen(true);
        };

        const handleClose = () => {
            setOpen(false);
        };

        function doDelete() {
            deleteRow(pk);
        }

        const deleteRow = (pkobj) => {
            let currentpk = pkobj;
            const deleterowurl = axios.create({ //department
                baseURL: `https://erp-test-3wqc9.ondigitalocean.app/api/master-data-management?model=department&pk=${currentpk}`
            });

            deleterowurl.delete('',
                {
                    headers: {
                        'Authorization': `token ${token}`
                    }
                })
                .then((response) => {
                    setOpen(false);
                    setdispalr(true);
                    setalrstatus(true);
                    setalrmes('One Row Deleted!');
                    setfet(!fet);
                    playsuccess();
                })
                .catch((err) => {
                    console.log(err);
                })
        }
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
                                {searchdata == '' ?
                                    <>
                                        {deprt.map((dept) => (
                                            <TableRow hover='true'>
                                                <TableCell>{++count}</TableCell>
                                                <TableCell>{dept.name}</TableCell>
                                                <TableCell>{dept.role}</TableCell>
                                                <TableCell>
                                                    <IconButton aria-label="expand row" size="small"
                                                        onClick={() => {
                                                            setupdtpk(dept.pk); setupnme(dept.name); setuprol(dept.role);
                                                            UhandleClickOpen();
                                                        }}
                                                    ><EditIcon /></IconButton>
                                                    <IconButton aria-label="expand row" size="small"
                                                        onClick={() => { setpk(dept.pk); setdelproname(dept.name); handleClickOpen(); }}
                                                        sx={{ color: 'rgba(255, 0, 0, 0.755)', marginRight: '1em' }}><DeleteIcon /></IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </>
                                    :
                                    <>
                                        {deprt.map((dept) => (
                                            <>
                                                {(dept.name.toLowerCase()).match(searchdata) == searchdata || (dept.role.toLowerCase()).match(searchdata) == searchdata ?
                                                    <TableRow hover='true'>
                                                        <TableCell>{++count}</TableCell>
                                                        <TableCell>{dept.name}</TableCell>
                                                        <TableCell>{dept.role}</TableCell>
                                                        <TableCell>
                                                            <IconButton aria-label="expand row" size="small"
                                                                onClick={() => {
                                                                    setupdtpk(dept.pk); setupnme(dept.name); setuprol(dept.role);
                                                                    UhandleClickOpen();
                                                                }}
                                                            ><EditIcon /></IconButton>
                                                            <IconButton aria-label="expand row" size="small"
                                                                onClick={() => { setpk(dept.pk); setdelproname(dept.name); handleClickOpen(); }}
                                                                sx={{ color: 'rgba(255, 0, 0, 0.755)', marginRight: '1em' }}><DeleteIcon /></IconButton>
                                                        </TableCell>
                                                    </TableRow>
                                                    : null}
                                            </>
                                        ))}
                                    </>
                                }
                            </TableBody>
                        </Table>
                    </TableContainer> : <Loader />}
                <div>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            {"Do You Want To Delete ? "}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                <b style={{ color: 'black' }}>Department Name: &emsp;{delproname}</b>
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button onClick={doDelete} autoFocus sx={{ color: 'red' }}>
                                Delete
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
                <div>
                    <Dialog
                        open={Uopen}
                        onClose={UhandleClose}
                        TransitionComponent={Transition}
                    >
                        <div className="comhed">
                            <h5>Update Department</h5>
                        </div>
                        <DialogTitle id="alert-dialog-title">
                            {"Row Details :  "}
                        </DialogTitle>
                        <DialogContent>

                            <div className="row">
                                <div className="col-lg-6 editscrn">
                                    <label className="micardlble" >Department Name</label><br />
                                    <input className="micardinpt" value={upnme} onChange={(e) => { setupnme(e.target.value) }} />
                                </div>

                                <div className="col-lg-6 editscrn">
                                    <label className="micardlble" >Role</label><br />
                                    <input className="micardinpt" value={uprol} onChange={(e) => { setuprol(e.target.value) }} />
                                </div>

                            </div><br />
                            <button className="comadbtn" onClick={doPUT} style={{ marginBottom: 'unset' }}>Update</button>
                            <button className="cancelbtn" onClick={UhandleClose} >Discord</button>
                        </DialogContent>
                    </Dialog><br />
                </div>
            </>
        );
    }



    function AddDepartment() {
        const [deptname, setdeptname] = useState('');
        const [deptrole, setdeptrole] = useState('');
        const postdept = axios.create({
            baseURL: "https://erp-test-3wqc9.ondigitalocean.app/api/master-data-management?model=department"
        });

        const postdeptfun = (depart, deptrl) => {
            postdept.post('', {
                name: depart,
                role: deptrl
            },
                {
                    headers: {
                        'Authorization': `token ${token}`
                    }
                })
                .then((res) => {
                    if (res.data.status === 'success') {
                        setdispalr(true);
                        setalrstatus(true);
                        setalrmes("New Department Added");
                        setfet(!fet);
                        playsuccess();
                    }
                    if (res.data.status === 'failure') {
                        setdispalr(true);
                        setalrstatus(false);
                        setalrmes(":( Failure Please Try Again..");
                        playfailure();
                    }
                }).catch((err) => {
                    console.log(err);
                })
        };
        const doPost = (e) => {
            e.preventDefault();
            postdeptfun(deptname, deptrole);
        }
        return (
            <>
                <form onSubmit={doPost}>
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
                    <button className="comadbtn" type='submit'>Add</button>
                    <button className="cancelbtn" onClick={() => {
                        setdispdept(false)
                        document.getElementById("departmentadbtn").style.display = 'block';
                    }} >Back</button>
                </form>
            </>
        );
    }

    const [searchdata, setsearchdata] = useState('');

    return (
        <>
            <audio id="suc">
                <source src="https://drive.google.com/uc?export=download&id=1V_Caw86copGxXg6c9cn2xg2mxQOvEc83" type="audio/mp3" />
            </audio>
            <audio id="fail">
                <source src="https://drive.google.com/uc?export=download&id=1j41aa4YxNua9mihX-qb9p5X_hm2ZPDpJ" type="audio/mp3" />
            </audio>
            {dispalr == true ? <Alr /> : null}
            <div className="row">
                <div className="col-lg-12">
                    <Header />
                </div>
                <div className="col-lg-2">
                    <Sidenav currentmodule={'Admin'} currentbutton={'User Management'} currentpage={'Department'} />
                </div>
                <div className="col-lg-10">
                    <div>
                        <div className="comhed">
                            <button className="comadbtn" id='departmentadbtn' onClick={() => {
                                setdispdept(true);
                                document.getElementById('departmentadbtn').style.display = 'none';
                            }} >Add</button>
                            <h5>Departments</h5>
                            <h6>Admin / Manage Users / Departments</h6>
                        </div>
                        <div className="tablepadding">
                            {token == null || token == '' ?
                                <h2>Please Login..&emsp; <Link to={'/'}>Login Page</Link></h2>
                                :
                                <>
                                    {dispdept == false ?
                                        <div className="search" style={{ marginBottom: 'unset' }}>
                                            <input type={'search'} className='micardinpt'
                                                placeholder="Search Here...."
                                                onChange={(e) => {
                                                    setsearchdata((e.target.value).toLowerCase());
                                                }} style={{ paddingLeft: '3em' }} />
                                            <div className="sIcon">
                                                <SearchIcon sx={{ fontSize: '2em' }} />
                                            </div>
                                        </div>
                                        : null}
                                    {dispdept == false ? <DepartmentComp deprt={departmentdata} searchdata={searchdata} /> : <AddDepartment />}
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}



export default Department;