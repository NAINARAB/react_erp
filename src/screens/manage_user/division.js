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
import { maxWidth } from "@mui/system";
import Loader from "../../comp/Load/loading";
import axios from "axios";
import SearchIcon from '@mui/icons-material/Search';
import { Link } from "react-router-dom";



const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const Devision = () => {

    const token = sessionStorage.getItem("token");
    const [searchdata, setsearchdata] = useState('');

    const [dispalr, setdispalr] = useState(false);
    const [alrstatus, setalrstatus] = useState(false);
    const [alrmes, setalrmes] = useState('');
    const [fet, setfet] = useState(false);
    const success = document.getElementById("suc");
    const failure = document.getElementById("fail");

    const [dispDevision, setdispDevision] = useState(false);
    const [devisiondata, setdevisiondata] = useState([]);
    const [deptdat, setdeptdat] = useState([]);
    useEffect(() => {
        if(token != null){
            fetch('https://erp-tiarx.ondigitalocean.app/api/get?model=subdivision',
            {
                headers: {
                    'Authorization': `token ${token}`
                }
            })
            .then((res) => { return res.json(); })
            .then((data) => {
                setdevisiondata(data.data);
            })
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


    const Devisioncomp = (props) => {
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
            baseURL: `https://erp-tiarx.ondigitalocean.app/api/get?model=subdivision&pk=${updtpk}`
        });
        console.log("Crnt updt PK", updtpk);

        const updtCountry = (dep, nme) => {
            cntryupdt.put('', {
                department: dep,
                name: nme
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
            updtCountry(updep, upnme);
        }

        const deleteRow = (pkobj) => {
            let currentpk = pkobj;
            const deleterowurl = axios.create({ //subdevision
                baseURL: `https://erp-tiarx.ondigitalocean.app/api/get?model=subdivision&pk=${currentpk}`
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
                            {searchdata == '' ?
                                <>
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
                                </>
                                :
                                <>
                                    {devision.map((devdata) => (
                                        <>
                                            {(devdata.name.toLowerCase()).match(searchdata) == searchdata ||
                                             (devdata.department_get.toLowerCase()).match(searchdata) == searchdata ?
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
                                                :
                                                null
                                            }
                                        </>
                                    ))}
                                </>}
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


    const AddDevision = () => {
        const [devisionname, setdevisionname] = useState('');
        const [departmentname, setdepartmentname] = useState('');


        const postdev = axios.create({
            baseURL: "https://erp-tiarx.ondigitalocean.app/api/get?model=subdivision"
        });

        const postdevfun = (dep, rol) => {
            postdev.post('', {
                department: dep,
                name: rol
            },
                {
                    headers: {
                        'Authorization': `token ${token}`
                    }
                })
                .then((res) => {
                    if (res.data.status === 'success') {
                        if (res.data.status === 'success') {
                            setdispalr(true);
                            setalrstatus(true);
                            setalrmes("New Division Added");
                            setfet(!fet);
                            playsuccess();
                        }
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
            postdevfun(departmentname, devisionname);
        }
        return (
            <>
                <form onSubmit={doPost}>
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
                    <button type={'submit'} className="comadbtn">Add</button>
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
                    <Sidenav currentmodule={'Admin'} currentbutton={'User Management'} currentpage={'Devision'} />
                </div>
                <div className="col-lg-10">
                    <div className="comhed">
                        <button className="comadbtn" id="devisionadbtn" onClick={() => {
                            setdispDevision(true)
                            document.getElementById("devisionadbtn").style.display = 'none';
                        }}>Add</button>
                        <h5>Devision</h5>
                        <h6>Admin / Manage Users / Devision </h6>
                    </div>
                    <div className="tablepadding">
                        {token == null || token == '' ?
                            <h2>Please Login..&emsp; <Link to={'/'}>Login Page</Link></h2>
                            :
                            <>
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
                            </>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default Devision;