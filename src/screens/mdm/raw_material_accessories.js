import React from "react";
import Header from "../../comp/header/header";
import Sidenav from "../../comp/sidenav/sidenav";
import { TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper, IconButton } from "@mui/material";
import '../common.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState, useEffect } from "react";
import Loader from "../../comp/Load/loading";
import axios from "axios";


function Rawmaterialsaccessories() {

    const [dispaddrma, setdispaddrma] = useState(false);
    const [rmadata, setrmadata] = useState([]);
    let count = 0;

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
    function Butns() {
        return (
            <>
                <IconButton aria-label="expand row" size="small" sx={{ marginLeft: '0.5em' }}><EditIcon /></IconButton>
                <IconButton aria-label="expand row" size="small" sx={{ color: 'rgba(255, 0, 0, 0.755)', marginRight: '1em' }}><DeleteIcon /></IconButton>
            </>
        );
    }


    let AddRMA = () => {
        const [rmname, setrmname] = useState('');
        const [rmcode, setrmcode] = useState('')
        const [units, setunits] = useState();
        const [minstock, setminstock] = useState();
        const [currency, setcurrency] = useState();
        const [rmmaxprice, setrmmaxprice] = useState();
        const [countrysdat, setcountrydat] = useState([])
        const [curncydat, setcurncydat] = useState([])
        const [measurdunit, setmeasuredunit] = useState([])

        useEffect(() => {
            fetch('https://erp-dwe8a.ondigitalocean.app/api/get?model=country')
                .then((res) => { return res.json(); })
                .then((data) => {
                    setcountrydat(data.data);
                })
        }, [])//currency
        useEffect(() => {
            fetch('https://erp-dwe8a.ondigitalocean.app/api/get?model=currency')
                .then((res) => { return res.json(); })
                .then((data) => {
                    setcurncydat(data.data);
                })
        }, [])
        useEffect(() => {
            fetch('https://erp-dwe8a.ondigitalocean.app/api/get?model=measuredunits')
                .then((res) => { return res.json(); })
                .then((data) => {
                    setmeasuredunit(data.data);
                })
        }, [])


        const rmapost = axios.create({
            baseURL: "https://erp-dwe8a.ondigitalocean.app/api/get?model=rawmaterial"
        });

        const postrma = (rmcode, rmname, unit, minstock, rmmaxprice, currency,) => {
            rmapost.post('', {
                rm_code: rmcode,
                rm_name: rmname,
                measured_unit: unit,
                min_stock: minstock,
                rm_max_price: rmmaxprice,
                currency: currency,
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
            postrma(rmcode,rmname,units,minstock,rmmaxprice,currency);
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
                                        <option selected='true' disabled='true' value={''} required>Select Type</option>
                                        {measurdunit.map(unitobj => (
                                            <>
                                                <option value={unitobj.pk}>{unitobj.measured_unit_name}</option>
                                            </>
                                        ))}
                                    </select>
                                </div>

                                <div className="col-lg-4">
                                    <label className="micardlble">Min Stock</label><br />
                                    <input type='number' className="micardinpt" onChange={(e) => setminstock(e.target.value)} required />
                                </div>

                                <div className="col-lg-4">
                                    <label className="micardlble">Currency</label><br />
                                    <select className="micardinpt" onChange={(e) => setcurrency(e.target.value)} >
                                        <option selected='true' disabled='true' value={''} required>Select Currency</option>
                                        {curncydat.map(crncyobj => (
                                            <>
                                                <option value={crncyobj.pk}>{crncyobj.currency_name}</option>
                                            </>
                                        ))}
                                    </select>
                                </div>

                                <div className="col-lg-4">
                                    <label className="micardlble">RM Max Price</label><br />
                                    <input className="micardgrpinpt" value={currency} disabled='true' />
                                    <input type='number' onChange={(e) => setrmmaxprice(e.target.value)} className="micardgrpinpt1" />
                                </div>

                                <div className="col-lg-4">
                                    {/* for Alignment */}
                                </div>
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

        fetch('https://erp-dwe8a.ondigitalocean.app/api/get?model=rawmaterial')
            .then((res) => { return res.json(); })
            .then((data) => {
                console.log(data)
                setrmadata(data.data)
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
                    <div className="comhed">
                        <button className="comadbtn" onClick={opnAdd} id='adbtn'>Add</button>
                        <h5>Raw Material & Accessories</h5>
                        <h6>Master Data Management / Raw Material & Accessories</h6>
                    </div>
                    <div className="tablepadding" id="rma">
                        {rmadata.length != 0 ?
                            <TableContainer component={Paper} sx={{ maxHeight: 650 }}>
                                <Table stickyHeader sx={{ minWidth: 650 }} >
                                    <TableHead >
                                        <TableRow sx={{ backgroundColor: 'rgb(15, 11, 42)' }}>
                                            <TableCell variant="head" sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white' }} >S.No</TableCell>
                                            <TableCell variant="head" sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white' }}>RM Name</TableCell>
                                            <TableCell variant="head" sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white' }}>Measured Unit</TableCell>
                                            <TableCell variant="head" sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white' }}>Min Stock</TableCell>
                                            <TableCell variant="head" sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white' }}>RM Max Price</TableCell>
                                            <TableCell variant="head" sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white' }}>Currency</TableCell>
                                            <TableCell variant="head" sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white' }}>Prefered Supplied Id</TableCell>
                                            <TableCell variant="head" sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white' }}>Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rmadata.map((row) => (
                                            <TableRow
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                hover='true'
                                            >
                                                <TableCell component="th" scope="row">
                                                    {++count}
                                                </TableCell>
                                                <TableCell>{row.rm_name != null ? row.rm_name : 'Null'}</TableCell>
                                                <TableCell>{row.measured_unit_get != null ? row.measured_unit_get : 'Null'}</TableCell>
                                                <TableCell>{row.min_stock != null ? row.min_stock : 'Null'}</TableCell>
                                                <TableCell>{row.rm_max_price != null ? row.rm_max_price : 'Null'}</TableCell>
                                                <TableCell>{row.currency_get != null ? row.currency_get : 'Null'}</TableCell>
                                                <TableCell>{row.prefered_supplier != null ? row.prefered_supplier : 'Null'}</TableCell>
                                                <TableCell>{<Butns />}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer> : <Loader />}
                    </div>
                    {dispaddrma === true ? <AddRMA /> : null}
                </div>
            </div>
        </>
    );
}

export default Rawmaterialsaccessories;