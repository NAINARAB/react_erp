import React, { useEffect, useState } from "react";
import Header from "../../comp/header/header";
import Sidenav from "../../comp/sidenav/sidenav";
import { TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper, IconButton, Autocomplete, TextField, Chip } from "@mui/material";
import '../common.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';



function Product() {
    let [rows, setrows] = useState([]);
    const [productname, setproductname] = useState('');
    const [productcode, setproductcode] = useState('');
    const [producttype, setproductype] = useState('');
    const [currency, setcurrency] = useState('');
    const [minprice, setminprice] = useState();
    const [maxprice, setmaxprice] = useState();
    const [multipleparts, setmultipleparts] = useState(false);
    const [dispaddpro, setaddpro] = useState(false);
    let count = 1;
    const dummy = [];
    function setmul(e) { setmultipleparts(e.target.checked) }
    let enterddata = {
        "product_code": productcode,
        "product_name": productname,
        "product_type": producttype,
        "minimum_price": minprice,
        "maximum_price": maxprice,
        "currency": currency,
        "multiple_parts": multipleparts,
    };



    function Butns() {
        return (
            <>
                <IconButton aria-label="expand row" size="small" sx={{ marginLeft: '0.5em' }}><EditIcon /></IconButton>
                <IconButton aria-label="expand row" size="small" sx={{ color: 'rgba(255, 0, 0, 0.755)', marginRight: '1em' }}><DeleteIcon /></IconButton>
            </>
        );
    }

    useEffect(() => {

        fetch('https://erp-dwe8a.ondigitalocean.app/api/get?model=product')
            .then((res) => { return res.json(); })
            .then((data) => {
                setrows(data.data)
            })

    }, [])



    let Addproduct = () => {

        const url = 'https://erp-dwe8a.ondigitalocean.app/api/get?model=product'
            const option = {
                method: "POST",
                body: enterddata
            }

            useEffect(() => {
                fetch(url, option)
                    .then(res => { return res.json() })
                    .then(data => (console.log(data)))
            }, [])

        let Dispmultipro = () => {
            return (
                <><br /><br /><br /><br /><br />
                    <div className="col-lg-4 tablepadding">
                        <label className="micardlble">Add Multiple Parts</label>
                        <Autocomplete
                            sx={{ backgroundColor: 'transparent' }}
                            multiple
                            id="tags-filled"
                            options={dummy.map((option) => option.title)}
                            freeSolo
                            renderTags={(value, getTagProps) =>
                                value.map((option, index) => (
                                    <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                                ))
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Multiple Parts"

                                    multiline
                                    rows={2}
                                    placeholder="Type here"
                                    variant="standard"
                                />
                            )}
                        />
                    </div><div className="col-lg-4"></div><div className="col-lg-4"></div>
                </>
            );
        }
        return (
            <>
                <form>
                    <div className="micard">
                        <h5 className="micardhdr">Add Product</h5>

                        <div className="micardbdy row">
                            <div className="col-lg-4">
                                <label className="micardlble" >Product Name</label><br />
                                <input className="micardinpt" onChange={(e) => { setproductname(e.target.value); }} required />
                            </div>

                            <div className="col-lg-4">
                                <label className="micardlble">Product Code</label><br />
                                <input onChange={(e) => { setproductcode(e.target.value); }} className="micardinpt" required />
                            </div>

                            <div className="col-lg-4">
                                <label className="micardlble">Product Type</label><br />
                                <select className="micardinpt" value={producttype} onChange={(e) => { setproductype(e.target.value); }}>
                                    <option selected='true' value='' required>Select Type</option>
                                    <option>Finished</option>
                                    <option>Semi-Finished</option>
                                </select>
                            </div>

                            <div className="col-lg-4">
                                <label className="micardlble">Currency</label><br />
                                <select className="micardinpt" value={currency} onChange={(e) => { setcurrency(e.target.value); }}>
                                    <option selected='true' value='' required>Select Currency</option>
                                    <option>INR</option>
                                    <option>INR2</option>
                                </select>
                            </div>


                            <div className="col-lg-4">
                                <label className="micardlble">Min Price</label><br />
                                <input value={currency} disabled='true' className="micardgrpinpt" />
                                <input type='number' onChange={(e) => { setminprice(e.target.value); }} className="micardgrpinpt1" />
                            </div>


                            <div className="col-lg-4">
                                <label className="micardlble">Max Price</label><br />
                                <input value={currency} disabled='true' className="micardgrpinpt" />
                                <input type='number' onChange={(e) => { setmaxprice(e.target.value); }} className="micardgrpinpt1" />
                            </div>

                            <div className="col-lg-4">
                                <label className="micardlble">Multiple Parts</label><br />
                                <div className="micardboxinpt">
                                    <input type='checkbox' onChange={setmul} style={{ height: '1em', width: '1em' }} /> &emsp;Add Multiple Parts
                                </div>
                            </div><div className="col-lg-4"></div><div className="col-lg-4"></div>
                            {multipleparts == true ? <Dispmultipro /> : ""}
                        </div>

                    </div><br />
                    <button className="comadbtn" type="submit">Add</button>
                    <button className="cancelbtn" onClick={opnProdt} >Back</button>
                </form>
            </>
        );
    }

    function opnAdd() {
        document.getElementById('adbtn').style.display = 'none';
        document.getElementById('dispproduct').style.display = 'none';
        setaddpro(true)

    }
    function opnProdt() {
        document.getElementById('adbtn').style.display = 'block';;
        document.getElementById('dispproduct').style.display = 'block';
        setaddpro(false)
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
                    <div>
                        <div className="comhed">
                            <button className="comadbtn" onClick={opnAdd} id='adbtn'>Add</button>
                            <h5>Products</h5>
                            <h6>Master Data Management / Product</h6>
                        </div>
                        <div className="tablepadding">
                            <div id="dispproduct">
                                {rows.length != 0 ? <TableContainer component={Paper} sx={{ maxHeight: 650 }}>
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
                                            {rows.map((rowobj) => {

                                                return (
                                                    <>
                                                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} hover='true'>
                                                            <TableCell component="th" scope="row">
                                                                {count++}
                                                            </TableCell>
                                                            <TableCell>{rowobj.product_name == null ? "Null" : rowobj.product_name}</TableCell>
                                                            <TableCell>{rowobj.product_type == null ? "Null" : rowobj.product_type}</TableCell>
                                                            <TableCell>{rowobj.min_stock == null ? "Null" : rowobj.min_stock}</TableCell>
                                                            <TableCell>{rowobj.minimum_price == null ? "Null" : rowobj.minimum_price}</TableCell>
                                                            <TableCell>{rowobj.maximum_price == null ? "Null" : rowobj.maximum_price}</TableCell>
                                                            <TableCell>{rowobj.currency_get == null ? "Null" : rowobj.currency_get}</TableCell>
                                                            <TableCell>{rowobj.multiple_parts ? "True" : "False"}
                                                                {rowobj.multiple_parts == null ? "Null" : ''}</TableCell>
                                                            <TableCell>{rowobj.parts == null ? "Null" : rowobj.parts}</TableCell>
                                                            <TableCell><Butns /></TableCell>
                                                        </TableRow>
                                                    </>
                                                )
                                            })}
                                        </TableBody>
                                    </Table>
                                </TableContainer> : "No Data Or Looking for Response From the Server...."}


                            </div>
                            {dispaddpro == false ? '' : <Addproduct />}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}


export default Product;