import React, { useState, useEffect } from "react";
import Header from "../../comp/header/header";
import Sidenav from "../../comp/sidenav/sidenav";
import {
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Slide,
    IconButton, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import '../common.css';
import { maxWidth } from "@mui/system";
import Loader from "../../comp/Load/loading";
import axios from "axios";
import SearchIcon from '@mui/icons-material/Search';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function Butns() {
    return (
        <>
            <IconButton aria-label="expand row" size="small" sx={{ marginLeft: '0.5em' }}><EditIcon /></IconButton>

        </>
    );
}


let Devisioncomp = (props) => {
    const { devision } = props;
    const { deptdat } = props;
    let count = 0;
    const [pk, setpk] = useState();
    const [delproname, setdelproname] = useState('');
    const [open, setOpen] = useState(false);

    {/* update var */ }

    const [Uopen, setUopen] = useState(false);
    const [updtpk, setupdtpk] = useState();
    const [updep, setupdep] = useState();
    const [upnme, setupnme] = useState('');
    const [updepget, setupdepget] = useState('');

    const UhandleClickOpen = () => {
        setUopen(true);
    };

    const UhandleClose = () => {
        setUopen(false);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function doDelete() {
        deleteRow(pk);
    }

    const cntryupdt = axios.create({ //subdevision
        baseURL: `https://erp-test-3wqc9.ondigitalocean.app/api/get?model=subdivision&pk=${updtpk}`
    });
    console.log("Crnt updt PK", updtpk);

    const updtCountry = (dep, nme) => {
        cntryupdt.put('', {
            department: dep,
            name: nme
        })
            .then((res) => {
                console.log("Post After", res)
                if (res.data.status === 'success') {
                    alert('put success')
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

    let doPUT = (e) => {
        e.preventDefault();
        updtCountry(updep, upnme);
    }

    const deleteRow = (pkobj) => {
        let currentpk = pkobj;
        const deleterowurl = axios.create({ //subdevision
            baseURL: `https://erp-test-3wqc9.ondigitalocean.app/api/get?model=subdivision&pk=${currentpk}`
        });

        deleterowurl.delete('', {
        })
            .then((response) => {
                console.log("after then", response);
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
            })
    }
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
                            <TableRow hover={true}>
                                <TableCell>{++count}</TableCell>
                                <TableCell>{devdata.name}</TableCell>
                                <TableCell>{devdata.department_get}</TableCell>
                                <TableCell>
                                    <IconButton aria-label="expand row" size="small"
                                        onClick={() => {
                                            setupdtpk(devdata.pk); setupnme(devdata.name); setupdep(devdata.department);
                                            setupdepget(devdata.department_get); UhandleClickOpen();
                                        }}
                                    ><EditIcon /></IconButton>
                                    <IconButton aria-label="expand row" size="small"
                                        onClick={() => { setpk(devdata.pk); setdelproname(devdata.name); handleClickOpen(); }}
                                        sx={{ color: 'rgba(255, 0, 0, 0.755)' }}><DeleteIcon /></IconButton></TableCell>
                            </TableRow>
                        ))}

                    </TableBody>
                </Table>
            </TableContainer>
            : <Loader />}
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
                            <b style={{ color: 'black' }}>Devision Name: &emsp;{delproname}</b>
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
                        <h5>Update Division</h5>
                    </div>
                    <DialogTitle id="alert-dialog-title">
                        {"Row Details :  "}
                    </DialogTitle>
                    <DialogContent>

                        <div className="row">
                            <div className="col-lg-6 editscrn">
                                <label className="micardlble" >Division Name</label><br />
                                <input className="micardinpt" value={upnme} onChange={(e) => { setupnme(e.target.value) }} />
                            </div>

                            <div className="col-lg-6 editscrn">
                                <label className="micardlble" >Department</label><br />
                                <select className="micardinpt" onChange={(e) => { setupdep(e.target.value) }}>
                                    <option defaultValue={true} value={updep} required>{updepget}</option>
                                    {deptdat.map(deptobj => (
                                        <>
                                            <option value={deptobj.pk}>{deptobj.name}</option>
                                        </>
                                    ))}
                                </select>
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



function Devision() {
    const [dispDevision, setdispDevision] = useState(false);
    const [devisiondata, setdevisiondata] = useState([]);
    const [deptdat, setdeptdat] = useState([]);
    useEffect(() => {
        fetch('https://erp-test-3wqc9.ondigitalocean.app/api/get?model=subdivision')
            .then((res) => { return res.json(); })
            .then((data) => {
                setdevisiondata(data.data);
            })
        fetch('https://erp-test-3wqc9.ondigitalocean.app/api/get?model=department')
            .then((res) => { return res.json(); })
            .then((data) => {
                setdeptdat(data.data);
            })
    }, [])


    let AddDevision = () => {
        const [devisionname, setdevisionname] = useState('');
        const [departmentname, setdepartmentname] = useState('');


        const postdev = axios.create({
            baseURL: "https://erp-test-3wqc9.ondigitalocean.app/api/get?model=subdivision"
        });

        const postdevfun = (dep, rol) => {
            postdev.post('', {
                department: dep,
                name: rol
            })
                .then((res) => {
                    console.log("after then", res)
                    if (res.data.status === 'success') {
                        alert("Devision Added");
                        window.location.reload();
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


    const [searchdata, setsearchdata] = useState('');
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
                        {dispDevision == false ?
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
                        {dispDevision == false ? <Devisioncomp devision={devisiondata} deptdat={deptdat} /> : <AddDevision />}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Devision;