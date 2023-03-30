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


let Countrycomp = (props) => {
    const { countrys } = props;
    let count = 0;
    const [pk, setpk] = useState();
    const [delproname, setdelproname] = useState('');
    const [open, setOpen] = useState(false);
    

    {/* Update variables */}
    const [Uopen, setUopen] = useState(false);
    const [udcnrycod, setudcnrycod] = useState('');
    const [udcnrynme, setudcnrynme] = useState('');
    const [updtpk, setupdtpk] = useState();

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

    const cntryupdt = axios.create({ //country
        baseURL: `https://erp-test-3wqc9.ondigitalocean.app/api/get?model=country&pk=${updtpk}`
    });
    console.log("Crnt updt PK",updtpk);

    const updtCountry = (cod, nme) => {
        cntryupdt.put('', {
            country_code: cod,
            country_name:nme
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
        updtCountry(udcnrycod,udcnrynme);
    }

    const deleteRow = (pkobj) => {
        console.log(pkobj)
        let currentpk = pkobj;
        const deleterowurl = axios.create({ //phase
            baseURL: `https://erp-test-3wqc9.ondigitalocean.app/api/get?model=country&pk=${currentpk}`
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
            {countrys.length != 0 ?
                <TableContainer component={Paper} sx={{ maxHeight: 650 }}>
                    <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell variant="head" align="left" Width={90} sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white', fontWeight: 'bold' }}>S.No</TableCell>
                                <TableCell variant="head" align="left" Width={200} sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white', fontWeight: 'bold' }}>Country Code</TableCell>
                                <TableCell variant="head" align="left" width={maxWidth} sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white', fontWeight: 'bold' }}>Country</TableCell>
                                <TableCell variant="head" align="left" width={200} sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white', fontWeight: 'bold' }}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {countrys.map((cntry) => (
                                <TableRow hover='true'>
                                    <TableCell >{++count}</TableCell>
                                    <TableCell >{cntry.country_code}</TableCell>
                                    <TableCell>{cntry.country_name}</TableCell>
                                    <TableCell align="left">
                                    <IconButton aria-label="expand row" size="small" 
                                        onClick={() => {setudcnrycod(cntry.country_code); setudcnrynme(cntry.country_name);
                                         setupdtpk(cntry.pk); UhandleClickOpen();}}
                                    ><EditIcon /></IconButton>
                                        <IconButton aria-label="expand row" size="small"
                                        onClick={() => { setpk(cntry.pk); setdelproname(cntry.country_name); handleClickOpen(); }}
                                        sx={{ color: 'rgba(255, 0, 0, 0.755)', marginRight: '1em' }}><DeleteIcon /></IconButton></TableCell>
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
                            <b style={{ color: 'black' }}>Country Name: &emsp;{delproname}</b>
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
                        <h5>Update Country</h5>
                    </div>
                    <DialogTitle id="alert-dialog-title">
                        {"Row Details :  "}
                    </DialogTitle>
                    <DialogContent>

                        <div className="row">
                            <div className="col-lg-6 editscrn">
                                <label className="micardlble" >Country Code</label><br />
                                <input className="micardinpt" value={udcnrycod} onChange={(e) => {setudcnrycod(e.target.value)}} required />
                            </div>

                            <div className="col-lg-6 editscrn">
                                <label className="micardlble" >Country Name</label><br />
                                <input className="micardinpt" value={udcnrynme} onChange={(e) => {setudcnrynme(e.target.value)}} required />
                            </div>
                            
                        </div><br />
                        <button className="comadbtn" onClick={doPUT} style={{marginBottom:'unset'}}>Update</button>
                    <button className="cancelbtn" onClick={UhandleClose} >Discord</button>
                    </DialogContent>
                </Dialog><br />
            </div>
        </>
    );
}


function Country() {
    const [dispcountry, setdispcountry] = useState(false);
    const [countrydata, setcountrydata] = useState([]);


    useEffect(() => {
        fetch('https://erp-test-3wqc9.ondigitalocean.app/api/get?model=country')
            .then((res) => { return res.json(); })
            .then((data) => {
                setcountrydata(data.data);
            })
    }, [])

    function AddCountry() {
        const [countryinpt, setcountryinpt] = useState('');
        const [countrycode, setcountrycode] = useState('');
        const postcountryinpt = axios.create({
            baseURL: "https://erp-test-3wqc9.ondigitalocean.app/api/get?model=country"
        });

        const postcountry = (country,code) => {
            postcountryinpt.post('', {
                country_name: country,
                country_code: code
            })
                .then((res) => {
                    console.log("after then", res)
                    if (res.data.status === 'success') {
                        alert("Country Added");
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
            postcountry(countryinpt,countrycode);
        }
        return (
            <>
                <form>
                    <div className="micard">
                        <h5 className="micardhdr">Add Country</h5>
                        <div className="micardbdy row">
                        <div className="col-lg-4">
                                <label className="micardlble" >Country Code</label><br />
                                <input className="micardinpt" onChange={(e) => { setcountrycode(e.target.value) }} required />
                            </div>
                            <div className="col-lg-4">
                                <label className="micardlble" >Country</label><br />
                                <input className="micardinpt" onChange={(e) => { setcountryinpt(e.target.value) }} required />
                            </div>
                            <div className="col-lg-4"></div>
                        </div>
                    </div><br />
                    <button className="comadbtn" type="submit" onClick={doPost}>Add</button>
                    <button className="cancelbtn" onClick={() => {
                        setdispcountry(false)
                        document.getElementById('countryadbtn').style.display = 'block';
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
                        <button className="comadbtn" id="countryadbtn" onClick={() => {
                            setdispcountry(true)
                            document.getElementById("countryadbtn").style.display = 'none';
                        }}>Add</button>
                        <h5>Country</h5>
                        <h6>Master Data Management / Country </h6>
                    </div>
                    <div className="tablepadding">
                        {dispcountry === false ? <Countrycomp countrys={countrydata} /> : <AddCountry />}
                    </div>
                </div>
            </div>
        </>
    );

}

export default Country;