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
                                <TableCell variant="head" sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white' }} >Product Name</TableCell>
                                <TableCell variant="head" sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white' }} >Product Type</TableCell>
                                <TableCell variant="head" sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white' }} >Min Stock</TableCell>
                                <TableCell variant="head" sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white' }} >Min Price</TableCell>
                                <TableCell variant="head" sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white' }} >Max Price</TableCell>
                                <TableCell variant="head" sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white' }} >Currency</TableCell>
                                <TableCell variant="head" sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white' }} >Multiple Parts</TableCell>
                                <TableCell variant="head" sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white' }} >Parts</TableCell>
                                <TableCell variant="head" sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white' }} >Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">
                                        {row.sno}
                                    </TableCell>
                                    <TableCell>{row.prname}</TableCell>
                                    <TableCell>{row.prtype}</TableCell>
                                    <TableCell>{row.mins}</TableCell>
                                    <TableCell>{row.minpr}</TableCell>
                                    <TableCell>{row.maxpr}</TableCell>
                                    <TableCell>{row.curncy}</TableCell>
                                    <TableCell>{row.multi}</TableCell>
                                    <TableCell>{row.parts}</TableCell>
                                    <TableCell>{row.action}</TableCell>
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
                                <label className="micardlble" onChange={(e) => {setproductname(e.target.value);}}>Product Name</label><br />
                                <input className="micardinpt" required/>
                            </div>

                            <div className="col-lg-4">
                                <label className="micardlble">Product Type</label><br />
                                <select className="micardinpt" onChange={(e) => {setproductype(e.target.value);}}>
                                    <option selected='true' disabled='true' value={''} required>Select Type</option>
                                    <option>Finished</option>
                                    <option>Semi-Finished</option>
                                </select>
                            </div>

                            <div className="col-lg-4">
                                <label className="micardlble">Currency</label><br />
                                <select className="micardinpt" onChange={(e) => {setcurrency(e.target.value);}}>
                                    <option selected='true' disabled='true' value={''} required>Select Currency</option>
                                </select>
                            </div>


                            <div className="col-lg-4">
                                <label className="micardlble">Min Price</label><br />
                                <select className="micardgrpinpt" onChange={(e) => {setminpricecurrency(e.target.value)}} >
                                    <option selected='true'>INR</option>
                                </select>
                                <input type='number' onChange={(e) => {setminprice(e.target.value);}} className="micardgrpinpt1" />
                            </div>


                            <div className="col-lg-4">
                                <label className="micardlble">Max Price</label><br />
                                <select className="micardgrpinpt" onChange={(e) => {setmaxpricecurrency(e.target.value);}}>
                                    <option selected='true'>INR</option>
                                </select>
                                <input type='number' onChange={(e) => {setmaxprice(e.target.value);}} className="micardgrpinpt1" />
                            </div>

                            <div className="col-lg-4">
                                <label className="micardlble">Multiple Parts</label><br />
                                <div className="micardboxinpt">
                                    <input type='checkbox' onChange={(e) => {setmultipleparts(e.target.value);}} style={{height:'1em', width:'1em'}} /> &emsp;Add Multiple Parts
                                </div>
                            </div>

                        </div>
                    </div><br />
                    <button className="comadbtn">Add</button>
                    <button className="cancelbtn" onClick={opnProdt} >Cancel</button>
                </div>
            </>
        );
    }

    const [dispproduct, setproduct] = useState(<Prodt />)

    function opnAdd(){
        let x = document.getElementById('adbtn');
        setproduct(<Addproduct />);
        x.style.display ='none';
    }
    function opnProdt(){
        let x = document.getElementById('adbtn');
        setproduct(<Prodt />);
        x.style.display ='block';
    }

    const [productname, setproductname] = useState('');
    const [producttype, setproductype] = useState('');
    const [currency, setcurrency] = useState('');
    const [minpricecurrency, setminpricecurrency] =useState('');
    const [minprice, setminprice] =useState();
    const [maxpricecurrency, setmaxpricecurrency] =useState('');
    const [maxprice, setmaxprice] = useState();
    const [multipleparts, setmultipleparts] = useState(false);

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
                            <button className="comadbtn" onClick={opnAdd} id='adbtn'>Add</button>
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