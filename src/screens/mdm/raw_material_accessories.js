import React from "react";
import Header from "../../comp/header/header";
import Sidenav from "../../comp/sidenav/sidenav";
import { TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper } from "@mui/material";
import '../common.css';
import { useState } from "react";








function Rawmaterialsaccessories() {
    function createData(sno, rm_name, measured_unit, min_stock, rm_max_price, currency, prefered_supplier_id, action) {
        return { sno, rm_name, measured_unit, min_stock, rm_max_price, currency, prefered_supplier_id, action };
    }

    let Butns = () => {
        return (
            <>
                <button className="icbtn"><i class="bi bi-pencil-square"></i></button>
                <button className="icbtn icbtnred"><i class="bi bi-trash-fill"></i></button>
            </>
        );
    }


    const rows = [
        createData(1, 'Wood', 'cm', 100, 'RM Max Price', 'Currency', 'Prefered Suppliered Id', <Butns />),
        createData(1, 'Wood', 'cm', 100, 'RM Max Price', 'Currency', 'Prefered Suppliered Id', <Butns />),
    ];

    let RMA = () => {
        return (
            <>
                <div className="tablepadding">
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} >
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
                                {rows.map((row) => (
                                    <TableRow
                                        key={row.sno}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.sno}
                                        </TableCell>
                                        <TableCell>{row.rm_name}</TableCell>
                                        <TableCell>{row.measured_unit}</TableCell>
                                        <TableCell>{row.min_stock}</TableCell>
                                        <TableCell>{row.rm_max_price}</TableCell>
                                        <TableCell>{row.currency}</TableCell>
                                        <TableCell>{row.prefered_supplier_id}</TableCell>
                                        <TableCell>{row.action}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </>
        );
    }

    let AddRMA = () => {
        return (
            <>
                <div className="tablepadding">

                    <div className="micard">
                        <h5 className="micardhdr">Raw Material & Accessories</h5>
                        <div className="micardbdy row">

                            <div className="col-lg-4">
                                <label className="micardlble">Raw Material</label><br />
                                <input className="micardinpt" required />
                            </div>

                            <div className="col-lg-4">
                                <label className="micardlble">Units</label><br />
                                <select className="micardinpt" >
                                    <option selected='true' disabled='true' value={''} required>Select Type</option>
                                    <option>Centimeter</option>
                                    <option>Meter</option>
                                </select>
                            </div>

                            <div className="col-lg-4">
                                <label className="micardlble">Min Stock</label><br />
                                <input type='number' className="micardinpt" required />
                            </div>

                            <div className="col-lg-4">
                                <label className="micardlble">Currency</label><br />
                                <select className="micardinpt" >
                                    <option selected='true' disabled='true' value={''} required>Select Currency</option>
                                </select>
                            </div>

                            <div className="col-lg-4">
                                <label className="micardlble">RM Max Price</label><br />
                                <select className="micardgrpinpt" >
                                    <option selected='true'>INR</option>
                                </select>
                                <input type='number' className="micardgrpinpt1" />
                            </div>

                            <div className="col-lg-4">
                                {/* for Alignment */}
                            </div>
                        </div>
                    </div><br />
                    <button className="comadbtn">Add</button>
                    <button className="cancelbtn" onClick={opnRMA} >Cancel</button>
                </div>
            </>
        );
    }



    const [dispRMA, setRMA] = useState(<RMA />)

    function opnAdd() {
        let x = document.getElementById('adbtn');
        setRMA(<AddRMA />);
        x.style.display = 'none';
    }
    function opnRMA() {
        let x = document.getElementById('adbtn');
        setRMA(<RMA />);
        x.style.display = 'block';
    }



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
                    {dispRMA}
                </div>
            </div>
        </>




    );
}

export default Rawmaterialsaccessories;