import React from "react";
import Header from "../../comp/header/header";
import Sidenav from "../../comp/sidenav/sidenav";
import {
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Slide, Autocomplete, Chip, TextField,
    TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper, IconButton
} from "@mui/material";
import '../common.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useState, useEffect } from "react";
import Loader from "../../comp/Load/loading";
import SearchIcon from '@mui/icons-material/Search';
import axios from "axios";

const token = sessionStorage.getItem("token");

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


function Rawmaterialsaccessories() {

    const [dispaddrma, setdispaddrma] = useState(false);
    const [partydat, setpartydat] = useState([]);
    const [prty, setprty] = useState([]);
    const [rmadata, setrmadata] = useState([]);
    let count = 0;
    const [pk, setpk] = useState();
    const [delproname, setdelproname] = useState('');
    const [open, setOpen] = useState(false);

    const [curncydat, setcurncydat] = useState([]);
    const [measurdunit, setmeasuredunit] = useState([]);

    // let optsub=[];
    // partydat.map(tryobj => {
    //     let ob = {"pks": tryobj.pk,"partyname" : tryobj.party_name};
    //     optsub.push(ob);
    // })
    // console.log(optsub);

    useEffect(() => {
        fetch('https://erp-test-3wqc9.ondigitalocean.app/api/get?model=currency',
        {
            headers: {
                'Authorization': `token ${token}`
            }
        })
            .then((res) => { return res.json(); })
            .then((data) => {
                setcurncydat(data.data);
            })
        fetch('https://erp-test-3wqc9.ondigitalocean.app/api/get?model=measuredunits',
        {
            headers: {
                'Authorization': `token ${token}`
            }
        })
            .then((res) => { return res.json(); })
            .then((data) => {
                setmeasuredunit(data.data);
            })
        fetch('https://erp-test-3wqc9.ondigitalocean.app/api/get?model=parties',
        {
            headers: {
                'Authorization': `token ${token}`
            }
        })
            .then((res) => { return res.json(); })
            .then((resdata) => {
                setpartydat(resdata.data);
            })
    }, [])

    {/* Update RMA variables */ }
    const [Uopen, setUopen] = useState(false);
    const [updtpk, setupdtpk] = useState();
    const [uprmnme, setuprmnme] = useState('');
    const [uprmcod, setuprmcod] = useState('');
    const [uprmesunt, setuprmeunt] = useState();
    const [uprmesuntget, setuprmesuntget] = useState('');
    const [upminstk, setupminstk] = useState();
    const [uprmmaxpr, setuprmmaxpr] = useState();
    const [upcrncy, setupcrncy] = useState();
    const [upcrncyget, setupcrncyget] = useState('');
    const [uppresubid, setuppresubid] = useState();
    const [uptotsubid, setuptotsubid] = useState([]);
    // const [uppresup, setpresup] = useState([]);

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

    const rmaupdt = axios.create({
        baseURL: `https://erp-test-3wqc9.ondigitalocean.app/api/get?model=rawmaterial&pk=${updtpk}`
    });

    const updtRMA = (rmn, rmc, mu, ms, rmp, crcy, upsup) => {
        rmaupdt.put('', {
            rm_name: rmn,
            rm_code: rmc,
            measured_unit: mu,
            min_stock: ms,
            rm_max_price: rmp,
            currency: crcy,
            preferred_supplier: upsup
        },
        {
            headers: {
                'Authorization': `token ${token}`
            }
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
        updtRMA(uprmnme, uprmcod, uprmesunt, upminstk, uprmmaxpr, upcrncy, uptotsubid);
    }

    function opnAdd() {
        document.getElementById('adbtn').style.display = 'none';
        document.getElementById('rma').style.display = 'none';
        setdispaddrma(true);
    }
    function opnRMA() {
        document.getElementById('rma').style.display = 'block';
        document.getElementById('adbtn').style.display = 'block';
        setdispaddrma(false);
    }



    let AddRMA = () => {
        const [rmname, setrmname] = useState('');
        const [rmcode, setrmcode] = useState('')
        const [units, setunits] = useState();
        const [minstock, setminstock] = useState();
        const [currency, setcurrency] = useState();
        const [rmmaxprice, setrmmaxprice] = useState();
        const [presubid, setpresubid] = useState([]);
        const [presubpk, setpresubpk] = useState();
        const [totsubid, settotsubid] = useState([]);


        const rmapost = axios.create({
            baseURL: "https://erp-test-3wqc9.ondigitalocean.app/api/get?model=rawmaterial"
        });

        const postrma = (rmcode, rmname, unit, minstock, rmmaxprice, currency, psu) => {
            rmapost.post('', {
                rm_code: rmcode,
                rm_name: rmname,
                measured_unit: unit,
                min_stock: minstock,
                rm_max_price: rmmaxprice,
                currency: currency,
                preferred_supplier: psu

            },
            {
                headers: {
                    'Authorization': `token ${token}`
                }
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
            postrma(rmcode, rmname, units, minstock, rmmaxprice, currency, totsubid);
            window.location.reload();
        }



        return (
            <>
                <form>
                    <div className="tablepadding">
                        <div className="micard">
                            <h5 className="micardhdr">Raw Material & Accessories</h5>
                            <div className="micardbdy row">

                                <div className="col-lg-4">
                                    <label className="micardlble">Raw Material</label><br />
                                    <input className="micardinpt" onChange={(e) => setrmname(e.target.value)} required />
                                </div>

                                <div className="col-lg-4">
                                    <label className="micardlble">RM Code</label><br />
                                    <input className="micardinpt" onChange={(e) => setrmcode(e.target.value)} required />
                                </div>

                                <div className="col-lg-4">
                                    <label className="micardlble">Units</label><br />
                                    <select className="micardinpt" onChange={(e) => setunits(e.target.value)}>
                                        <option defaultValue={true} value={''} required>Select Type</option>
                                        {measurdunit.map(unitobj => (
                                            <>
                                                <option value={unitobj.pk}>{unitobj.measured_unit_name}</option>
                                            </>
                                        ))}
                                    </select>
                                </div>

                                <div className="col-lg-4">
                                    <label className="micardlble">Min Stock</label><br />
                                    <input type='number' min={0} className="micardinpt" onChange={(e) => setminstock(e.target.value)} required />
                                </div>

                                <div className="col-lg-4">
                                    <label className="micardlble">Currency</label><br />
                                    <select className="micardinpt" onChange={(e) => setcurrency(e.target.value)} >
                                        <option defaultValue={true} value={''} required>Select Currency</option>
                                        {curncydat.map(crncyobj => (
                                            <>
                                                <option value={crncyobj.pk}>{crncyobj.currency_name}</option>
                                            </>
                                        ))}
                                    </select>
                                </div>

                                <div className="col-lg-4">
                                    <label className="micardlble">RM Max Price</label><br />
                                    <input className="micardgrpinpt" value={currency} disabled={true} />
                                    <input type='number' min={0} onChange={(e) => setrmmaxprice(e.target.value)} className="micardgrpinpt1" />
                                </div>

                                <div className="col-lg-4">
                                    <label className="micardlble">Prefered Suppliers</label><br />
                                    <select className="micardinpt" onChange={(e) => { setpresubid(e.target.value) }}>
                                        <option selected={true} disabled={true} value={''} defaultValue={true}>Choose Supplier</option>
                                        {partydat.map(prtob => (
                                            <option>{prtob.party_name}</option>
                                        ))}
                                    </select>
                                    <button className="comadbtn" style={{ float: 'unset', marginTop: '1em', marginBottom: 'unset' }}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            settotsubid(obj => [...obj, presubid]);
                                        }}
                                    >Add <ArrowForwardIcon sx={{ fontSize: '1em' }} />
                                    </button>
                                </div>

                                <div className="col-lg-4" style={{ padding: '1em' }}>
                                    <label className="micardlble">Suppliers</label>
                                    <div style={{ border: '1px solid #d9d7d7', minHeight: '10em', borderRadius: '6px', padding: '10px' }}>
                                        {totsubid.map((arob, index) => {
                                            return (
                                                <>
                                                    <Chip label={arob} sx={{ margin: '2px' }} onDelete={
                                                        () => { settotsubid([]) }
                                                    } />
                                                </>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* <div className="col-lg-4">
                                    <label className="micardlble">RM Max Price</label><br />
                                    <Autocomplete
                                        multiple
                                        id="tags-filled"
                                        options={Object.entries(optsub).map(([prtkey, prtval]) => (prtval.partyname))}
                                        freeSolo
                                        onChange={(item, index) => {
                                            setpresubid(index);
                                            console.log(presubid);
                                        }}
                                        renderTags={(value, getTagProps) =>
                                            value.map((option, index) => (
                                                <Chip variant="outlined" label={option} onDelete={() => { presubid.pop(presubid[index]) }} {...getTagProps({ index })} />
                                            ))
                                        }
                                        renderInput={(params) => (
                                            <TextField
                                                sx={{ backgroundColor: 'transparent' }}
                                                {...params}
                                                variant="filled"
                                                label="Suppliers"
                                                id="tagval"
                                            />
                                        )}
                                    /><button>TEST</button>
                                </div> */}
                            </div>
                        </div><br />
                        <button className="comadbtn" onClick={doPost}>Add</button>
                        <button className="cancelbtn" onClick={opnRMA} >Back</button>
                    </div>
                </form>
            </>
        );
    }


    useEffect(() => {

        fetch('https://erp-test-3wqc9.ondigitalocean.app/api/get?model=rawmaterial',
        {
            headers: {
                'Authorization': `token ${token}`
            }
        })
            .then((res) => { return res.json(); })
            .then((data) => {
                setrmadata(data.data)
            })
    }, [])


    function doDelete() {
        deleteRowRM(pk);
    }
    const deleteRowRM = (pkobj) => {
        let currentpk = pkobj;
        const deleterowurl = axios.create({
            baseURL: `https://erp-test-3wqc9.ondigitalocean.app/api/get?model=rawmaterial&pk=${currentpk}`
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

    const [searchdata, setsearchdata] = useState('');

    return (

        <div>
            <div className="row">
                <div className="col-lg-12">
                    <Header />
                </div>
                <div className="col-lg-2">
                    <Sidenav />
                </div>
                <div className="col-lg-10">
                    <div className="comhed">
                        <button className="comadbtn" onClick={opnAdd} id='adbtn'>Add</button>
                        <h5>Raw Material & Accessories</h5>
                        <h6>Master Data Management / Raw Material & Accessories</h6>
                    </div>
                    <div className="tablepadding" id="rma">
                        <div className="search" style={{ marginBottom: 'unset' }}>
                            <input type={'search'} className='micardinpt'
                                placeholder="Search Here...."
                                onChange={(e) => {
                                    setsearchdata(e.target.value.toLowerCase());
                                }} style={{ paddingLeft: '3em' }} />
                            <div className="sIcon">
                                <SearchIcon sx={{ fontSize: '2em' }} />
                            </div>
                        </div>
                        {rmadata.length != 0 ?
                            <TableContainer component={Paper} sx={{ maxHeight: 650 }}>
                                <Table stickyHeader sx={{ minWidth: 650 }} >
                                    <TableHead >
                                        <TableRow sx={{ backgroundColor: 'rgb(15, 11, 42)' }}>
                                            <TableCell variant="head" sx={{ fontWeight: 'bold', backgroundColor: 'rgb(15, 11, 42)', color: 'white' }}>S.No</TableCell>
                                            <TableCell variant="head" sx={{ fontWeight: 'bold', backgroundColor: 'rgb(15, 11, 42)', color: 'white' }}>RM code</TableCell>
                                            <TableCell variant="head" sx={{ fontWeight: 'bold', backgroundColor: 'rgb(15, 11, 42)', color: 'white' }}>RM Name</TableCell>
                                            <TableCell variant="head" sx={{ fontWeight: 'bold', backgroundColor: 'rgb(15, 11, 42)', color: 'white' }}>Measured Unit</TableCell>
                                            <TableCell variant="head" sx={{ fontWeight: 'bold', backgroundColor: 'rgb(15, 11, 42)', color: 'white' }}>Min Stock</TableCell>
                                            <TableCell variant="head" sx={{ fontWeight: 'bold', backgroundColor: 'rgb(15, 11, 42)', color: 'white' }}>RM Max Price</TableCell>
                                            <TableCell variant="head" sx={{ fontWeight: 'bold', backgroundColor: 'rgb(15, 11, 42)', color: 'white' }}>Currency</TableCell>
                                            <TableCell variant="head" sx={{ fontWeight: 'bold', backgroundColor: 'rgb(15, 11, 42)', color: 'white' }}>Prefered Supplier</TableCell>
                                            <TableCell variant="head" sx={{ fontWeight: 'bold', backgroundColor: 'rgb(15, 11, 42)', color: 'white' }}>Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {searchdata == '' ? 
                                        rmadata.map((row) => (
                                            <TableRow
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                hover={true}
                                            >
                                                <TableCell component="th" scope="row">
                                                    {++count}
                                                </TableCell>
                                                <TableCell>{row.rm_code !== null ? row.rm_code : 'Null'}</TableCell>
                                                <TableCell>{row.rm_name !== null ? row.rm_name : 'Null'}</TableCell>
                                                <TableCell>{row.measured_unit_get !== null ? row.measured_unit_get : 'Null'}</TableCell>
                                                <TableCell>{row.min_stock !== null ? row.min_stock : 'Null'}</TableCell>
                                                <TableCell>{row.rm_max_price !== null ? row.rm_max_price : 'Null'}</TableCell>
                                                <TableCell>{row.currency_get !== null ? row.currency_get : 'Null'}</TableCell>
                                                <TableCell>{row.preferred_supplier !== null ? row.preferred_supplier.length !== 0 ? row.preferred_supplier.join(', ') : 'Null' : 'Null'}</TableCell>
                                                <TableCell>
                                                    <IconButton aria-label="expand row" size="small" onClick={() => {
                                                        setupdtpk(row.pk); setuprmnme(row.rm_name); setuprmcod(row.rm_code); setuprmeunt(row.measured_unit);
                                                        setuprmesuntget(row.measured_unit_get); setupminstk(row.min_stock); setuprmmaxpr(row.rm_max_price);
                                                        setupcrncy(row.currency); setupcrncyget(row.currency_get); setuptotsubid(row.preferred_supplier); UhandleClickOpen();
                                                    }}>
                                                        <EditIcon /></IconButton>

                                                    <IconButton aria-label="expand row" size="small" onClick={() => {
                                                        setpk(row.pk); setdelproname(row.rm_name); handleClickOpen();
                                                    }}
                                                        sx={{ color: 'rgba(255, 0, 0, 0.755)' }}><DeleteIcon /></IconButton></TableCell>
                                            </TableRow>
                                        ))
                                        : 
                                        rmadata.map((row) => (
                                            <>
                                            {(row.rm_name.toLowerCase()).match(searchdata) == searchdata || (row.rm_code.toLowerCase()).match(searchdata) == searchdata || (row.measured_unit_get.toLowerCase()).match(searchdata) == searchdata
                                            || (row.min_stock.toString()).match(searchdata) == searchdata || (row.rm_max_price.toString()).match(searchdata) == searchdata 
                                            || (row.currency_get.toLowerCase()).match(searchdata) == searchdata || ((row.preferred_supplier.toString()).toLowerCase()).match(searchdata) == searchdata ? 
                                            <TableRow
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                hover={true}
                                            >
                                                <TableCell component="th" scope="row">
                                                    {++count}
                                                </TableCell>
                                                <TableCell>{row.rm_code !== null ? row.rm_code : 'Null'}</TableCell>
                                                <TableCell>{row.rm_name !== null ? row.rm_name : 'Null'}</TableCell>
                                                <TableCell>{row.measured_unit_get !== null ? row.measured_unit_get : 'Null'}</TableCell>
                                                <TableCell>{row.min_stock !== null ? row.min_stock : 'Null'}</TableCell>
                                                <TableCell>{row.rm_max_price !== null ? row.rm_max_price : 'Null'}</TableCell>
                                                <TableCell>{row.currency_get !== null ? row.currency_get : 'Null'}</TableCell>
                                                <TableCell>{row.preferred_supplier !== null ? row.preferred_supplier.length !== 0 ? row.preferred_supplier.join(', ') : 'Null' : 'Null'}</TableCell>
                                                <TableCell>
                                                    <IconButton aria-label="expand row" size="small" onClick={() => {
                                                        setupdtpk(row.pk); setuprmnme(row.rm_name); setuprmcod(row.rm_code); setuprmeunt(row.measured_unit);
                                                        setuprmesuntget(row.measured_unit_get); setupminstk(row.min_stock); setuprmmaxpr(row.rm_max_price);
                                                        setupcrncy(row.currency); setupcrncyget(row.currency_get); setuptotsubid(row.preferred_supplier); UhandleClickOpen();
                                                    }}>
                                                        <EditIcon /></IconButton>

                                                    <IconButton aria-label="expand row" size="small" onClick={() => {
                                                        setpk(row.pk); setdelproname(row.rm_name); handleClickOpen();
                                                    }}
                                                        sx={{ color: 'rgba(255, 0, 0, 0.755)' }}><DeleteIcon /></IconButton></TableCell>
                                            </TableRow> : null}
                                            </>
                                        ))
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer> : <Loader />}
                    </div>
                    {dispaddrma === true ? <AddRMA /> : null}
                </div>
            </div>
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
                            <b style={{ color: 'black' }}>{delproname}</b>
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
                        <h5>Update Raw Materials</h5>
                    </div>
                    <DialogTitle id="alert-dialog-title">
                        {"Row Details :  "}
                    </DialogTitle>
                    <DialogContent>

                        <div className="row">
                            <div className="col-lg-6 editscrn">
                                <label className="micardlble" >RM Name</label><br />
                                <input className="micardinpt" value={uprmnme} onChange={(e) => { setuprmnme(e.target.value) }} required />
                            </div>

                            <div className="col-lg-6 editscrn">
                                <label className="micardlble" >RM Code</label><br />
                                <input className="micardinpt" value={uprmcod} onChange={(e) => { setuprmcod(e.target.value) }} required />
                            </div>

                            <div className="col-lg-6">
                                <label className="micardlble">Measured Unit</label><br />
                                <select className="micardinpt" onChange={(e) => setuprmeunt(e.target.value)}>
                                    <option defaultValue={true} value={uprmesunt} required>{uprmesuntget}</option>
                                    {measurdunit.map(unitobj => (
                                        <>
                                            <option value={unitobj.pk}>{unitobj.measured_unit_name}</option>
                                        </>
                                    ))}
                                </select>
                            </div>

                            <div className="col-lg-6">
                                <label className="micardlble">Min Stock</label><br />
                                <input type='number' className="micardinpt" value={upminstk} onChange={(e) => setupminstk(e.target.value)} required />
                            </div>

                            <div className="col-lg-6">
                                <label className="micardlble">Currency</label><br />
                                <select className="micardinpt" onChange={(e) => setupcrncy(e.target.value)} >
                                    <option defaultValue={true} value={upcrncy} required>{upcrncyget}</option>
                                    {curncydat.map(crncyobj => (
                                        <>
                                            <option value={crncyobj.pk}>{crncyobj.currency_name}</option>
                                        </>
                                    ))}
                                </select>
                            </div>

                            <div className="col-lg-6">
                                <label className="micardlble">RM Max Price</label><br />
                                <input type='number' value={uprmmaxpr} onChange={(e) => setuprmmaxpr(e.target.value)} className="micardinpt" />
                            </div>

                            <div className="col-lg-4">
                                <label className="micardlble">Prefered Suppliers</label><br />
                                <select className="micardinpt" onChange={(e) => { setuppresubid(e.target.value) }}>
                                    <option selected={true} disabled={true} value={''} defaultValue={true}>Choose Supplier</option>
                                    {partydat.map(prtob => (
                                        <option>{prtob.party_name}</option>
                                    ))}
                                </select>
                                <button className="comadbtn" style={{ float: 'unset', marginTop: '1em', marginBottom: 'unset' }}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setuptotsubid(obj => [...obj, uppresubid]);
                                    }}
                                >Add <ArrowForwardIcon sx={{ fontSize: '1em' }} />
                                </button>
                            </div>

                            <div className="col-lg-4" style={{ padding: '1em' }}>
                                <label className="micardlble">Suppliers</label>
                                <div style={{ border: '1px solid #d9d7d7', minHeight: '10em', borderRadius: '6px', padding: '10px' }}>
                                    {uptotsubid.map((arob, index) => {
                                        return (
                                            <>
                                                <Chip label={arob} sx={{ margin: '2px' }} onDelete={
                                                    () => { setuptotsubid([]) }
                                                } />
                                            </>
                                        );
                                    })}
                                </div>
                            </div>


                        </div><br />
                        <button className="comadbtn" onClick={doPUT} style={{ marginBottom: 'unset' }}>Update</button>
                        <button className="cancelbtn" onClick={UhandleClose} >Discord</button>
                    </DialogContent>
                </Dialog><br />
            </div>
        </div>
    );
}

export default Rawmaterialsaccessories;