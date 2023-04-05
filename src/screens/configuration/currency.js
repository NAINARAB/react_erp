import React, { useState, useEffect, useCallback } from "react";
import Header from "../../comp/header/header";
import Sidenav from "../../comp/sidenav/sidenav";
import {
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Slide,
    TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper, IconButton
} from "@mui/material";
import { maxWidth } from "@mui/system";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Loader from "../../comp/Load/loading";
import SearchIcon from '@mui/icons-material/Search';
import axios from "axios";

const CurrencyTable = (props) => {
    let count = 0;
    const [currencydat, setcurrencydat] = useState([]);
    const [delpk, setdelpk] = useState();
    const [open, setOpen] = useState(false);
    const [delcr, setdelcr] = useState('');
    let { searchdata } = props;

    function doDelete() {
        deleteRow(delpk);
    }

    const deleteRow = (pkobj) => {
        let currentpk = pkobj;
        const deleterowurl = axios.create({ //phase
            baseURL: `https://erp-test-3wqc9.ondigitalocean.app/api/get?model=currency&pk=${currentpk}`
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
    

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        fetch('https://erp-test-3wqc9.ondigitalocean.app/api/get?model=currency')
            .then((res) => { return res.json(); })
            .then((data) => {
                setcurrencydat(data.data);
            })
    }, [])
    return (
        <>
            {currencydat.length != 0 ?
                <TableContainer component={Paper} sx={{ maxHeight: 650 }}>
                    <Table stickyHeader aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell variant="head" align="left" Width={120} sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white', fontWeight: 'bold' }}>S.No</TableCell>
                                <TableCell align="left" Width={250} sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white', fontWeight: 'bold' }}>Currency Symbol</TableCell>
                                <TableCell align="left" sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white', fontWeight: 'bold' }}>Currency Name</TableCell>
                                <TableCell align="right" sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white', fontWeight: 'bold' }}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {searchdata == '' ?
                                <>
                                    {currencydat.map(cob => (
                                        <TableRow>
                                            <TableCell>{++count}</TableCell>
                                            <TableCell>{cob.currency_code}</TableCell>
                                            <TableCell>{cob.currency_name}</TableCell>
                                            <TableCell align="right">
                                                {/* <IconButton aria-label="expand row" size="small"
                                                            onClick={() => {  }}
                                                        ><EditIcon /></IconButton> */}
                                                <IconButton aria-label="expand row" size="small" onClick={() => {
                                                    setdelpk(cob.pk);setdelcr(cob.currency_code+" - "+cob.currency_name);handleClickOpen();
                                                }}
                                                    sx={{ color: 'rgba(255, 0, 0, 0.755)' }}><DeleteIcon /></IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </>
                                :
                                <>
                                    {currencydat.map(cob => (
                                        <>
                                            {(cob.currency_name.toLowerCase()).match(searchdata) == searchdata ?
                                                <TableRow>
                                                    <TableCell>{++count}</TableCell>
                                                    <TableCell>{cob.currency_code}</TableCell>
                                                    <TableCell>{cob.currency_name}</TableCell>
                                                    <TableCell align="right">
                                                        {/* <IconButton aria-label="expand row" size="small"
                                                        onClick={() => {  }}
                                                    ><EditIcon /></IconButton> */}
                                                        <IconButton aria-label="expand row" size="small" onClick={() => {
                                                            setdelpk(cob.pk);setdelcr(cob.currency_code+" - "+cob.currency_name);handleClickOpen();
                                                        }}
                                                            sx={{ color: 'rgba(255, 0, 0, 0.755)' }}><DeleteIcon /></IconButton>
                                                    </TableCell>
                                                </TableRow>
                                                : null}
                                        </>
                                    ))}
                                </>
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                : <Loader />
            }
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
                            <b style={{ color: 'black' }}>Currency Name: &emsp;{delcr}</b>
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
        </>
    );
}

const AddCurrency = () => {
    const [currency, setcurrency] = useState('');
    const [csymbol, setcsymbol] = useState('');

    const postcurrency = axios.create({
        baseURL: "https://erp-test-3wqc9.ondigitalocean.app/api/get?model=currency"
    });

    const poststatefun = (cc,cn) => {
        postcurrency.post('', {
            currency_code: cc,
            currency_name:cn
        })
            .then((res) => {
                console.log("after then", res)
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
    let doPost = (e) => {
        e.preventDefault();
        poststatefun(csymbol, currency);
    }
    return (
        <>
            <form>
                <div className="micard">
                    <h5 className="micardhdr">Add State</h5>
                    <div className="micardbdy row">
                        <div className="col-lg-4">
                            <label className="micardlble" >Currency Name</label><br />
                            <input className="micardinpt" onChange={(e) => { setcurrency(e.target.value); }} required />
                        </div>

                        <div className="col-lg-4">
                            <label className="micardlble" >Currency Symbol</label><br />
                            <input className="micardinpt" onChange={(e) => { setcsymbol(e.target.value); }} required />
                        </div>

                    </div>
                </div><br />
                <button className="comadbtn" onClick={doPost}>Add</button>
            </form>
        </>
    );
}


const Currency = () => {
    const [searchdata, setsearchdata] = useState('');
    const [disp, setdisp] = useState(true);
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
                            {disp === true ? <button className="comadbtn" onClick={() => {setdisp(!disp)}}>Add</button> : 
                            <button className="comadbtn" onClick={() => {setdisp(!disp)}}>Cancel</button>}
                            <h5>Currency</h5>
                            <h6>Admin / Configuration / Currency</h6>
                        </div>

                        <div className="tablepadding">
                            {disp === true ?
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
                            {disp == true ? <CurrencyTable searchdata={searchdata} /> : <AddCurrency />}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}



export default Currency;