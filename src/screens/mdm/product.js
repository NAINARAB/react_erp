import React, { useState } from "react";
import Header from "../../comp/header/header";
import Sidenav from "../../comp/sidenav/sidenav";
import { TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper } from "@mui/material";
import '../common.css'


function Product() {

    function createData(sno, prname, prtype, mins, minpr, maxpr, curncy, multi, parts, action) {
        return { sno, prname, prtype, mins, minpr, maxpr, curncy, multi, parts, action };
    }

    let Butns = () => {
        return (
            <>
                <button className="icbtn"><i className="bi bi-pencil-square"></i></button>
                <button className="icbtn icbtnred"><i className="bi bi-trash-fill"></i></button>
            </>
        );
    }


    const rows = [
        createData(1, 'Cooker', 'Finished', 100, 3000, 1000, 'INR', 'True', 'Lid', <Butns />),
        createData(2, 'Cookerr', 'Finished', 100, 3000, 1000, 'INR', 'True', 'Lid', <Butns />),
    ];




    let Prodt = () => {
        return (
            <div className="tablepadding">
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead >
                            <TableRow>
                                <TableCell variant="head" sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white' }} >S.No</TableCell>
                                <TableCell variant="head" sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white' }} align="right">Product Name</TableCell>
                                <TableCell variant="head" sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white' }} align="right">Product Type</TableCell>
                                <TableCell variant="head" sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white' }} align="right">Min Stock</TableCell>
                                <TableCell variant="head" sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white' }} align="right">Min Price</TableCell>
                                <TableCell variant="head" sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white' }} align="right">Max Price</TableCell>
                                <TableCell variant="head" sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white' }} align="right">Currency</TableCell>
                                <TableCell variant="head" sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white' }} align="right">Multiple Parts</TableCell>
                                <TableCell variant="head" sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white' }} align="right">Parts</TableCell>
                                <TableCell variant="head" sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white' }} align="right">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">
                                        {row.sno}
                                    </TableCell>
                                    <TableCell align="right">{row.prname}</TableCell>
                                    <TableCell align="right">{row.prtype}</TableCell>
                                    <TableCell align="right">{row.mins}</TableCell>
                                    <TableCell align="right">{row.minpr}</TableCell>
                                    <TableCell align="right">{row.maxpr}</TableCell>
                                    <TableCell align="right">{row.curncy}</TableCell>
                                    <TableCell align="right">{row.multi}</TableCell>
                                    <TableCell align="right">{row.parts}</TableCell>
                                    <TableCell align="right">{row.action}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        );
    }


    let Addproduct = () => {
        return (
            <>
                <div className="tablepadding">
                    <div className="micard">
                        <h5 className="micardhdr">Add Product</h5>
                        <div className="micardbdy row">
                            <div className="col-lg-4">
                                <label className="micardlble">Product Name</label><br />
                                <input className="micardinpt" />
                            </div>

                            <div className="col-lg-4">
                                <label className="micardlble">Product Type</label><br />
                                <input className="micardinpt" />
                            </div>

                            <div className="col-lg-4">
                                <label className="micardlble">Currency</label><br />
                                <input className="micardinpt" />
                            </div>


                            <div className="col-lg-4">
                                <label className="micardlble">Min Price</label><br />
                                <input className="micardinpt" />
                            </div>

                            <div className="col-lg-4">
                                <label className="micardlble">Max Price</label><br />
                                <input className="micardinpt" />
                            </div>

                            <div className="col-lg-4">
                                <label className="micardlble">Multiple Parts</label><br />
                                <input className="micardinpt" />
                            </div>

                        </div>
                    </div>
                </div>
            </>
        );
    }

    const [dispproduct, setproduct] = useState(<Prodt />)


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
                            <button className="comadbtn" onClick={() => { setproduct(<Addproduct />) }}>Add</button>
                            <h5>Products</h5>
                            <h6>Master Data Management / Product</h6>
                        </div>
                        {dispproduct}
                    </div>
                </div>
            </div>
        </>




    );
}


export default Product;