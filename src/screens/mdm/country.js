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
import { Link } from "react-router-dom";



const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Country = () => {
    const [dispcountry, setdispcountry] = useState(false);
    const [countrydata, setcountrydata] = useState([]);

    const token = sessionStorage.getItem("token");

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
                setcountrydata(data.data);
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


    const Countrycomp = (props) => {
        const { countrys } = props;
        let count = 0;
        const [pk, setpk] = useState();
        const [delproname, setdelproname] = useState('');
        const [open, setOpen] = useState(false);


        {/* Update variables */ }
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
            baseURL: `https://erp-tiarx.ondigitalocean.app/api/get?model=country&pk=${updtpk}`
        });

        const updtCountry = (cod, nme) => {
            cntryupdt.put('', {
                country_code: cod,
                country_name: nme
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
            updtCountry(udcnrycod, udcnrynme);
        }

        const deleteRow = (pkobj) => {
            let currentpk = pkobj;
            const deleterowurl = axios.create({ //phase
                baseURL: `https://erp-tiarx.ondigitalocean.app/api/get?model=country&pk=${currentpk}`
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
        const [searchoption, setsearchoption] = useState('');
        const [searchdata, setsearchdata] = useState('');
        return (
            <>
                <div className="search">
                    <select className='micardgrpinpt' style={{ padding: '0.58em', width: '50%' }} onChange={(e) => {
                        setsearchoption(e.target.value);
                        setsearchdata('');
                    }} placeholder="Search Options..">
                        <option value="" defaultValue={true} disabled={true} selected={true} >Search By.. </option>
                        <option value={'country_code'}>Country Code</option>
                        <option value={'country_name'}>Country Name</option>
                    </select>
                    <input type={'search'} className='micardgrpinpt1' value={searchdata} disabled={searchoption == '' ? true : false}
                        placeholder="Type Here...."
                        onChange={(e) => {
                            setsearchdata(e.target.value);
                        }} style={{ width: '50%' }} list="serchopt" />
                    <datalist id="serchopt">
                        {searchoption == 'country_code' ?
                            <>
                                {countrys.map(cob => (
                                    <option>{cob.country_code}</option>
                                ))}
                            </> : null
                        }
                        {searchoption == 'country_name' ?
                            <>
                                {countrys.map(cob => (
                                    <option>{cob.country_name}</option>
                                ))}
                            </> : null}
                    </datalist>
                </div>
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
                                {searchdata == '' ?
                                    <>
                                        {countrys.map((cntry) => (
                                            <TableRow hover={true}>
                                                <TableCell >{++count}</TableCell>
                                                <TableCell >{cntry.country_code}</TableCell>
                                                <TableCell>{cntry.country_name}</TableCell>
                                                <TableCell align="left">
                                                    <IconButton aria-label="expand row" size="small"
                                                        onClick={() => {
                                                            setudcnrycod(cntry.country_code); setudcnrynme(cntry.country_name);
                                                            setupdtpk(cntry.pk); UhandleClickOpen();
                                                        }}
                                                    ><EditIcon /></IconButton>
                                                    <IconButton aria-label="expand row" size="small"
                                                        onClick={() => { setpk(cntry.pk); setdelproname(cntry.country_name); handleClickOpen(); }}
                                                        sx={{ color: 'rgba(255, 0, 0, 0.755)', marginRight: '1em' }}><DeleteIcon /></IconButton></TableCell>
                                            </TableRow>
                                        ))}</> :
                                    <>
                                        {countrys.map((cntry) => (
                                            <>
                                                {cntry.country_code.match(searchdata) == searchdata || cntry.country_name.match(searchdata) == searchdata ?
                                                    <TableRow hover={true}>
                                                        <TableCell >{++count}</TableCell>
                                                        <TableCell >{cntry.country_code}</TableCell>
                                                        <TableCell>{cntry.country_name}</TableCell>
                                                        <TableCell align="left">
                                                            <IconButton aria-label="expand row" size="small"
                                                                onClick={() => {
                                                                    setudcnrycod(cntry.country_code); setudcnrynme(cntry.country_name);
                                                                    setupdtpk(cntry.pk); UhandleClickOpen();
                                                                }}
                                                            ><EditIcon /></IconButton>
                                                            <IconButton aria-label="expand row" size="small"
                                                                onClick={() => { setpk(cntry.pk); setdelproname(cntry.country_name); handleClickOpen(); }}
                                                                sx={{ color: 'rgba(255, 0, 0, 0.755)', marginRight: '1em' }}><DeleteIcon /></IconButton></TableCell>
                                                    </TableRow> : null}
                                            </>
                                        ))}
                                    </>}
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
                                    <input className="micardinpt" value={udcnrycod} onChange={(e) => { setudcnrycod(e.target.value) }} required />
                                </div>

                                <div className="col-lg-6 editscrn">
                                    <label className="micardlble" >Country Name</label><br />
                                    <input className="micardinpt" value={udcnrynme} onChange={(e) => { setudcnrynme(e.target.value) }} required />
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




    const AddCountry = () => {
        const [countryinpt, setcountryinpt] = useState('');
        const [countrycode, setcountrycode] = useState('');
        const postcountryinpt = axios.create({
            baseURL: "https://erp-tiarx.ondigitalocean.app/api/get?model=country"
        });

        const postcountry = (country, code) => {
            postcountryinpt.post('', {
                country_name: country,
                country_code: code
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
                        setalrmes("New Country Added");
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
            postcountry(countryinpt, countrycode);
        }
        return (
            <>
                <form onSubmit={doPost}>
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
                    <button className="comadbtn" type="submit">Add</button>
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
                <Sidenav currentmodule={'Admin'} currentbutton={'Configuration'} currentpage={'Country'} />
                </div>
                <div className="col-lg-10">
                    <div className="comhed">
                        <button className="comadbtn" id="countryadbtn" onClick={() => {
                            setdispcountry(true)
                            document.getElementById("countryadbtn").style.display = 'none';
                        }}>Add</button>
                        <h5>Country</h5>
                        <h6>Admin / Master Data Management / Country </h6>
                    </div>
                    <div className="tablepadding">
                        {token == null || token == '' ?
                        <h2>Please Login..&emsp; <Link to={'/'}>Login Page</Link></h2>
                        :
                        <>
                        {dispcountry === false ? <Countrycomp countrys={countrydata} /> : <AddCountry />}
                        </>}
                    </div>
                </div>
            </div>
        </>
    );

}

export default Country;