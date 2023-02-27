import React from "react";
import Header from "../../comp/header/header";
import Sidenav from "../../comp/sidenav/sidenav";
import { TableContainer ,Table, TableBody, TableCell, TableHead, TableRow, Paper } from "@mui/material";
import '../common.css';

function Billsofmaterials(){

    function createData(sno,rm_serial_no,rm_quantity, measured_unit,rm_id,product,action) {
        return { sno,rm_serial_no,rm_quantity, measured_unit,rm_id,product,action };
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
        createData(1, 123456 ,100,'cm', 'wood','Cooker', <Butns />),
        createData(1, 123456 ,100,'cm', 'wood','Cooker', <Butns />),
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
                            <h5>Bills of Materials</h5>
                            <h6>Master Data Management / Bills of Materials</h6>
                        </div>

                        <div className="tablepadding">


                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} >
                                    <TableHead >
                                        <TableRow sx={{ backgroundColor: 'rgb(15, 11, 42)' }}>
                                            <TableCell variant="head" sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white' }} >S.No</TableCell>
                                            <TableCell variant="head" sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white' }} align="right">RM Serial No</TableCell>
                                            <TableCell variant="head" sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white' }} align="right">RM Quantity</TableCell>
                                            <TableCell variant="head" sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white' }} align="right">Measured Unit</TableCell>
                                            <TableCell variant="head" sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white' }} align="right">RM Id</TableCell>
                                            <TableCell variant="head" sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white' }} align="right">Product</TableCell>
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
                                                <TableCell align="right">{row.rm_serial_no}</TableCell>
                                                <TableCell align="right">{row.rm_quantity}</TableCell>
                                                <TableCell align="right">{row.measured_unit}</TableCell>
                                                <TableCell align="right">{row.rm_id}</TableCell>
                                                <TableCell align="right">{row.product}</TableCell>
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

export default Billsofmaterials;