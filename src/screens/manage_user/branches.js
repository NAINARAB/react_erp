import React, { useState, useEffect } from "react";
import Header from "../../comp/header/header";
import Sidenav from "../../comp/sidenav/sidenav";
import {
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Slide, Alert,
    TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper, IconButton
} from "@mui/material";
import '../common.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Loader from "../../comp/Load/loading";
import SearchIcon from '@mui/icons-material/Search';
import axios from "axios";
import { Link } from "react-router-dom";


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const Branches = () => {

    const token = sessionStorage.getItem("token");
    const [dispbranch, setdispbranch] = useState(false);
    const [branchdata, setbranchdata] = useState([]);
    const [countrydat, setcountrydat] = useState([]);
    const [statedat, setstatedat] = useState([]);
    const [searchdata, setsearchdata] = useState('');

    const [dispalr, setdispalr] = useState(false);
    const [alrstatus, setalrstatus] = useState(false);
    const [alrmes, setalrmes] = useState('');
    const [fet, setfet] = useState(false);
    const success = document.getElementById("suc");
    const failure = document.getElementById("fail");

    useEffect(() => {
        if(token != null){
            fetch('https://erp-tiarx.ondigitalocean.app/api/get?model=country',
            {
                headers: {
                    'Authorization': `token ${token}`
                }
            })
            .then((res) => { return res.json(); })
            .then((data) => {
                setcountrydat(data.data);
            })
        fetch('https://erp-tiarx.ondigitalocean.app/api/get?model=state',
            {
                headers: {
                    'Authorization': `token ${token}`
                }
            })
            .then((res) => { return res.json(); })
            .then((data) => {
                setstatedat(data.data);
            })
        fetch('https://erp-tiarx.ondigitalocean.app/api/get?model=branch',
            {
                headers: {
                    'Authorization': `token ${token}`
                }
            })
            .then((res) => { return res.json(); })
            .then((data) => {
                setbranchdata(data.data)
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



    const BranchesTble = (props) => {
        const { branch } = props;
        let { searchdata } = props;
        let count = 0;
        const [pk, setpk] = useState();
        const [delproname, setdelproname] = useState('');
        const [open, setOpen] = useState(false);

        {/* Update Variables */ }

        const [Uopen, setUopen] = useState(false);
        const [updtpk, setupdtpk] = useState();
        const [upbname, setupbname] = useState('');
        const [upcname, setupcname] = useState('');
        const [upstat, setupstat] = useState();
        const [upstatget, setupstatget] = useState('');
        const [upcntry, setupcntry] = useState();
        const [upcntryget, setupcntryget] = useState('');
        const [uppin, setuppin] = useState('');
        const [upgst, setupgst] = useState('');
        const [upadres, setupadres] = useState('');
        const { countrydat } = props;
        const { statedat } = props;

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

        const brnchupdt = axios.create({
            baseURL: `https://erp-tiarx.ondigitalocean.app/api/get?model=branch&pk=${updtpk}`
        });

        const updtCountry = (bnme, cnme, stat, cntry, pin, gst, add) => {
            brnchupdt.put('', {
                branch_name: bnme,
                cityname: cnme,
                state: stat,
                country: cntry,
                pincode: pin,
                gst_number: gst,
                address: add
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
            updtCountry(upbname, upcname, upstat, upcntry, uppin, upgst, upadres,);
        }

        function doDelete() {
            deleteRow(pk);
        }

        const deleteRow = (pkobj) => {
            let currentpk = pkobj;
            const deleterowurl = axios.create({ //phase
                baseURL: `https://erp-tiarx.ondigitalocean.app/api/get?model=branch&pk=${currentpk}`
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
                    setalrmes('One Row Deleted!, Please Reload');
                    setfet(!fet);
                    playsuccess();
                })
                .catch((err) => {
                    console.log(err);
                })
        }
        return (
            <>
                {branch.length != 0 ?
                    <TableContainer component={Paper} sx={{ maxHeight: 650 }}>
                        <Table stickyHeader aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell width={100} variant="head" sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white', fontWeight: 'bold' }}>S.No</TableCell>
                                    <TableCell variant="head" sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white', fontWeight: 'bold' }}>Branch Name</TableCell>
                                    <TableCell variant="head" sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white', fontWeight: 'bold' }}>City Name</TableCell>
                                    <TableCell variant="head" sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white', fontWeight: 'bold' }}>State</TableCell>
                                    <TableCell variant="head" sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white', fontWeight: 'bold' }}>Country</TableCell>
                                    <TableCell variant="head" sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white', fontWeight: 'bold' }}>Address</TableCell>
                                    <TableCell variant="head" sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white', fontWeight: 'bold' }}>Pin Code</TableCell>
                                    <TableCell variant="head" sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white', fontWeight: 'bold' }}>GST Number</TableCell>
                                    <TableCell variant="head" sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white', fontWeight: 'bold' }}>Action</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {searchdata == '' ?
                                    <>
                                        {branch.map((brs) => (
                                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} hover={true}>
                                                <TableCell>{++count}</TableCell>
                                                <TableCell>{brs.branch_name !== null ? brs.branch_name : "Null"}</TableCell>
                                                <TableCell>{brs.cityname !== null ? brs.cityname : "Null"}</TableCell>
                                                <TableCell>{brs.state_get !== null ? brs.state_get : "Null"}</TableCell>
                                                <TableCell>{brs.country_get !== null ? brs.country_get : "Null"}</TableCell>
                                                <TableCell>{brs.address !== null ? brs.address : "Null"}</TableCell>
                                                <TableCell>{brs.pincode !== null ? brs.pincode : "Null"}</TableCell>
                                                <TableCell>{brs.gst_number !== null ? brs.gst_number : "Null"}</TableCell>
                                                <TableCell>
                                                    <IconButton aria-label="expand row" size="small"
                                                        onClick={() => {
                                                            setupdtpk(brs.pk); setupbname(brs.branch_name); setupcname(brs.cityname); setupstat(brs.state);
                                                            setupstatget(brs.state_get); setupcntry(brs.country); setupcntryget(brs.country_get); setuppin(brs.pincode);
                                                            setupgst(brs.gst_number); setupadres(brs.address); UhandleClickOpen();
                                                        }}
                                                    ><EditIcon /></IconButton>
                                                    <IconButton aria-label="expand row" size="small"
                                                        onClick={() => { setpk(brs.pk); setdelproname(brs.branch_name); handleClickOpen(); }}
                                                        sx={{ color: 'rgba(255, 0, 0, 0.755)' }}>
                                                        <DeleteIcon /></IconButton>
                                                </TableCell>{/* || brs.gst_number != "" */}
                                            </TableRow>
                                        ))}
                                    </>
                                    :
                                    <>
                                        {branch.map((brs) => (
                                            <>
                                                {(brs.branch_name.toLowerCase()).match(searchdata) == searchdata || (brs.cityname.toLowerCase()).match(searchdata) == searchdata
                                                    || (brs.state_get.toLowerCase()).match(searchdata) == searchdata || (brs.country_get.toLowerCase()).match(searchdata) == searchdata
                                                    || (brs.address.toLowerCase()).match(searchdata) == searchdata || (brs.pincode.toString()).match(searchdata) == searchdata
                                                    || (brs.gst_number.toLowerCase()).match(searchdata) == searchdata ?
                                                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} hover={true}>
                                                        <TableCell>{++count}</TableCell>
                                                        <TableCell>{brs.branch_name !== null ? brs.branch_name : "Null"}</TableCell>
                                                        <TableCell>{brs.cityname !== null ? brs.cityname : "Null"}</TableCell>
                                                        <TableCell>{brs.state_get !== null ? brs.state_get : "Null"}</TableCell>
                                                        <TableCell>{brs.country_get !== null ? brs.country_get : "Null"}</TableCell>
                                                        <TableCell>{brs.address !== null ? brs.address : "Null"}</TableCell>
                                                        <TableCell>{brs.pincode !== null ? brs.pincode : "Null"}</TableCell>
                                                        <TableCell>{brs.gst_number !== null ? brs.gst_number : "Null"}</TableCell>
                                                        <TableCell>
                                                            <IconButton aria-label="expand row" size="small"
                                                                onClick={() => {
                                                                    setupdtpk(brs.pk); setupbname(brs.branch_name); setupcname(brs.cityname); setupstat(brs.state);
                                                                    setupstatget(brs.state_get); setupcntry(brs.country); setupcntryget(brs.country_get); setuppin(brs.pincode);
                                                                    setupgst(brs.gst_number); setupadres(brs.address); UhandleClickOpen();
                                                                }}
                                                            ><EditIcon /></IconButton>
                                                            <IconButton aria-label="expand row" size="small"
                                                                onClick={() => { setpk(brs.pk); setdelproname(brs.branch_name); handleClickOpen(); }}
                                                                sx={{ color: 'rgba(255, 0, 0, 0.755)' }}>
                                                                <DeleteIcon /></IconButton>
                                                        </TableCell>{/* || brs.gst_number != "" */}
                                                    </TableRow>
                                                    : null
                                                }
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
                                <b style={{ color: 'black' }}>Branch Name: &emsp;{delproname}</b>
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
                            <h5>Update Branch</h5>
                        </div>
                        <DialogTitle id="alert-dialog-title">
                            {"Row Details :  "}
                        </DialogTitle>
                        <DialogContent>
                            <form onSubmit={doPUT}>
                                <div className="row">
                                    <div className="col-lg-6 editscrn">
                                        <label className="micardlble" >Branch Name</label><br />
                                        <input className="micardinpt" value={upbname} onChange={(e) => { setupbname(e.target.value) }} required />
                                    </div>

                                    <div className="col-lg-6 editscrn">
                                        <label className="micardlble" >Country Name</label><br />
                                        <input className="micardinpt" value={upcname} onChange={(e) => { setupcname(e.target.value) }} required />
                                    </div>

                                    <div className="col-lg-6">
                                        <label className="micardlble" >State</label><br />
                                        <select className="micardinpt" onChange={(e) => { setupstat(e.target.value) }} required >
                                            <option defaultValue={true} value={upstat} required>{upstatget}</option>
                                            {statedat.map(statobj => (
                                                <>
                                                    <option value={statobj.pk}>{statobj.state_name}</option>
                                                </>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="col-lg-6">
                                        <label className="micardlble" >Country</label><br />
                                        <select className="micardinpt" onChange={(e) => { setupcntry(e.target.value) }} required>
                                            <option defaultValue={true} value={upcntry} >{upcntryget}</option>
                                            {countrydat.map(cntryobj => (
                                                <>
                                                    <option value={cntryobj.pk}>{cntryobj.country_name}</option>
                                                </>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="col-lg-6">
                                        <label className="micardlble" >Pin code</label><br />
                                        <input value={uppin} className="micardinpt" onChange={(e) => { setuppin(e.target.value) }} required />
                                    </div>

                                    <div className="col-lg-6">
                                        <label className="micardlble" >GST Number</label><br />
                                        <input className="micardinpt" value={upgst} onChange={(e) => { setupgst(e.target.value) }} required />
                                    </div>

                                    <div className="col-lg-6">
                                        <label className="micardlble" >Address</label><br />
                                        <textarea className="micardinpt" value={upadres} onChange={(e) => { setupadres(e.target.value) }} required />
                                    </div>
                                </div>


                                <button className="comadbtn" type={'submit'} style={{ marginBottom: 'unset' }}>Update</button>
                                <button className="cancelbtn" onClick={UhandleClose} >Discord</button>
                            </form>
                        </DialogContent>
                    </Dialog><br />
                </div>
            </>
        );
    }




    const AddBranches = () => {

        const [branchname, setbranchname] = useState('')
        const [cityname, setcityname] = useState('');
        const [state, setstate] = useState('');
        const [country, setcountry] = useState('');
        const [pincode, setpincode] = useState();
        const [gstnumber, setgstnumber] = useState('');
        const [address, setaddress] = useState('');


        const postbranchurl = axios.create({
            baseURL: "https://erp-tiarx.ondigitalocean.app/api/get?model=branch"
        });

        const postbranchfun = (branchname, cityname, state, country, pincode, gstnumbert, address) => {
            postbranchurl.post('', {
                branch_name: branchname,
                cityname: cityname,
                state: state,
                country: country,
                pincode: pincode,
                GST_Number: gstnumbert,
                address: address,
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
                        setalrmes("New Branch Added!");
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
            postbranchfun(branchname, cityname, state, country, pincode, gstnumber, address);
        }
        return (
            <>
                <form onSubmit={doPost}>
                    <div className="micard">
                        <h5 className="micardhdr" >Add Branches</h5>

                        <div className="micardbdy row">

                            <div className="col-lg-4">
                                <label className="micardlble" >Branch Name</label><br />
                                <input className="micardinpt" onChange={(e) => { setbranchname(e.target.value) }} required />
                            </div>

                            <div className="col-lg-4">
                                <label className="micardlble" >City Name</label><br />
                                <input className="micardinpt" onChange={(e) => { setcityname(e.target.value) }} required />
                            </div>

                            <div className="col-lg-4">
                                <label className="micardlble" >State</label><br />
                                <select className="micardinpt" onChange={(e) => { setstate(e.target.value) }} required >
                                    <option selected='true' disabled='true' value={''} required>Select State</option>
                                    {statedat.map(statobj => (
                                        <>
                                            <option value={statobj.pk}>{statobj.state_name}</option>
                                        </>
                                    ))}
                                </select>
                            </div>

                            <div className="col-lg-4">
                                <label className="micardlble" >Country</label><br />
                                <select className="micardinpt" onChange={(e) => { setcountry(e.target.value) }}>
                                    <option selected='true' disabled='true' value={''} required>Select Country</option>
                                    {countrydat.map(cntryobj => (
                                        <>
                                            <option value={cntryobj.pk}>{cntryobj.country_name}</option>
                                        </>
                                    ))}
                                </select>
                            </div>

                            <div className="col-lg-4">
                                <label className="micardlble" >Pin code</label><br />
                                <input type='number' className="micardinpt" onChange={(e) => { setpincode(e.target.value) }} required />
                            </div>

                            <div className="col-lg-4">
                                <label className="micardlble" >GST Number</label><br />
                                <input className="micardinpt" onChange={(e) => { setgstnumber(e.target.value) }} required />
                            </div>

                            <div className="col-lg-4">
                                <label className="micardlble" >Address</label><br />
                                <textarea className="micardinpt" onChange={(e) => { setaddress(e.target.value) }} required />
                            </div><div className="col-lg-4"></div><div className="col-lg-4"></div>
                        </div>
                    </div><br />
                    <button className="comadbtn" type="submit" >Add</button>
                    <button className="cancelbtn" onClick={() => {
                        setdispbranch(false)
                        document.getElementById('branchadbtn').style.display = 'block';
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
            <div className="row">
                <div className="col-lg-12">
                    <Header />
                </div>
                <div className="col-lg-2">
                    <Sidenav currentmodule={'Admin'} currentbutton={'User Management'} currentpage={'Branches'} />
                </div>
                <div className="col-lg-10">
                    <div>

                        <div className="comhed">
                            <button className="comadbtn" id='branchadbtn' onClick={() => {
                                setdispbranch(true)
                                document.getElementById('branchadbtn').style.display = 'none';
                            }} >Add</button>
                            <h5>Branches</h5>
                            <h6>Admin / Manage Users / Branches</h6>
                        </div>
                        <div className="tablepadding">
                            {token == null || token == '' ?
                                <h2>Please Login..&emsp; <Link to={'/'}>Login Page</Link></h2>
                                :
                                <>
                                    {dispbranch == false ?
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
                                    {dispbranch == false ? <BranchesTble branch={branchdata} countrydat={countrydat} statedat={statedat} searchdata={searchdata} /> : <AddBranches />}
                                </>
                            }
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}



export default Branches;