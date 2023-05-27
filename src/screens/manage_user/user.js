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


const Users = () => {
    const token = sessionStorage.getItem("token");
    const [dispalr, setdispalr] = useState(false);
    const [alrstatus, setalrstatus] = useState(false);
    const [alrmes, setalrmes] = useState('');
    const [fet, setfet] = useState(false);
    const success = document.getElementById("suc");
    const failure = document.getElementById("fail");

    const [dispUser, setdispUser] = useState(false);
    const [usersdata, setusersdata] = useState([]);
    const [branchdat, setbranchdat] = useState([]);
    const [userroldat, setusrroldat] = useState([]);

    useEffect(() => {
        if (token != null) {
            fetch('https://erp-tiarx.ondigitalocean.app/api/get?model=branch',
                {
                    headers: {
                        'Authorization': `token ${token}`
                    }
                })
                .then((res) => { return res.json(); })
                .then((data) => {
                    setbranchdat(data.data)
                })
            fetch('https://erp-tiarx.ondigitalocean.app/api/get?model=userrole',
                {
                    headers: {
                        'Authorization': `token ${token}`
                    }
                })
                .then((res) => { return res.json(); })
                .then((data) => {
                    setusrroldat(data.data);
                })
            fetch('https://erp-tiarx.ondigitalocean.app/api/get?model=user',
                {
                    headers: {
                        'Authorization': `token ${token}`
                    }
                })
                .then((res) => { return res.json(); })
                .then((data) => {
                    setusersdata(data.data)
                })
        }
    }, [fet])

    const Alr = () => {
        return (
            <div className="alrt">
                <Alert severity={alrstatus === true ? "success" : "error"}
                    onClose={() => { setdispalr(false) }}>{alrmes}</Alert>
            </div>
        );
    }


    const playsuccess = () => {
        success.play();
    }
    const playfailure = () => {
        failure.play();
    }

    const UserComp = (props) => {
        const { users } = props;
        const { branchdat } = props;
        const { userroldat } = props;
        let count = 0;
        const [pk, setpk] = useState();
        const [delproname, setdelproname] = useState('');
        const [open, setOpen] = useState(false);

        {/* Update var */ }

        const [Uopen, setUopen] = useState(false);
        const [updtpk, setupdtpk] = useState();
        const [upempid, setupempid] = useState('');
        const [upnme, setupnme] = useState('');
        const [upemil, setupemil] = useState('');
        const [upphn, setupphn] = useState('');
        const [uprol, setuprol] = useState('');
        const [uprolget, setuprolget] = useState('');
        const [upbrch, setupbrch] = useState('');
        const [upbrchget, setupbrchget] = useState('');
        const [uppswd, setuppswd] = useState('');


        const handleClickOpen = () => {
            setOpen(true);
        };

        const handleClose = () => {
            setOpen(false);
        };

        const UhandleClickOpen = () => {
            setUopen(true);
        };

        const UhandleClose = () => {
            setUopen(false);
        };

        function doDelete() {
            deleteRow(pk);
        }
        var bodydata = null;

        if (uppswd == '') {
            bodydata = {
                employee_id: upempid,
                name: upnme,
                email: upemil,
                phone: upphn,
                role: uprol,
                branch: upbrch,
            }
        } else {
            bodydata = {
                employee_id: upempid,
                name: upnme,
                email: upemil,
                phone: upphn,
                role: uprol,
                branch: upbrch,
                password: uppswd
            }
        }

        const cntryupdt = axios.create({ //
            baseURL: `https://erp-tiarx.ondigitalocean.app/api/signup?pk=${updtpk}`
        });

        const updtuser = () => {

            cntryupdt.put('',
                bodydata,
                {
                    headers: {
                        'Authorization': `token ${token}`
                    }
                }
            )
                .then((res) => {
                    console.log(res);
                    if (res.status === 200) {
                        UhandleClose();
                        setdispalr(true);
                        setalrstatus(true);
                        setalrmes("Changes Saved Successfully");
                        setfet(!fet);
                        playsuccess();
                    }
                    if (res.data.status === 'failure') {
                        UhandleClose();
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
            updtuser();
        }

        const deleteRow = (pkobj) => {
            let currentpk = pkobj;
            const deleterowurl = axios.create({ //user
                baseURL: `https://erp-tiarx.ondigitalocean.app/api/get?model=user&pk=${currentpk}`
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
                                <TableRow hover={true}>
                                    <TableCell>{++count}</TableCell>
                                    <TableCell>{usr.employee_id != null ? usr.employee_id : "Null"}</TableCell>
                                    <TableCell>{usr.name != null ? usr.name : "Null"}</TableCell>
                                    <TableCell>{usr.email != null ? usr.email : "Null"}</TableCell>
                                    <TableCell>{usr.phone != null ? usr.phone : "Null"}</TableCell>
                                    <TableCell>{usr.role_get != null ? usr.role_get : "Null"}</TableCell>
                                    <TableCell>{usr.branch_get != null ? usr.branch_get : "Null"}</TableCell>
                                    <TableCell>
                                        <IconButton aria-label="expand row" size="small"
                                            onClick={() => {
                                                setupdtpk(usr.pk); setupempid(usr.employee_id); setupnme(usr.name); setupemil(usr.email);
                                                setupphn(usr.phone); setuprol(usr.role); setuprolget(usr.role_get); setupbrch(usr.branch);
                                                setupbrchget(usr.branch_get); UhandleClickOpen();
                                            }}
                                        ><EditIcon /></IconButton>
                                        <IconButton aria-label="expand row" size="small"
                                            onClick={() => { setpk(usr.pk); setdelproname(usr.name); handleClickOpen(); }}
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
                                <b style={{ color: 'black' }}>User Name: &emsp;{delproname}</b>
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
                            <h5>Update User</h5>
                        </div>
                        <DialogTitle id="alert-dialog-title">
                            {"Row Details :  "}
                        </DialogTitle>
                        <DialogContent>
                            <div className="row">
                                <div className="col-lg-6 editscrn">
                                    <label className="micardlble" >Employee ID</label><br />
                                    <input className="micardinpt" value={upempid} onChange={(e) => { setupempid(e.target.value) }} required />
                                </div>

                                <div className="col-lg-6 editscrn">
                                    <label className="micardlble" >Name</label><br />
                                    <input className="micardinpt" value={upnme} onChange={(e) => { setupnme(e.target.value) }} required />
                                </div>

                                <div className="col-lg-6">
                                    <label className="micardlble">Email</label><br />
                                    <input className="micardinpt" value={upemil} onChange={(e) => { setupemil(e.target.value) }} required />
                                </div>
                                <div className="col-lg-6">
                                    <label className="micardlble">Phone</label><br />
                                    <input className="micardinpt" value={upphn} onChange={(e) => { setupphn(e.target.value) }} required />
                                </div>
                                <div className="col-lg-6">
                                    <label className="micardlble">Branches</label><br />
                                    <select className="micardinpt" onChange={(e) => { setupbrch(e.target.value) }} required>
                                        <option defaultValue={true} value={upbrch}>{upbrchget}</option>
                                        {branchdat.map(brnchobj => (
                                            <>
                                                <option value={brnchobj.pk}>{brnchobj.branch_name}</option>
                                            </>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-lg-6">
                                    <label className="micardlble">Role</label><br />
                                    <select className="micardinpt" onChange={(e) => { setuprol(e.target.value) }} required>
                                        <option defaultValue={true} value={uprol}>{uprolget}</option>
                                        {userroldat.map(rolobj => (
                                            <>
                                                <option value={rolobj.pk}>{rolobj.role}</option>
                                            </>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-lg-6">
                                    <label className="micardlble">Password</label><br />
                                    <input className="micardinpt" onChange={(e) => { setuppswd(e.target.value) }} placeholder={'NOT REQUIRED'} />
                                </div>

                            </div>
                        </DialogContent>
                        <DialogActions>
                            <button className="cancelbtn" onClick={UhandleClose} >Discord</button>
                            <button className="comadbtn" type={'submit'} onClick={doPUT} style={{ marginBottom: 'unset' }}>Update</button>
                        </DialogActions>
                    </Dialog><br />
                </div>
            </>
        );
    }


    const AddUsers = () => {

        const [uname, setuname] = useState('');
        const [empid, setempid] = useState('');
        const [emailid, setemailid] = useState('');
        const [phone, setphone] = useState('');
        const [branch, setbranch] = useState();
        const [urole, seturole] = useState();
        const [password, setpassword] = useState('');
        //branchdata



        //post url
        const postusrurl = axios.create({
            baseURL: "https://erp-tiarx.ondigitalocean.app/api/signup"
        });

        const postnewuser = (eid, name, email, phn, pswrd, rol, brach) => {
            postusrurl.post('', {
                employee_id: eid,
                name: name,
                email: email,
                phone: phn,
                password: pswrd,
                role: rol,
                branch: brach
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
                        setalrmes("New User Account Created");
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
        let doPost = (e) => {
            e.preventDefault();
            postnewuser(empid, uname, emailid, phone, password, urole, branch);
        }
        return (
            <>
                <form onSubmit={doPost}>
                    <div className="micard">
                        <h5 className="micardhdr">Add User</h5>
                        <div className="micardbdy row">
                            <div className="col-lg-4">
                                <label className="micardlble">User Name</label><br />
                                <input className="micardinpt" onChange={(e) => { setuname(e.target.value) }} required />
                            </div>
                            <div className="col-lg-4">
                                <label className="micardlble">Employee Id</label><br />
                                <input className="micardinpt" onChange={(e) => { setempid(e.target.value) }} required />
                            </div>
                            <div className="col-lg-4">
                                <label className="micardlble">Email</label><br />
                                <input className="micardinpt" onChange={(e) => { setemailid(e.target.value) }} required />
                            </div>
                            <div className="col-lg-4">
                                <label className="micardlble">Phone</label><br />
                                <input className="micardinpt" onChange={(e) => { setphone(e.target.value) }} required />
                            </div>
                            <div className="col-lg-4">
                                <label className="micardlble">Branches</label><br />
                                <select className="micardinpt" onChange={(e) => { setbranch(e.target.value) }} required>
                                    <option selected='true' disabled='true' value={''} required>Select Branches</option>
                                    {branchdat.map(brnchobj => (
                                        <>
                                            <option value={brnchobj.pk}>{brnchobj.branch_name}</option>
                                        </>
                                    ))}
                                </select>
                            </div>
                            <div className="col-lg-4">
                                <label className="micardlble">Role</label><br />
                                <select className="micardinpt" onChange={(e) => { seturole(e.target.value) }} required>
                                    <option selected='true' disabled='true' value={''} required>Select Role</option>
                                    {userroldat.map(rolobj => (
                                        <>
                                            <option value={rolobj.pk}>{rolobj.role}</option>
                                        </>
                                    ))}
                                </select>
                            </div>
                            <div className="col-lg-4">
                                <label className="micardlble">Password</label><br />
                                <input type={'password'} className="micardinpt" onChange={(e) => { setpassword(e.target.value) }} required />
                            </div><div className="col-lg-4">{/* For Alignment */}</div><div className="col-lg-4"></div>
                        </div>
                    </div><br />
                    <button className="comadbtn" type={'submit'}>Add</button>
                    <button className="cancelbtn" onClick={() => {
                        setdispUser(false)
                        document.getElementById("useradbtn").style.display = 'block';
                    }} >Back</button>
                </form>
            </>
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
                    <Sidenav currentmodule={'Admin'} currentbutton={'User Management'} currentpage={'User'} />
                </div>
                <div className="col-lg-10">
                    <div className="comhed">
                        <button className="comadbtn" id="useradbtn" onClick={() => {
                            setdispUser(true);
                            document.getElementById("useradbtn").style.display = 'none';
                        }}>Add</button>
                        <h5>Users</h5>
                        <h6>Admin / Manage Users / User </h6>
                    </div>
                    <div className="tablepadding">
                        {token == null || token == '' ?
                            <h2>Please Login..&emsp; <Link to={'/'}>Login Page</Link></h2>
                            :
                            <>
                                {dispUser == false ? <UserComp users={usersdata} userroldat={userroldat} branchdat={branchdat} /> : <AddUsers />}
                            </>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}


export default Users;