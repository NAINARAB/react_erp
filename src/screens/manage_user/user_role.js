import React, { useState, useEffect } from "react";
import Header from "../../comp/header/header";
import Sidenav from "../../comp/sidenav/sidenav";
import {
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Slide,
    IconButton, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper, Alert
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import '../common.css';
import Loader from "../../comp/Load/loading";
import axios from "axios";
import { Link } from "react-router-dom";


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


const Userrole = () => {

    const token = sessionStorage.getItem("token");
    const [dispalr, setdispalr] = useState(false);
    const [alrstatus, setalrstatus] = useState(false);
    const [alrmes, setalrmes] = useState('');
    const [fet, setfet] = useState(false);
    const success = document.getElementById("suc");
    const failure = document.getElementById("fail");

    const [dispUserRole, setUserRole] = useState(false);
    const [userroledata, setuserroledata] = useState([]);
    const [deptdat, setdeptdat] = useState([]);
    const [devisiondata, setdevisiondata] = useState([]);

    useEffect(() => {
        if(token != null){
            fetch('https://erp-tiarx.ondigitalocean.app/api/get?model=department',
            {
                headers: {
                    'Authorization': `token ${token}`
                }
            })
            .then((res) => { return res.json(); })
            .then((data) => {
                setdeptdat(data.data);
            })
        fetch('https://erp-tiarx.ondigitalocean.app/api/get?model=subdivision',
            {
                headers: {
                    'Authorization': `token ${token}`
                }
            })
            .then((res) => { return res.json(); })
            .then((data) => {
                setdevisiondata(data.data)
            })
        fetch('https://erp-tiarx.ondigitalocean.app/api/get?model=userrole',
            {
                headers: {
                    'Authorization': `token ${token}`
                }
            })
            .then((res) => { return res.json(); })
            .then((data) => {
                setuserroledata(data.data);
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

    const UserRoleComp = (props) => {
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
            baseURL: `https://erp-tiarx.ondigitalocean.app/api/get?model=userrole&pk=${updtpk}`
        });


        const updtuRole = (rol, dep, div) => {
            urolupdt.put('', {
                role: rol,
                department: dep,
                division: div
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

        const doPUT = (e) => {
            e.preventDefault();
            updtuRole(uprol, updep, updiv);
        }

        const deleteRow = (pkobj) => {
            let currentpk = pkobj;
            const deleterowurl = axios.create({ //userrole
                baseURL: `https://erp-tiarx.ondigitalocean.app/api/get?model=userrole&pk=${currentpk}`
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
                                <TableRow hover={true}>
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
                            <form onSubmit={doPUT}>
                                <div className="row">
                                    <div className="col-lg-6 editscrn">
                                        <label className="micardlble" >Role</label><br />
                                        <input className="micardinpt" value={uprol} onChange={(e) => { setuprol(e.target.value) }} required />
                                    </div>

                                    <div className="col-lg-6 editscrn">
                                        <label className="micardlble" >Department Name</label><br />
                                        <select className="micardinpt" onChange={(e) => { setupdep(e.target.value)}} required>
                                            <option defaultValue={true} value={updep} >{updepget}</option>
                                            {deptdat.map(deptobj => (
                                                <>
                                                    <option value={deptobj.pk}>{deptobj.name}</option>
                                                </>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="col-lg-6 editscrn">
                                        <label className="micardlble" >Devision Name</label><br />
                                        <select className="micardinpt" onChange={(e) => { setupdiv(e.target.value) }} required>
                                            <option defaultValue={true} value={updep}>{updepget}</option>
                                            {devisiondata.map(devobj => (
                                                <>
                                                    <option value={devobj.pk}>{devobj.name}</option>
                                                </>
                                            ))}
                                        </select>
                                    </div>

                                </div><br />
                                <button className="comadbtn" type={'submit'} style={{ marginBottom: 'unset' }} >Update</button>
                                <button className="cancelbtn" onClick={UhandleClose} >Discord</button>
                            </form>
                        </DialogContent>
                    </Dialog><br />
                </div>
            </>
        );
    }



    const AddUserRole = () => {

        const [urole, seturole] = useState('');
        const [dept, setdept] = useState();
        const [dev, setdev] = useState();

        const posturole = axios.create({
            baseURL: "https://erp-tiarx.ondigitalocean.app/api/get?model=userrole"
        });

        const posturolefun = (rol, dep, div) => {
            posturole.post('', {
                role: rol,
                department: dep,
                division: div
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
                        setalrmes("New User-Role Created");
                        setfet(!fet);
                        playsuccess();
                    }
                    if (res.data.status === 'failure') {
                        setdispalr(true);
                        setalrstatus(false);
                        setalrmes(":( Failure Please Try Again..")
                        playfailure();
                    }

                }).catch((err) => {
                    console.log(err);
                })
        };
        const doPost = (e) => {
            e.preventDefault();
            posturolefun(urole, dept, dev);
        }
        return (
            <form onSubmit={doPost}>
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
                                <option selected='true' disabled='true' value={null} required>Select Department</option>
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
                                <option selected='true' disabled='true' value={null} required>Select Devision</option>
                                {devisiondata.map(devobj => (
                                    <>
                                        <option value={devobj.pk}>{devobj.name}</option>
                                    </>
                                ))}
                            </select>
                        </div>
                    </div>
                </div><br />
                <button className="comadbtn" type={'submit'}>Add</button>
                <button className="cancelbtn" onClick={() => {
                    setUserRole(false)
                    document.getElementById("userroleadbtn").style.display = 'block';
                }} >Back</button>
            </form>
        );
    }

    return (
        <>
            <audio id="suc">
                <source src="https://drive.google.com/uc?export=download&id=1V_Caw86copGxXg6c9cn2xg2mxQOvEc83" type="audio/mp3" />
            </audio>
            <audio id="fail">
                <source src="https://drive.google.com/uc?export=download&id=1j41aa4YxNua9mihX-qb9p5X_hm2ZPDpJ" type="audio/mp3" />
            </audio>
            {dispalr == true ? <Alr /> : null}
            <div className="row" >
                <div className="col-lg-12">
                    <Header />
                </div>
                <div className="col-lg-2">
                    <Sidenav currentmodule={'Admin'} currentbutton={'User Management'} currentpage={'User Role'} />
                </div>
                <div className="col-lg-10">
                    <div className="comhed">
                        <button className="comadbtn" id="userroleadbtn" onClick={() => {
                            setUserRole(true);
                            document.getElementById("userroleadbtn").style.display = 'none';
                        }}>Add</button>
                        <h5>User Role</h5>
                        <h6>Admin / Manage Users / User Role </h6>
                    </div>
                    <div className="tablepadding">
                        {token == null || token == '' ?
                        <h2>Please Login..&emsp; <Link to={'/'}>Login Page</Link></h2>
                        :
                        <>
                        {dispUserRole == false ? <UserRoleComp userrole={userroledata} deptdat={deptdat} devisiondata={devisiondata} /> : <AddUserRole />}
                        </>}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Userrole;