import React from "react";
import Header from "../../comp/header/header";
import Sidenav from "../../comp/sidenav/sidenav";
import { TableContainer ,Table, TableBody, TableCell, TableHead, TableRow, Paper } from "@mui/material";
import '../common.css';








function Rawmaterialsaccessories() {
    function createData(sno, rm_name,measured_unit, min_stock,rm_max_price,currency,prefered_supplier_id,action) {
        return { sno, rm_name,measured_unit, min_stock,rm_max_price,currency,prefered_supplier_id,action };
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
        createData(1, 'Wood','cm',100,'RM Max Price', 'Currency','Prefered Suppliered Id', <Butns />),
        createData(1, 'Wood','cm',100,'RM Max Price', 'Currency','Prefered Suppliered Id', <Butns />),
    ];



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
                            <button className="comadbtn">Add</button>
                            <h5>Raw Material & Accessories</h5>
                            <h6>Master Data Management / Raw Material & Accessories</h6>
                        </div>

                        <div className="tablepadding">


                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} >
                                    <TableHead >
                                        <TableRow sx={{ backgroundColor: 'rgb(15, 11, 42)' }}>
                                            <TableCell variant="head" sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white' }} >S.No</TableCell>
                                            <TableCell variant="head" sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white' }} align="right">RM Name</TableCell>
                                            <TableCell variant="head" sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white' }} align="right">Measured Unit</TableCell>
                                            <TableCell variant="head" sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white' }} align="right">Min Stock</TableCell>
                                            <TableCell variant="head" sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white' }} align="right">RM Max Price</TableCell>
                                            <TableCell variant="head" sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white' }} align="right">Currency</TableCell>
                                            <TableCell variant="head" sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white' }} align="right">Prefered Supplied Id</TableCell>
                                            <TableCell variant="head" sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white' }} align="right">Action</TableCell>
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
                                                <TableCell align="right">{row.rm_name}</TableCell>
                                                <TableCell align="right">{row.measured_unit}</TableCell>
                                                <TableCell align="right">{row.min_stock}</TableCell>
                                                <TableCell align="right">{row.rm_max_price}</TableCell>
                                                <TableCell align="right">{row.currency}</TableCell>
                                                <TableCell align="right">{row.prefered_supplier_id}</TableCell>
                                                <TableCell align="right">{row.action}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    </div>
                </div>
            </div>
        </>




    );
}

export default Rawmaterialsaccessories;