import React, { useState } from "react";
import Header from "../../comp/header/header";
import Sidenav from "../../comp/sidenav/sidenav";
import { TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper, IconButton } from "@mui/material";
import '../common.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';




function Product() {

    const [productData, setProdata] = useState([])

    function createData(sno, prname, prtype, mins, minpr, maxpr, curncy, multi, parts, action) {
        return { sno, prname, prtype, mins, minpr, maxpr, curncy, multi, parts, action };
    }

    function Butns() {
        return (
            <>
                <IconButton aria-label="expand row" size="small" sx={{ marginLeft: '0.5em' }}><EditIcon /></IconButton>
                <IconButton aria-label="expand row" size="small" sx={{ color: 'rgba(255, 0, 0, 0.755)', marginRight: '1em' }}><DeleteIcon /></IconButton>
            </>
        );
    }

    let rows = [];
    

    fetch('https://erp-dwe8a.ondigitalocean.app/api/get?model=product')
        .then((res) => { return res.json(); })
        .then((dataobj) => {
            let objvar = []; objvar = dataobj.data;
            rows.push(objvar)
            console.log(rows)
            console.log(rows[0].map((rowobj) => (rowobj.product_name)))
            let duprows = rows[0];
            console.log("duprows",duprows)
        })


    // rows[i].map((rowobj) => (rowobj.product_name))
    // let objvar = JSON.parse(dataobj.data.product_name);
    // setProdata(objvar);
    // setProdata(fchdata);
    // console.log(productData)
    // let count = 0;
    //         const fchdata = {
    //             sno: count + 1,
    // prname: dov.product_name,
    // prtype: dov.product_type,
    // mins: dov.min_stock,
    // minpr: dov.minimum_price,
    // maxpr: dov.maximum_price,
    // curncy: dov.currency,
    // multi: dov.multiple_parts,
    // parts: "text",
    // action: "simp"
    //         }

    // dataobj.data.map((newobj) => (setPro(newobj.product_name)))

    // rows.push(createData(1, newobj.product_name, newobj.product_type, newobj.min_stock,
    //     newobj.minimum_price, newobj.maximum_price, newobj.currency, newobj.multiple_parts,
    //     "hi", <Butns />))

    // .map((obj) => (console.log(obj.product_code)))
    // (newobj) => ( rows.push(
    // createData(1, newobj.product_name, newobj.product_type, newobj.min_stock,
    //     newobj.minimum_price, newobj.maximum_price, newobj.currency, newobj.multiple_parts,
    //     "hi", <Butns />)
    // ))







    let Prodt =  () => {

        return (
            <div className="tablepadding">
                <TableContainer component={Paper} sx={{ maxHeight: 650 }}>
                    <Table stickyHeader aria-label="simple table">
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
                            {rows.map((rowobj) => (
                                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} hover='true'>
                                    <TableCell component="th" scope="row">
                                        {1}
                                    </TableCell>
                                    <TableCell>{rowobj.product_name}</TableCell>
                                    <TableCell>{rowobj.product_type}</TableCell>
                                    <TableCell>{rowobj.min_stock}</TableCell>
                                    <TableCell>{rowobj.minimum_price}</TableCell>
                                    <TableCell>{rowobj.maximum_price}</TableCell>
                                    <TableCell>{rowobj.currency}</TableCell>
                                    <TableCell>{rowobj.multiple_parts}</TableCell>
                                    <TableCell>{rowobj.parts}</TableCell>
                                    <TableCell>{<Butns />}</TableCell>
                                </TableRow>
                            ))
                            }
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
                                <label className="micardlble" >Product Name</label><br />
                                <input className="micardinpt" onChange={(e) => { setproductname(e.target.value); }} required />
                            </div>

                            <div className="col-lg-4">
                                <label className="micardlble">Product Type</label><br />
                                <select className="micardinpt" onChange={(e) => { setproductype(e.target.value); }}>
                                    <option selected='true' disabled='true' value={''} required>Select Type</option>
                                    <option>Finished</option>
                                    <option>Semi-Finished</option>
                                </select>
                            </div>

                            <div className="col-lg-4">
                                <label className="micardlble">Currency</label><br />
                                <select className="micardinpt" onChange={(e) => { setcurrency(e.target.value); }}>
                                    <option selected='true' disabled='true' value={''} required>Select Currency</option>
                                </select>
                            </div>


                            <div className="col-lg-4">
                                <label className="micardlble">Min Price</label><br />
                                <select className="micardgrpinpt" onChange={(e) => { setminpricecurrency(e.target.value) }} >
                                    <option selected='true'>INR</option>
                                </select>
                                <input type='number' onChange={(e) => { setminprice(e.target.value); }} className="micardgrpinpt1" />
                            </div>


                            <div className="col-lg-4">
                                <label className="micardlble">Max Price</label><br />
                                <select className="micardgrpinpt" onChange={(e) => { setmaxpricecurrency(e.target.value); }}>
                                    <option selected='true'>INR</option>
                                </select>
                                <input type='number' onChange={(e) => { setmaxprice(e.target.value); }} className="micardgrpinpt1" />
                            </div>

                            <div className="col-lg-4">
                                <label className="micardlble">Multiple Parts</label><br />
                                <div className="micardboxinpt">
                                    <input type='checkbox' onChange={(e) => { setmultipleparts(e.target.value); }} style={{ height: '1em', width: '1em' }} /> &emsp;Add Multiple Parts
                                </div>
                            </div>

                        </div>
                    </div><br />
                    <button className="comadbtn">Add</button>
                    <button className="cancelbtn" onClick={opnProdt} >Back</button>
                </div>
            </>
        );
    }

    const [dispproduct, setproduct] = useState(<Prodt />)

    function opnAdd() {
        let x = document.getElementById('adbtn');
        setproduct(<Addproduct />);
        x.style.display = 'none';
    }
    function opnProdt() {
        let x = document.getElementById('adbtn');
        setproduct(<Prodt />);
        x.style.display = 'block';
    }

    const [productname, setproductname] = useState('');
    const [producttype, setproductype] = useState('');
    const [currency, setcurrency] = useState('');
    const [minpricecurrency, setminpricecurrency] = useState('');
    const [minprice, setminprice] = useState();
    const [maxpricecurrency, setmaxpricecurrency] = useState('');
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