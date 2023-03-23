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

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function Butns() {
    return (
        <>
            <IconButton aria-label="expand row" size="small" sx={{ marginLeft: '0.5em' }}><EditIcon /></IconButton>
            <IconButton aria-label="expand row" size="small" sx={{ color: 'rgba(255, 0, 0, 0.755)', marginRight: '1em' }}><DeleteIcon /></IconButton>
        </>
    );
}


let UserRoleComp = (props) => {
    const { userrole } = props;
    const { devisiondata } = props;
    const { deptdat } = props;
    let count = 0;
    const [pk, setpk] = useState();
    const [delproname, setdelproname] = useState('');
    const [open, setOpen] = useState(false);

    {/* up var */ }
    const [Uopen, setUopen] = useState(false);
    const [updtpk, setupdtpk] = useState();
    const [uprol, setuprol] = useState('');
    const [updep, setupdep] = useState();
    const [updepget, setupdepget] = useState('');
    const [updiv, setupdiv] = useState();
    const [updivget, setupdivget] = useState('');

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

    const urolupdt = axios.create({
        baseURL: `https://erp-new-production.up.railway.app/api/get?model=userrole&pk=${updtpk}`
    });


    const updtuRole = (rol, dep, div) => {
        urolupdt.put('', {
            role: rol,
            department: dep,
            division: div
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
        updtuRole(uprol, updep, updiv);
    }

    const deleteRow = (pkobj) => {
        let currentpk = pkobj;
        const deleterowurl = axios.create({ //userrole
            baseURL: `https://erp-new-production.up.railway.app/api/get?model=userrole&pk=${currentpk}`
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
        <>
            {userrole.length != 0 ? <TableContainer component={Paper} sx={{ maxHeight: 640 }}>
                <Table stickyHeader aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell width={100} sx={{ backgroundColor: 'rgb(15, 11, 42)', fontWeight: 'bold', color: 'white' }}>S.No</TableCell>
                            <TableCell width={150} sx={{ backgroundColor: 'rgb(15, 11, 42)', fontWeight: 'bold', color: 'white' }}>Role</TableCell>
                            <TableCell sx={{ backgroundColor: 'rgb(15, 11, 42)', fontWeight: 'bold', color: 'white' }}>Department</TableCell>
                            <TableCell sx={{ backgroundColor: 'rgb(15, 11, 42)', fontWeight: 'bold', color: 'white' }}>Devision</TableCell>
                            <TableCell align="center" width={200} sx={{ backgroundColor: 'rgb(15, 11, 42)', fontWeight: 'bold', color: 'white' }}>Action</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {userrole.map((urd) => (
                            <TableRow hover='true'>
                                <TableCell>{++count}</TableCell>
                                <TableCell>{urd.role != null ? urd.role : "Null"}</TableCell>
                                <TableCell>{urd.department_get != null ? urd.department_get : "Null"}</TableCell>
                                <TableCell>{urd.division_get != null ? urd.division_get : "Null"}</TableCell>
                                <TableCell align="center">
                                    <IconButton aria-label="expand row" size="small"
                                        onClick={() => {
                                            setupdtpk(urd.pk); setuprol(urd.role); setupdep(urd.department); setupdepget(urd.department_get);
                                            setupdiv(urd.division); setupdivget(urd.division_get); UhandleClickOpen();
                                        }}
                                    ><EditIcon /></IconButton>
                                    <IconButton aria-label="expand row" size="small"
                                        onClick={() => { setpk(urd.pk); setdelproname(urd.role); handleClickOpen(); }}
                                        sx={{ color: 'rgba(255, 0, 0, 0.755)', marginRight: '1em' }}>
                                        <DeleteIcon /></IconButton></TableCell>
                            </TableRow>
                        ))}
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
                            <b style={{ color: 'black' }}>User Role : &emsp;{delproname}</b>
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
                        <h5>Update User Role</h5>
                    </div>
                    <DialogTitle id="alert-dialog-title">
                        {"Row Details :  "}
                    </DialogTitle>
                    <DialogContent>

                        <div className="row">
                            <div className="col-lg-6 editscrn">
                                <label className="micardlble" >Role</label><br />
                                <input className="micardinpt" value={uprol} onChange={(e) => { setuprol(e.target.value) }} />
                            </div>

                            <div className="col-lg-6 editscrn">
                                <label className="micardlble" >Department Name</label><br />
                                <select className="micardinpt" onChange={(e) => { setupdep(e.target.value) }}>
                                    <option defaultValue={true} value={updep} required>{updepget}</option>
                                    {deptdat.map(deptobj => (
                                        <>
                                            <option value={deptobj.pk}>{deptobj.name}</option>
                                        </>
                                    ))}
                                </select>
                            </div>

                            <div className="col-lg-6 editscrn">
                                <label className="micardlble" >Devision Name</label><br />
                                <select className="micardinpt" onChange={(e) => { setupdiv(e.target.value) }} >
                                    <option defaultValue={true} value={updep}>{updepget}</option>
                                    {devisiondata.map(devobj => (
                                        <>
                                            <option value={devobj.pk}>{devobj.name}</option>
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


function Userrole() {

    const [dispUserRole, setUserRole] = useState(false);
    const [userroledata, setuserroledata] = useState([]);
    const [deptdat, setdeptdat] = useState([]);
    const [devisiondata, setdevisiondata] = useState([]);
    useEffect(() => {
        fetch('https://erp-new-production.up.railway.app/api/get?model=department')
            .then((res) => { return res.json(); })
            .then((data) => {
                setdeptdat(data.data);
            })
        fetch('https://erp-new-production.up.railway.app/api/get?model=subdivision')
            .then((res) => { return res.json(); })
            .then((data) => {
                setdevisiondata(data.data)
            })
        fetch('https://erp-new-production.up.railway.app/api/get?model=userrole')
            .then((res) => { return res.json(); })
            .then((data) => {
                setuserroledata(data.data);
            })
    }, [])

    let AddUserRole = () => {

        const [urole, seturole] = useState('');
        const [dept, setdept] = useState();
        const [dev, setdev] = useState();

        const posturole = axios.create({
            baseURL: "https://erp-new-production.up.railway.app/api/get?model=userrole"
        });

        const posturolefun = (rol, dep, div) => {
            posturole.post('', {
                role: rol,
                department: dep,
                division: div
            })
                .then((res) => {
                    console.log("after then", res)
                    if (res.data.status === 'success') {
                        alert("User Role Added");
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
            posturolefun(urole, dept, dev);
        }
        return (
            <form>
                <div className="micard">
                    <h5 className="micardhdr">Add User Role</h5>
                    <div className="micardbdy row">
                        <div className="col-lg-4">
                            <label className="micardlble">User Role</label><br />
                            <input className="micardinpt" onChange={(e) => { seturole(e.target.value) }} required />
                        </div>
                        <div className="col-lg-4">
                            <label className="micardlble">Department</label><br />
                            <select className="micardinpt" onChange={(e) => { setdept(e.target.value) }}>
                                <option selected='true' disabled='true' value={''} required>Select Department</option>
                                {deptdat.map(deptobj => (
                                    <>
                                        <option value={deptobj.pk}>{deptobj.name}</option>
                                    </>
                                ))}
                            </select>
                        </div>
                        <div className="col-lg-4">
                            <label className="micardlble">Devision</label><br />
                            <select className="micardinpt" onChange={(e) => { setdev(e.target.value) }}>
                                <option selected='true' disabled='true' value={''} required>Select Devision</option>
                                {devisiondata.map(devobj => (
                                    <>
                                        <option value={devobj.pk}>{devobj.name}</option>
                                    </>
                                ))}
                            </select>
                        </div>
                    </div>
                </div><br />
                <button className="comadbtn" type="submit" onClick={doPost}>Add</button>
                <button className="cancelbtn" onClick={() => {
                    setUserRole(false)
                    document.getElementById("userroleadbtn").style.display = 'block';
                }} >Back</button>
            </form>
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
                            setUserRole(true);
                            document.getElementById("userroleadbtn").style.display = 'none';
                        }}>Add</button>
                        <h5>User Role</h5>
                        <h6>Manage Users / User Role </h6>
                    </div>
                    <div className="tablepadding">
                        {dispUserRole == false ? <UserRoleComp userrole={userroledata} deptdat={deptdat} devisiondata={devisiondata}/> : <AddUserRole />}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Userrole;