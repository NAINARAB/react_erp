import React, { useState, useEffect } from "react";
import Header from "../../comp/header/header";
import Sidenav from "../../comp/sidenav/sidenav";
import {
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Slide,
    TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper, IconButton
} from "@mui/material";
import '../common.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Loader from "../../comp/Load/loading";
import axios from "axios";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


let BranchesTble = (props) => {
    const { branch } = props;
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
        baseURL: `https://erp-new-production.up.railway.app/api/get?model=branch&pk=${updtpk}`
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
        })
            .then((res) => {
                console.log("Post After", res)
                if (res.data.status === 'success') {
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

    let doPUT = (e) => {
        e.preventDefault();
        updtCountry(upbname,upcname,upstat,upcntry,uppin,upgst,upadres,);
    }

    function doDelete() {
        deleteRow(pk);
    }

    const deleteRow = (pkobj) => {
        let currentpk = pkobj;
        const deleterowurl = axios.create({ //phase
            baseURL: `https://erp-new-production.up.railway.app/api/get?model=branch&pk=${currentpk}`
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

                        <div className="row">
                            <div className="col-lg-6 editscrn">
                                <label className="micardlble" >Branch Name</label><br />
                                <input className="micardinpt" value={upbname} onChange={(e) => { setupbname(e.target.value) }} />
                            </div>

                            <div className="col-lg-6 editscrn">
                                <label className="micardlble" >Country Name</label><br />
                                <input className="micardinpt" value={upcname} onChange={(e) => { setupcname(e.target.value) }} />
                            </div>

                            <div className="col-lg-6">
                                <label className="micardlble" >State</label><br />
                                <select className="micardinpt" onChange={(e) => { setupstat(e.target.value) }}  >
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
                                <select className="micardinpt" onChange={(e) => { setupcntry(e.target.value) }}>
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
                                <input value={uppin} className="micardinpt" onChange={(e) => { setuppin(e.target.value) }}  />
                            </div>

                            <div className="col-lg-6">
                                <label className="micardlble" >GST Number</label><br />
                                <input className="micardinpt" value={upgst} onChange={(e) => { setupgst(e.target.value) }}  />
                            </div>

                            <div className="col-lg-6">
                                <label className="micardlble" >Address</label><br />
                                <textarea className="micardinpt" value={upadres} onChange={(e) => { setupadres(e.target.value) }}  />
                            </div>
                        </div>


                        <button className="comadbtn" onClick={doPUT} style={{ marginBottom: 'unset' }}>Update</button>
                        <button className="cancelbtn" onClick={UhandleClose} >Discord</button>
                    </DialogContent>
                </Dialog><br />
            </div>
        </>
    );
}


function Branches() {
    const [dispbranch, setdispbranch] = useState(false);
    const [branchdata, setbranchdata] = useState([]);
    const [countrydat, setcountrydat] = useState([]);
    const [statedat, setstatedat] = useState([]);
    useEffect(() => {
        fetch('https://erp-new-production.up.railway.app/api/get?model=country')
            .then((res) => { return res.json(); })
            .then((data) => {
                setcountrydat(data.data);
            })
        fetch('https://erp-new-production.up.railway.app/api/get?model=state')
            .then((res) => { return res.json(); })
            .then((data) => {
                setstatedat(data.data);
            })
    }, [])


    function AddBranches() {

        const [branchname, setbranchname] = useState('')
        const [cityname, setcityname] = useState('');
        const [state, setstate] = useState('');
        const [country, setcountry] = useState('');
        const [pincode, setpincode] = useState();
        const [gstnumber, setgstnumber] = useState('');
        const [address, setaddress] = useState('');


        const postbranchurl = axios.create({
            baseURL: "https://erp-new-production.up.railway.app/api/get?model=branch"
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
            })
                .then((res) => {
                    console.log("after then", res)
                    if (res.data.status === 'success') {
                        alert("Branch Added");
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
            postbranchfun(branchname, cityname, state, country, pincode, gstnumber, address);
        }
        return (
            <>
                <form>
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
                    <button className="comadbtn" type="submit" onClick={doPost}>Add</button>
                    <button className="cancelbtn" onClick={() => {
                        setdispbranch(false)
                        document.getElementById('branchadbtn').style.display = 'block';
                    }} >Back</button>
                </form>
            </>
        );
    }

    useEffect(() => {
        fetch('https://erp-new-production.up.railway.app/api/get?model=branch')
            .then((res) => { return res.json(); })
            .then((data) => {
                setbranchdata(data.data)
            })
    }, [])
    return (
        <>
            <div className="row">
                <div className="col-lg-12">
                    <Header />
                </div>
                <div className="col-lg-2">
                    <Sidenav />
                </div>
                <div className="col-lg-10">
                    <div>
                        <div className="comhed">
                            <button className="comadbtn" id='branchadbtn' onClick={() => {
                                setdispbranch(true)
                                document.getElementById('branchadbtn').style.display = 'none';
                            }} >Add</button>
                            <h5>Branches</h5>
                            <h6>Manage Users / Branches</h6>
                        </div>
                        <div className="tablepadding">
                            {dispbranch == false ? <BranchesTble branch={branchdata} countrydat={countrydat} statedat={statedat} /> : <AddBranches />}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}



export default Branches;