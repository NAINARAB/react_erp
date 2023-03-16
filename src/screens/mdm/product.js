import React, { useEffect, useState } from "react";
import Header from "../../comp/header/header";
import Sidenav from "../../comp/sidenav/sidenav";
import { TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper, IconButton, Autocomplete, TextField, Chip } from "@mui/material";
import '../common.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Loader from "../../comp/Load/loading";
import axios from "axios";

function Product() {
    let [rows, setrows] = useState([]);
    const [dispaddpro, setaddpro] = useState(false);
    const [countrysdat, setcountrydat] = useState([])
    let count = 1;
    const dummy = [];

    function Butns(props) {
        let pkvalue = props; //&pk=${pkvalue}  http://localhost:8080/deleteimage/${id} $pkvalue ,{method:"DELETE"}
        console.log(props)

        return (
            <>
                <IconButton aria-label="expand" size="small" sx={{ marginLeft: '0.5em' }}><EditIcon /></IconButton>
                <IconButton aria-label="expand" size="small" sx={{ color: 'rgba(255, 0, 0, 0.755)', marginRight: '1em' }}>
                    <DeleteIcon /></IconButton>
            </>
        );
    }

    //for fetch the product
    useEffect(() => {

        fetch('https://erp-dwe8a.ondigitalocean.app/api/get?model=product')
            .then((res) => { return res.json(); })
            .then((data) => {
                setrows(data.data)
            })

    }, [])

    //for fetch the countrys currency
    useEffect(() => {
        fetch('https://erp-dwe8a.ondigitalocean.app/api/get?model=currency')
            .then((res) => { return res.json(); })
            .then((data) => {
                setcountrydat(data.data);
            })
    }, [])



    let Addproduct = () => {
        const [productname, setproductname] = useState('');
        const [productcode, setproductcode] = useState('');
        const [producttype, setproductype] = useState('');
        const [currency, setcurrency] = useState('');
        const [minprice, setminprice] = useState();
        const [maxprice, setmaxprice] = useState();
        const [multipleparts, setmultipleparts] = useState(false);
        const [multipartarr, setmultipartarr] = useState([]);


        const prdtpost = axios.create({
            baseURL: "https://erp-dwe8a.ondigitalocean.app/api/get?model=product"
        });

        const postProduct = (productname, productcode, producttype, currency, minprice, maxprice, multipleparts, multipartarr) => {
            prdtpost.post('', {
                product_code: productcode,
                product_name: productname,
                product_type: producttype,
                maximum_price: maxprice,
                minimum_price: minprice,
                currency: currency,
                multiple_parts: multipleparts,
                parts: multipartarr
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
            postProduct(productname, productcode, producttype, currency, minprice, maxprice, multipleparts, multipartarr);
        }


        let Dispmultipro = () => {
            return (
                <><br /><br /><br /><br /><br />
                    <div className="col-lg-6 tablepadding">
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
                                    rows={3}
                                    placeholder="Type here"
                                    variant="standard"
                                    onChange={(e) => setmultipartarr(e.target.value)}
                                />
                            )}
                        />
                    </div><div className="col-lg-6"></div>
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
                                <input className="micardinpt" onChange={(e) => setproductname(e.target.value)} required />
                            </div>

                            <div className="col-lg-4">
                                <label className="micardlble">Product Code</label><br />
                                <input onChange={(e) => { setproductcode(e.target.value); }} className="micardinpt" required />
                            </div>

                            <div className="col-lg-4">
                                <label className="micardlble">Product Type</label><br />
                                <select className="micardinpt" value={producttype} onChange={(e) => { setproductype(e.target.value); }} required>
                                    <option selected='true' value='' >Select Type</option>
                                    <option value={"finished"}>Finished</option>
                                    <option value={"semi-finished"}>Semi-Finished</option>
                                </select>
                            </div>

                            <div className="col-lg-4">
                                <label className="micardlble">Currency</label><br />
                                <select className="micardinpt" value={currency} onChange={(e) => { setcurrency(e.target.value); }} required>
                                    <option selected='true' value=''>Select Currency</option>
                                    {countrysdat.map(conryobj => (
                                        <>
                                            <option value={conryobj.pk}>{conryobj.currency_name}</option>
                                        </>
                                    ))}
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
                                <input type='number' min={parseInt(minprice) + 1} onChange={(e) => { setmaxprice(e.target.value); }} className="micardgrpinpt1" />
                            </div>

                            <div className="col-lg-4">
                                <label className="micardlble">Multiple Parts</label><br />
                                <div className="micardboxinpt">
                                    <input type='checkbox' checked={multipleparts} onChange={() => { setmultipleparts(!multipleparts) }} style={{ height: '1em', width: '1em' }} /> &emsp;Add Multiple Parts
                                </div>
                            </div><div className="col-lg-4"></div><div className="col-lg-4"></div>
                            {multipleparts === true ? <Dispmultipro /> : null}
                        </div>

                    </div><br />
                    <button className="comadbtn" onClick={doPost}>Add</button>
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

    const deleterow = (pk) => {
        var crntpk = pk;
        const deleterowurl = axios.create({
            baseURL: `https://erp-new-production.up.railway.app/data-management/?model_name=product&pk=${crntpk}`
        });

        deleterowurl.delete('', {
        })
            .then((response) => {
                console.log("after then", response)
            })
        // window.location.reload();
    };


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
                                {rows.length !== 0 ? <TableContainer component={Paper} sx={{ maxHeight: 650 }}>
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
                                                            <TableCell>{rowobj.product_name === null ? "Null" : rowobj.product_name}</TableCell>
                                                            <TableCell>{rowobj.product_type === null ? "Null" : rowobj.product_type}</TableCell>
                                                            <TableCell>{rowobj.min_stock === null ? "Null" : rowobj.min_stock}</TableCell>
                                                            <TableCell>{rowobj.minimum_price === null ? "Null" : rowobj.minimum_price}</TableCell>
                                                            <TableCell>{rowobj.maximum_price === null ? "Null" : rowobj.maximum_price}</TableCell>
                                                            <TableCell>{rowobj.currency_get === null ? "Null" : rowobj.currency_get}</TableCell>
                                                            <TableCell>{rowobj.multiple_parts ? "True" : "False"}
                                                                {rowobj.multiple_parts === null ? "Null" : ''}</TableCell>
                                                            <TableCell>{rowobj.parts === null ? "Null" : rowobj.parts}</TableCell>
                                                            <TableCell>
                                                                <IconButton aria-label="expand" onClick={deleterow(rowobj.pk)} size="small" sx={{ color: 'rgba(255, 0, 0, 0.755)', marginRight: '1em' }}>
                                                                    <DeleteIcon /></IconButton>
                                                            </TableCell>
                                                        </TableRow>
                                                    </>
                                                )
                                            })}
                                        </TableBody>
                                    </Table>
                                </TableContainer> : <Loader />}
                            </div>
                            {dispaddpro === false ? null : <Addproduct />}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}


export default Product;