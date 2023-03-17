import React, { useState, useEffect } from "react";
import Header from "../../comp/header/header";
import Sidenav from "../../comp/sidenav/sidenav";
import { IconButton, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import '../common.css';
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


let UserComp = (props) => {
    const { users } = props;
    let count = 0;
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
                                <TableCell>{usr.branch_get != null ? usr.branch_get : "Null"}</TableCell>
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
    const [usersdata, setusersdata] = useState([]);

    useEffect(() => {
        fetch('https://erp-new-production.up.railway.app/api/get?model=user')
            .then((res) => { return res.json(); })
            .then((data) => {
                console.log(data.data);
                setusersdata(data.data)
            })
    }, [])

    let AddUsers = () => {
        const[branchdat, setbranchdat] = useState([]);
        const[userroldat, setusrroldat] = useState([]);
        const[uname, setuname]= useState('');
        const[empid, setempid]= useState('');
        const[emailid, setemailid]= useState('');
        const[phone, setphone]= useState('');
        const[branch, setbranch]= useState();
        const[urole, seturole] = useState();
        const[password, setpassword]= useState('');
        //branchdata
        useEffect(() => {
            fetch('https://erp-new-production.up.railway.app/api/get?model=branch')
                .then((res) => { return res.json(); })
                .then((data) => {
                    setbranchdat(data.data)
                })
        }, [])
        //user role data
        useEffect(() => {
            fetch('https://erp-new-production.up.railway.app/api/get?model=userrole')
                .then((res) => { return res.json(); })
                .then((data) => {
                    setusrroldat(data.data);
                })
        }, [])

        //post url
        const postusrurl = axios.create({
            baseURL: "https://erp-new-production.up.railway.app/api/signup   "
        });

        const postnewuser = (eid, name, email, phn, pswrd, rol, brach) => {
            postusrurl.post('', {
                employee_id: eid,
                name: name,
                email: email,
                phone:phn,
                password:pswrd,
                role: rol,
                branch:brach
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
            postnewuser(empid,uname,emailid,phone,password,urole,branch);
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
                        {dispUser == false ? <UserComp users={usersdata} /> : <AddUsers />}
                    </div>
                </div>
            </div>
        </>
    );
}


export default Users;