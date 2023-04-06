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
import Loader from "../../comp/Load/loading";
import axios from "axios";

const token = sessionStorage.getItem("token");

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});



let UserComp = (props) => {
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

    if(uppswd == ''){
        bodydata =  {
            employee_id: upempid,
            name: upnme,
            email: upemil,
            phone: upphn,
            role: uprol,
            branch: upbrch,
        }
    }else{
        bodydata = {
            employee_id: upempid,
            name: upnme,
            email: upemil,
            phone: upphn,
            role: uprol,
            branch: upbrch,
            password:uppswd
        }
    } 

    const cntryupdt = axios.create({ //
        baseURL: `https://erp-test-3wqc9.ondigitalocean.app/api/signup?pk=${updtpk}`
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
                console.log("Post After", res)
                if (res.data.status === 'success') {
                    alert('put success');
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
        updtuser();
    }

    const deleteRow = (pkobj) => {
        let currentpk = pkobj;
        const deleterowurl = axios.create({ //user
            baseURL: `https://erp-test-3wqc9.ondigitalocean.app/api/get?model=user&pk=${currentpk}`
        });

        deleterowurl.delete('', {
        },
        {
            headers: {
                'Authorization': `token ${token}`
            }
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
                                <input className="micardinpt" value={upempid} onChange={(e) => { setupempid(e.target.value) }} />
                            </div>

                            <div className="col-lg-6 editscrn">
                                <label className="micardlble" >Name</label><br />
                                <input className="micardinpt" value={upnme} onChange={(e) => { setupnme(e.target.value) }} />
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
                                <select className="micardinpt" onChange={(e) => { setupbrch(e.target.value) }}>
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
                                <select className="micardinpt" onChange={(e) => { setuprol(e.target.value) }}>
                                    <option defaultValue={true} value={uprol} required>{uprolget}</option>
                                    {userroldat.map(rolobj => (
                                        <>
                                            <option value={rolobj.pk}>{rolobj.role}</option>
                                        </>
                                    ))}
                                </select>
                            </div>
                            <div className="col-lg-6">
                                <label className="micardlble">Password</label><br />
                                <input className="micardinpt" onChange={(e) => { setuppswd(e.target.value) }} placeholder={'NOT REQUIRED'}/>
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





function Users() {
    const [dispUser, setdispUser] = useState(false);
    const [usersdata, setusersdata] = useState([]);
    const [branchdat, setbranchdat] = useState([]);
    const [userroldat, setusrroldat] = useState([]);
    useEffect(() => {
        fetch('https://erp-test-3wqc9.ondigitalocean.app/api/get?model=branch',
        {
            headers: {
                'Authorization': `token ${token}`
            }
        })
            .then((res) => { return res.json(); })
            .then((data) => {
                setbranchdat(data.data)
            })
        fetch('https://erp-test-3wqc9.ondigitalocean.app/api/get?model=userrole',
        {
            headers: {
                'Authorization': `token ${token}`
            }
        })
            .then((res) => { return res.json(); })
            .then((data) => {
                setusrroldat(data.data);
            })
        fetch('https://erp-test-3wqc9.ondigitalocean.app/api/get?model=user',
        {
            headers: {
                'Authorization': `token ${token}`
            }
        })
            .then((res) => { return res.json(); })
            .then((data) => {
                setusersdata(data.data)
            })
    }, [])


    let AddUsers = () => {

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
            baseURL: "https://erp-test-3wqc9.ondigitalocean.app/api/signup"
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
                    console.log("after then", res)
                    if (res.data.status === 'success') {
                        alert("New User Account Created");
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
            postnewuser(empid, uname, emailid, phone, password, urole, branch);
        }
        return (
            <>
                <form>
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
                                <select className="micardinpt" onChange={(e) => { setbranch(e.target.value) }}>
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
                                <select className="micardinpt" onChange={(e) => { seturole(e.target.value) }}>
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
                                <input type={'password'} className="micardinpt" onChange={(e) => { setpassword(e.target.value) }} />
                            </div><div className="col-lg-4">{/* For Alignment */}</div><div className="col-lg-4"></div>
                        </div>
                    </div><br />
                    <button className="comadbtn" type="submit" onClick={doPost}>Add</button>
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
                        {dispUser == false ? <UserComp users={usersdata} userroldat={userroldat} branchdat={branchdat} /> : <AddUsers />}
                    </div>
                </div>
            </div>
        </>
    );
}


export default Users;