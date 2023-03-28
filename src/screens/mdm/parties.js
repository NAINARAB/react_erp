import React, { useState, useEffect } from "react";
import Header from "../../comp/header/header";
import Sidenav from "../../comp/sidenav/sidenav";
import {
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, IconButton, Chip,
    Slide, Box, Collapse, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper
} from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import '../common.css';
import Loader from "../../comp/Load/loading";
import axios from "axios";


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

let count = 0;


let PartyComp = (props) => {
    const { propobj } = props;
    const { partytypedata } = props;
    const { statedata } = props;
    const { countrydata } = props;
    const { rowcount } = props;
    const [open, setOpen] = useState(false);
    const [pk, setpk] = useState();
    const [delproname, setdelproname] = useState('');
    const [Dopen, setDOpen] = useState(false);

    {/* Update req variables */ }

    const [Uopen, setUopen] = useState(false);
    const [updtpk, setupdtpk] = useState();

    const [upprtnem, setupprtnme] = useState('');
    const [upprtcntry, setupprtcntry] = useState();
    const [upprtcntryget, setupprtcntryget] = useState('');
    const [upprttyp, setupprttyp] = useState();
    const [upprttypget, setupprttypget] = useState('');
    const [upprtstat, setupprtstat] = useState();
    const [upprtstatget, setupprtstatget] = useState('');
    const [upprtadr, setupprtadr] = useState('');
    const [upprtpin, setupupprtpin] = useState('');
    const [upprtconno, setupupprtconno] = useState();
    const [upprtconnme, setupupprtconnme] = useState('');
    const [upprtemil, setupupprtemil] = useState('');
    const [upprtgstin, setupupprtgstin] = useState('');

    const handleClickOpen = () => {
        setDOpen(true);
    };

    const handleClose = () => {
        setDOpen(false);
    };

    const UhandleClickOpen = () => {
        setUopen(true);
    };

    const UhandleClose = () => {
        setUopen(false);
    };

    const cntryupdt = axios.create({ //party
        baseURL: `https://erp-test-3wqc9.ondigitalocean.app/api/get?model=parties&pk=${updtpk}`
    });


    const updtParties = (prtnem, prtcntry, prttyp, prtstat, prtadres, prtpincod, prtconno, prtconnme, prtemil, prtgstin) => {
        cntryupdt.put('', {
            party_name: prtnem,
            party_country: prtcntry,
            party_type: prttyp,
            party_state: prtstat,
            party_address: prtadres,
            party_pincode: prtpincod,
            party_contact_no: prtconno,
            party_contact_name: prtconnme,
            party_email: prtemil,
            party_gstin: prtgstin
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
        updtParties(upprtnem, upprtcntry, upprttyp, upprtstat, upprtadr, upprtpin, upprtconno, upprtconnme, upprtemil, upprtgstin);
    }

    function doDelete() {
        deleteRow(pk);
    }

    const deleteRow = (pkobj) => {
        console.log(pkobj)
        let currentpk = pkobj;
        const deleterowurl = axios.create({
            baseURL: `https://erp-test-3wqc9.ondigitalocean.app/api/get?model=parties&pk=${currentpk}`
        });

        deleterowurl.delete('', {
        })
            .then((response) => {
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <>
            <React.Fragment>
                <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} hover={true} onClick={() => setOpen(!open)} key={count}>
                    <TableCell align="center" component="th" scope="row">
                        {rowcount}
                    </TableCell>
                    <TableCell align="center">{propobj.party_name == null ? "Null" : propobj.party_name}</TableCell>
                    <TableCell align="center">{propobj.party_type_get == null ? "Null" : propobj.party_type_get}</TableCell>
                    <TableCell align="center">{propobj.party_contact_no == null ? "Null" : propobj.party_contact_no}</TableCell>
                    <TableCell align="center">{propobj.party_contact_name == null ? "Null" : propobj.party_contact_name}</TableCell>
                    <TableCell align="center">{propobj.party_email == null ? "Null" : propobj.party_email}</TableCell>
                    <TableCell align="center">{propobj.party_gstin == null ? "Null" : propobj.party_gstin}</TableCell>
                    <TableCell >{Object.entries(propobj.party_products).map(([prtprokey, prtprovalue]) => {
                        return (
                            <li>
                                {prtprovalue.product}
                            </li>
                        );

                    })}</TableCell>
                    <TableCell >
                        <IconButton aria-label="expand row" size="small"
                            onClick={() => {
                                setupdtpk(propobj.pk); setupprtnme(propobj.party_name); setupprttyp(propobj.party_type); setupprttypget(propobj.party_type_get); setupupprtpin(propobj.party_pincode);
                                setupupprtconno(propobj.party_contact_no); setupupprtconnme(propobj.party_contact_name); setupupprtemil(propobj.party_email);
                                setupupprtgstin(propobj.party_gstin); setupprtadr(propobj.party_address); setupprtcntry(propobj.party_country);
                                setupprtcntryget(propobj.party_country_get); setupprtstat(propobj.party_state); setupprtstatget(propobj.party_state_get);
                                UhandleClickOpen();
                            }}
                        ><EditIcon /></IconButton>

                        <IconButton aria-label="expand" onClick={() => { setpk(propobj.pk); setdelproname(propobj.party_name); handleClickOpen(); }}
                            size="small" sx={{ color: 'rgba(255, 0, 0, 0.755)' }}>
                            <DeleteIcon /></IconButton>

                        <IconButton
                            aria-label="expand"
                            size="small"
                            onClick={() => setOpen(!open)}
                        >
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </TableCell>
                </TableRow>

                <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box sx={{ margin: 3 }}>
                                <TableContainer>
                                    <Table size="small" sx={{ width: '50%', background: 'transparant' }}>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="center" sx={{ padding: '1em', fontWeight: 'bold', fontSize: '0.9rem', borderBottom: '0px solid transparent' }}>Country</TableCell>
                                                <TableCell align="center" sx={{ padding: '1em', fontWeight: 'bold', fontSize: '0.9rem', borderBottom: '0px solid transparent' }}>State</TableCell>
                                                <TableCell align="center" sx={{ padding: '1em', fontWeight: 'bold', fontSize: '0.9rem', borderBottom: '0px solid transparent' }}>Address</TableCell>
                                                <TableCell align="center" sx={{ padding: '1em', fontWeight: 'bold', fontSize: '0.9rem', borderBottom: '0px solid transparent' }}>Pin Code</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell align="center" sx={{ borderBottom: '0px solid transparent' }}>{propobj.party_country_get == null ? "Null" : propobj.party_country_get}</TableCell>
                                                <TableCell align="center" sx={{ borderBottom: '0px solid transparent' }}>{propobj.party_state_get == null ? "Null" : propobj.party_state_get}</TableCell>
                                                <TableCell align="center" sx={{ borderBottom: '0px solid transparent' }}>{propobj.party_address == null ? "Null" : propobj.party_address}</TableCell>
                                                <TableCell align="center" sx={{ borderBottom: '0px solid transparent' }}>{propobj.party_pincode == null ? "Null" : propobj.party_pincode}</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </React.Fragment>
            <div>
                <Dialog
                    open={Dopen}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Do You Want To Delete ? "}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            <b style={{ color: 'black' }}>Party Name: &emsp;{delproname}</b>
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
            <form>
                <Dialog
                    open={Uopen}
                    onClose={UhandleClose}
                    TransitionComponent={Transition}
                >
                    <div className="comhed">
                        <h5>Update Parties</h5>
                    </div>
                    <DialogTitle id="alert-dialog-title">
                        {"Row Details :  "}
                    </DialogTitle>
                    <DialogContent>

                        <div className="row">
                            <div className="col-lg-4">
                                <label className="micardlble">Party Type</label><br />
                                <select className="micardinpt" onChange={(e) => { setupprttyp(e.target.value) }}>
                                    <option defaultValue={true} value={upprttyp} >{upprttypget}</option>
                                    {partytypedata.map(prtobj => (
                                        <option>{prtobj.party_type}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="col-lg-4">
                                <label className="micardlble">Party Name</label><br />
                                <input className="micardinpt" value={upprtnem} onChange={(e) => { setupprtnme(e.target.value) }} required />
                            </div>

                            <div className="col-lg-4">
                                <label className="micardlble">Contact No</label><br />
                                <input type='number' value={upprtconno} onChange={(e) => { setupupprtconno(e.target.value) }} className="micardinpt" />
                            </div>

                            <div className="col-lg-4">
                                <label className="micardlble">Contact Name</label><br />
                                <input className="micardinpt" value={upprtconnme} onChange={(e) => { setupupprtconnme(e.target.value) }} required />
                            </div>

                            <div className="col-lg-4">
                                <label className="micardlble">Email</label><br />
                                <input type='email' className="micardinpt" value={upprtemil} onChange={(e) => { setupupprtemil(e.target.value) }} required />
                            </div>

                            <div className="col-lg-4">
                                <label className="micardlble">GSTIN</label><br />
                                <input className="micardinpt" value={upprtgstin} onChange={(e) => { setupupprtgstin(e.target.value) }} required />
                            </div>


                            <div className="col-lg-4">
                                <label className="micardlble">Country</label><br />
                                <select className="micardinpt" onChange={(e) => { setupprtcntry(e.target.value) }} required>
                                    <option defaultValue={true} value={upprtcntry}>{upprtcntryget}</option>
                                    {countrydata.map(cntryobj => (
                                        <option value={cntryobj.pk}>{cntryobj.country_name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="col-lg-4">
                                <label className="micardlble">State</label><br />
                                <select className="micardinpt" onChange={(e) => { setupprtstat(e.target.value) }} required>
                                    <option value={upprtstat} defaultValue={true}>{upprtstatget}</option>
                                    {statedata.map(statobj => (
                                        <option value={statobj.pk}>{statobj.state_name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="col-lg-4">
                                <label className="micardlble">Address</label><br />
                                <input className="micardinpt" value={upprtadr} onChange={(e) => { setupprtadr(e.target.value) }} required />
                            </div>

                            <div className="col-lg-4">
                                <label className="micardlble">Pin Code</label><br />
                                <input type='number' value={upprtpin} className="micardinpt" onChange={(e) => { setupupprtpin(e.target.value) }} required />
                            </div>

                            

                        </div><br />
                        <button className="comadbtn" onClick={doPUT} type={"submit"} style={{ marginBottom: 'unset' }}>Update</button>
                        <button className="cancelbtn" onClick={UhandleClose} >Discord</button>
                    </DialogContent>
                </Dialog>
            </form>
        </>
    );
}


function Parties() {
    const [dispparties, setdispparties] = useState(false);
    const [partydata, setpartydata] = useState([]);
    const [partytypedat, setpartytypedat] = useState([]);
    const [countrydat, setcountrydat] = useState([]);
    const [statedat, setstatedat] = useState([]);
    const [productdat, setproductdat] = useState([]);
    const [rawmatdat, setrawmatdat] = useState([]);

    useEffect(() => {

        fetch('https://erp-test-3wqc9.ondigitalocean.app/api/get?model=parties')
            .then((res) => { return res.json(); })
            .then((resdata) => {
                setpartydata(resdata.data);
            })
        fetch('https://erp-test-3wqc9.ondigitalocean.app/api/get?model=partytype')
            .then((res) => { return res.json(); })
            .then((data) => {
                setpartytypedat(data.data)
            })
        fetch('https://erp-test-3wqc9.ondigitalocean.app/api/get?model=country')
            .then((res) => { return res.json(); })
            .then((data) => {
                setcountrydat(data.data);
            })
        fetch('https://erp-test-3wqc9.ondigitalocean.app/api/get?model=state')
            .then((res) => { return res.json(); })
            .then((data) => {
                setstatedat(data.data);//product
            })
        fetch('https://erp-test-3wqc9.ondigitalocean.app/api/get?model=product')
            .then((res) => { return res.json(); })
            .then((data) => {
                setproductdat(data.data);
            })
        fetch('https://erp-test-3wqc9.ondigitalocean.app/api/get?model=rawmaterial')
            .then((res) => { return res.json(); })
            .then((data) => {
                setrawmatdat(data.data);
            })

    }, [])



    function AddParties() {

        const [partyname, setpartyname] = useState('');
        const [partycountry, setpartycountry] = useState();
        const [partytype, setpartytype] = useState(0);
        const [partystate, setpartystate] = useState();
        const [partyaddress, setpartyaddress] = useState('');
        const [partypincode, setpartypincode] = useState('');
        const [partycontactno, setpartycontactno] = useState('');
        const [partycontactname, setpartycontactname] = useState('');
        const [partyemail, setpartyemail] = useState('');
        const [partygstin, setpartygstin] = useState('');
        const [partyproducts, setpartyproducts] = useState([]);
        const [unt, setunt] = useState();
        const [totproarr, settotproarr] = useState([]);

        let prtpro = null;



        const partypost = axios.create({
            baseURL: "https://erp-test-3wqc9.ondigitalocean.app/api/get?model=parties"
        });

        const postParties = (nme, cntry, type, state, adres, pin, cntno, cntnme, emil, gst,totpro) => {
            partypost.post('', {
                party_name: nme,
                party_country: cntry,
                party_type: type,
                party_state: state,
                party_address: adres,
                party_pincode: pin,
                party_contact_no: cntno,
                party_contact_name: cntnme,
                party_email: emil,
                party_gstin: gst,
                party_products: totpro
            })
                .then((res) => {
                    console.log("after then", res)
                    if (res.data.status === 'success') {
                        alert("Post Successfully");
                        console.log("Posted the data")
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
            postParties(partyname, partycountry, partytype, partystate, partyaddress, partypincode,
                partycontactno, partycontactname, partyemail, partygstin, totproarr);
        }

        return (
            <form>
                <div className="micard">
                    <h5 className="micardhdr">Add Parties</h5>
                    <div className="micardbdy row">

                        <div className="col-lg-4">
                            <label className="micardlble">Party Type</label><br />
                            <select className="micardinpt" onChange={(e) => { setpartytype(e.target.value) }} required>
                                <option selected='true' disabled='true' value={''} >Select Type</option>
                                {partytypedat.map(prtobj => (
                                    <option value={prtobj.pk}>{prtobj.party_type}</option>
                                ))}
                            </select>
                        </div>

                        <div className="col-lg-4">
                            <label className="micardlble">Party Name</label><br />
                            <input className="micardinpt" onChange={(e) => { setpartyname(e.target.value) }} required />
                        </div>

                        <div className="col-lg-4">
                            <label className="micardlble">Contact No</label><br />
                            <input type='number' onChange={(e) => { setpartycontactno(e.target.value) }} className="micardinpt" required />
                        </div>

                        <div className="col-lg-4">
                            <label className="micardlble">Contact Name</label><br />
                            <input className="micardinpt" onChange={(e) => { setpartycontactname(e.target.value) }} required />
                        </div>

                        <div className="col-lg-4">
                            <label className="micardlble">Email</label><br />
                            <input type='email' className="micardinpt" onChange={(e) => { setpartyemail(e.target.value) }} required />
                        </div>

                        <div className="col-lg-4">
                            <label className="micardlble">GSTIN</label><br />
                            <input type='number' className="micardinpt" onChange={(e) => { setpartygstin(e.target.value) }} required />
                        </div>


                        <div className="col-lg-4">
                            <label className="micardlble">Country</label><br />
                            <select className="micardinpt" onChange={(e) => { setpartycountry(e.target.value) }} required>
                                <option disabled={true} selected={true} value="">Select Country</option>
                                {countrydat.map(cntryobj => (
                                    <option value={cntryobj.pk}>{cntryobj.country_name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="col-lg-4">
                            <label className="micardlble">State</label><br />
                            <select className="micardinpt" onChange={(e) => { setpartystate(e.target.value) }} required>
                                <option value="" disabled={true} selected={true}>Select State</option>
                                {statedat.map(statobj => (
                                    <option value={statobj.pk}>{statobj.state_name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="col-lg-4">
                            <label className="micardlble">Address</label><br />
                            <input className="micardinpt" onChange={(e) => { setpartyaddress(e.target.value) }} required />
                        </div>

                        <div className="col-lg-4">
                            <label className="micardlble">Pin Code</label><br />
                            <input type='number' className="micardinpt" onChange={(e) => { setpartypincode(e.target.value) }} required />
                        </div><div className="col-lg-4 padzero"></div><div className="col-lg-4 padzero"></div>

                        <div className="col-lg-4">
                            <label className="micardlble">Products</label><br />
                            <select className="micardinpt" onChange={(e) => { setpartyproducts(e.target.value) }} required>
                                <option value="" disabled={true} selected={true}>Select Products</option>

                                {partytype == 8 ? productdat.map(prob => {//customer
                                    return (
                                        <>
                                            {prob.product_type === 'finished' ? <option>{prob.product_name}</option> : null}
                                        </>
                                    );
                                }) : null}

                                {partytype == 10 ? productdat.map(prob => {//supplier
                                    return (
                                        <>
                                            {prob.product_type === 'semi-finished' ? <option>{prob.product_name}</option> : null}
                                        </>
                                    );
                                }) : null}

                                {partytype == 10 ? rawmatdat.map(rmob => (//supplier
                                    <option>{rmob.rm_name}</option>
                                )) : null}

                                {partytype != 10 && partytype != 8 && partytype != 0 ? productdat.map(proobj => (//not customer and supplier
                                    <option>{proobj.product_name}</option>
                                )) : null}

                                {partytype != 10 && partytype != 8 && partytype != 0 ? rawmatdat.map(proobj => (
                                    <option>{proobj.rm_name}</option>
                                )) : null}
                            </select><br /><br />

                            <label className="micardlble">Unit Price</label>
                            <input type='number' className="micardinpt" onChange={(e) => { setunt(e.target.value); }} required />

                            <button className="comadbtn" style={{ float: 'unset', marginTop: '1em', marginBottom: 'unset' }}
                                onClick={(e) => { 
                                    e.preventDefault();
                                    settotproarr(obj => [...obj, {"product":partyproducts,"unit_price":unt}]);
                                console.log(totproarr); }}
                            >Add <ArrowForwardIcon sx={{ fontSize: '1em' }} />
                            </button>
                        </div>

                        <div className="col-lg-8" style={{padding:'1em'}}>
                            <label className="micardlble">Products</label>
                            <div style={{ border: '1px solid #d9d7d7', height: '10em', borderRadius: '6px', padding: '10px' }}>
                                {totproarr.map((arob,index) => {
                                    return (
                                        <>
                                            <Chip label={arob.product + " - " + arob.unit_price} sx={{margin:'2px'}} onDelete={
                                                () => {settotproarr([])}
                                            } />
                                        </>
                                    );
                                })}
                            </div>
                        </div>

                    </div>
                </div><br />
                <button className="comadbtn" onClick={doPost}>Add</button>
                <button className="cancelbtn" onClick={() => {
                    setdispparties(false);
                    document.getElementById("prtyadbtn").style.display = 'block';
                }}>Back</button>
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
                        <button className="comadbtn" id="prtyadbtn" onClick={() => {
                            setdispparties(<AddParties />);
                            document.getElementById("prtyadbtn").style.display = 'none';
                        }}>Add</button>
                        <h5>Parties</h5>
                        <h6>Master Data Management / Parties </h6>
                    </div>
                    <div className="tablepadding">
                        {dispparties === false ? <>
                            {partydata.length !== 0 ? <TableContainer component={Paper} sx={{ maxHeight: 640 }}>
                                <Table stickyHeader aria-label="collapsible table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={{ backgroundColor: 'rgb(15, 11, 42)', fontWeight: 'bold', color: 'white' }} align="center">S.No</TableCell>
                                            <TableCell sx={{ backgroundColor: 'rgb(15, 11, 42)', fontWeight: 'bold', color: 'white' }} align="center">Party Name</TableCell>
                                            <TableCell sx={{ backgroundColor: 'rgb(15, 11, 42)', fontWeight: 'bold', color: 'white' }} align="center">Party Type</TableCell>
                                            <TableCell sx={{ backgroundColor: 'rgb(15, 11, 42)', fontWeight: 'bold', color: 'white' }} align="center">Contact No</TableCell>
                                            <TableCell sx={{ backgroundColor: 'rgb(15, 11, 42)', fontWeight: 'bold', color: 'white' }} align="center">Contact Name</TableCell>
                                            <TableCell sx={{ backgroundColor: 'rgb(15, 11, 42)', fontWeight: 'bold', color: 'white' }} align="center">Email</TableCell>
                                            <TableCell sx={{ backgroundColor: 'rgb(15, 11, 42)', fontWeight: 'bold', color: 'white' }} align="center">GSTIN</TableCell>
                                            <TableCell sx={{ backgroundColor: 'rgb(15, 11, 42)', fontWeight: 'bold', color: 'white' }}  >Products</TableCell>
                                            <TableCell sx={{ backgroundColor: 'rgb(15, 11, 42)', fontWeight: 'bold', color: 'white' }}>Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {partydata.map(propobject => (
                                            <PartyComp propobj={propobject} partytypedata={partytypedat} countrydata={countrydat} statedata={statedat}
                                                rowcount={
                                                    (partydata.length + 1) - (partydata.length - count++)
                                                } />
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer> : <Loader />} </> : <AddParties />}
                    </div>
                </div>
            </div>
        </>
    );
}


export default Parties;