import React, { useEffect, useState, useMemo } from "react";
import Header from "../../comp/header/header";
import Sidenav from "../../comp/sidenav/sidenav";
import {
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Slide, Alert,
    TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper, IconButton, Autocomplete, TextField, Chip
} from "@mui/material";
import '../common.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Loader from "../../comp/Load/loading";
import axios from "axios";
import SearchIcon from '@mui/icons-material/Search';


const token = sessionStorage.getItem("token");

const trarr = ['up', 'down', 'left', 'right'];
var item = trarr[Math.floor(Math.random() * trarr.length)];

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction={item} ref={ref} {...props} />;
});



const Product = () => {
    const [dispalr, setdispalr] = useState(false);
    const [alrstatus, setalrstatus] = useState(false);
    let [rows, setrows] = useState([]);
    const [dispaddpro, setaddpro] = useState(false);
    const [countrysdat, setcountrydat] = useState([])
    let count = 1;
    const dummy = [];
    const [pk, setpk] = useState();
    const [delproname, setdelproname] = useState('');
    const [open, setOpen] = useState(false);
    const [Uopen, setUopen] = useState(false);

    {/* For update Product variables */ }

    const [updtpk, setupdtpk] = useState();
    const [prco, setco] = useState('');
    const [prnme, setnme] = useState('');
    const [prtyp, settyp] = useState('');
    const [prmsq, setmsq] = useState();
    const [prmxp, setmxp] = useState('');
    const [prmnp, setmnp] = useState('');
    const [prcrcy, setcrcy] = useState('');
    const [prcrcypk, setcrcypk] = useState('');
    const [prmp, setmp] = useState('');
    const [prmparr, setprmparr] = useState([]);

    const Alr = () => {
        return (
            <div className="alrt">
                <Alert severity={alrstatus === true ? "success" : "error"}
                    onClose={() => { setdispalr(false) }}>{alrstatus === true ? "New Product Added" :
                        ":) Error! Please Try Again"
                    }</Alert>
            </div>
        );
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const UhandleClickOpen = () => {
        setUopen(true);
    };

    const UhandleClose = () => {
        setUopen(false);
    };

    const prdupdt = axios.create({ //
        baseURL: `https://erp-test-3wqc9.ondigitalocean.app/api/get?model=product&pk=${updtpk}`
    });


    const pudtProduct = (prc, prn, prty, minstk, minpr, maxpr, crny, mp, mpar) => {
        prdupdt.put('', {
            product_code: prc,
            product_name: prn,
            product_type: prty,
            minimum_stock_quantity: minstk,
            maximum_price: maxpr,
            minimum_price: minpr,
            currency: crny,
            multiple_parts: mp,
            parts: mpar
        },
            {
                headers: {
                    'Authorization': `token ${token}`
                }
            })
            .then((res) => {
                console.log("Post After", res)
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

    let doPUT = (e) => {
        e.preventDefault();
        pudtProduct(prco, prnme, prtyp, prmsq, prmnp, prmxp, prcrcypk, prmp, prmparr);
    }



    useEffect(() => {

        fetch('https://erp-test-3wqc9.ondigitalocean.app/api/get?model=product',
            {
                method: 'GET',
                headers: {
                    'Authorization': `token ${token}`
                }
            })
            .then((res) => { return res.json(); })
            .then((data) => {
                setrows(data.data)
            })
        fetch('https://erp-test-3wqc9.ondigitalocean.app/api/get?model=currency',
            {
                method: 'GET',
                headers: {
                    'Authorization': `token ${token}`
                }
            })
            .then((res) => { return res.json(); })
            .then((data) => {
                setcountrydat(data.data);
            })

    }, [])

    //for fetch the countrys currency



    const Addproduct = () => {

        const [productname, setproductname] = useState('');
        const [productcode, setproductcode] = useState('');
        const [producttype, setproductype] = useState('');
        const [currency, setcurrency] = useState();
        const [minprice, setminprice] = useState(0);
        const [maxprice, setmaxprice] = useState(0);
        const [minstock, setminstock] = useState(0);
        const [multi, setmulti] = useState(false);
        const [parts, setparts] = useState([]);



        const prdtpost = axios.create({
            baseURL: "https://erp-test-3wqc9.ondigitalocean.app/api/get?model=product"
        });

        const postProduct = (productcode, productname, producttype, mult, prt, msq, currency, minprice, maxprice) => {
            prdtpost.post('', {
                product_code: productcode,
                product_name: productname,
                product_type: producttype,
                multiple_parts: mult,
                parts: prt,
                minimum_stock_quantity: msq,
                maximum_price: maxprice,
                minimum_price: minprice,
                currency: currency,
            },
            {
                headers: {
                    'Authorization': `token ${token}`
                }
            })
                .then((res) => {
                    console.log("after then", res)
                    if (res.data.status === 'success') {
                        console.log(res.data);
                        setdispalr(true);
                        setalrstatus(true);
                        // alert("Post Successfully");
                        // console.log("Posted the data")
                    }
                    else {
                        if (res.data.status === 'failure') {
                            setdispalr(true);
                            setalrstatus(false);
                        }
                    }

                }).catch((err) => {
                    console.log(err);
                })
        };


        const doPost = (e) => {
            e.preventDefault();
            postProduct(productcode, productname, producttype, multi, parts, minstock, currency, minprice, maxprice);
        }

        return (
            <>
                {dispalr == true ? <Alr /> : null}
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
                                <select className="micardinpt" onChange={(e) => { setproductype(e.target.value); }} required>
                                    <option defaultValue={true} value={''}>Select Type</option>
                                    <option value={"finished"}>Finished</option>
                                    <option value={"semi-finished"}>Semi-Finished</option>
                                </select>
                            </div>

                            <div className="col-lg-4">
                                <label className="micardlble">Currency</label><br />
                                <select className="micardinpt" onChange={(e) => { setcurrency(e.target.value); }} required>
                                    <option value={""} defaultValue={true} >Select Currency</option>
                                    {countrysdat.map(contobj => (
                                        <>
                                            <option value={contobj.pk}>{contobj.currency_name}</option>
                                        </>
                                    ))}
                                </select>

                            </div>


                            <div className="col-lg-4">
                                <label className="micardlble">Min Price</label><br />
                                <input value={currency} disabled={true} className="micardgrpinpt" />
                                <input type='number' min={0} onChange={(e) => { setminprice(e.target.value); }} className="micardgrpinpt1" placeholder="Minimum Value : 0" />
                            </div>


                            <div className="col-lg-4">
                                <label className="micardlble">Max Price</label><br />
                                <input value={currency} disabled={true} className="micardgrpinpt" />
                                <input type='number' min={parseInt(minprice) + 1} onChange={(e) => { setmaxprice(e.target.value); }} placeholder="Grater Then Minimum Price" className="micardgrpinpt1" />
                            </div>

                            <div className="col-lg-4">
                                <label className="micardlble">Minimum Stock</label><br />
                                <input type={'number'} min={0} onChange={(e) => { setminstock(e.target.value); console.log('values in prr', parts); }} className="micardinpt" placeholder="Minimum Value : 0" required />
                            </div>

                            <div className="col-lg-4">
                                <label className="micardlble">Multiple Parts</label><br />
                                <div className="micardboxinpt">
                                    <input type={'checkbox'} checked={multi} onChange={() => { setmulti(!multi) }} className="micardboxinpt" required />
                                    &emsp;Add Multiple Parts
                                </div>
                            </div><div className="col-lg-4"></div>

                            {multi === true ?
                                <>
                                    <div className="col-lg-6"><br /><br />
                                        <Autocomplete
                                            multiple
                                            id="tags-filled"
                                            options={dummy.map((option) => option.title)}
                                            freeSolo
                                            onChange={(item, index) => {
                                                setparts(index);
                                            }}
                                            renderTags={(value, getTagProps) =>
                                                value.map((option, index) => (
                                                    <Chip variant="outlined" label={option} onDelete={() => { parts.pop(parts[index]) }} {...getTagProps({ index })} />
                                                ))
                                            }
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    variant="filled"
                                                    label="Parts"
                                                    placeholder="type here"
                                                    id="tagval"
                                                />
                                            )}
                                        />
                                    </div><div className="col-lg-6" >

                                    </div>
                                </> : null}

                        </div>

                    </div><br />
                    <button className="comadbtn" type={'submit'} onClick={doPost}>Add</button>
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





    function doDelete() {
        deleteRow(pk);
    }

    const deleteRow = (pkobj) => {
        console.log(pkobj)
        let currentpk = pkobj;
        const deleterowurl = axios.create({
            baseURL: `https://erp-test-3wqc9.ondigitalocean.app/api/get?model=product&pk=${currentpk}`
        });

        deleterowurl.delete('', {
        },
        {
            headers: {
                'Authorization': `token ${token}`
            }
        })
            .then((response) => {
                console.log("after then", response);
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const DispDidenav = React.useCallback(() => {
        return (<><Sidenav /></>);
    }, []);

    const [searchdata, setsearchdata] = useState('');
    return (
        <>
            <div className="row">
                <div className="col-lg-12">
                    <Header />
                </div>
                <div className="col-lg-2">
                    <DispDidenav />
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
                                {rows.length !== 0 ? <TableContainer component={Paper} sx={{ maxHeight: 650 }}>
                                    <Table stickyHeader aria-label="simple table" sx={{ fontFamily: 'prosans' }}>
                                        <TableHead >
                                            <TableRow>
                                                <TableCell variant="head" sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white', fontFamily: 'prosans' }} >S.No</TableCell>
                                                <TableCell variant="head" sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white', fontFamily: 'prosans' }} >Product Name</TableCell>
                                                <TableCell variant="head" sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white', fontFamily: 'prosans' }} >Product Code</TableCell>
                                                <TableCell variant="head" sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white', fontFamily: 'prosans' }} >Product Type</TableCell>
                                                <TableCell variant="head" sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white', fontFamily: 'prosans' }} >Min Stock</TableCell>
                                                <TableCell variant="head" sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white', fontFamily: 'prosans' }} >Min Price</TableCell>
                                                <TableCell variant="head" sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white', fontFamily: 'prosans' }} >Max Price</TableCell>
                                                <TableCell variant="head" sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white', fontFamily: 'prosans' }} >Currency</TableCell>
                                                <TableCell variant="head" sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white', fontFamily: 'prosans' }} >Multiple Parts</TableCell>
                                                <TableCell variant="head" sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white', fontFamily: 'prosans' }} >Parts</TableCell>
                                                <TableCell variant="head" sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white', fontFamily: 'prosans' }} >Action</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {searchdata == '' ?
                                                rows.map((rowobj) => {
                                                    return (
                                                        <>
                                                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 }, fontFamily: 'prosans' }} hover={true}>
                                                                <TableCell component="th" scope="row" sx={{ fontFamily: 'prosans' }}>
                                                                    {count++}
                                                                </TableCell>
                                                                <TableCell sx={{ fontFamily: 'prosans' }}>{rowobj.product_name === null ? "Null" : rowobj.product_name}</TableCell>
                                                                <TableCell sx={{ fontFamily: 'prosans' }}>{rowobj.product_code === null ? "Null" : rowobj.product_code}</TableCell>
                                                                <TableCell sx={{ fontFamily: 'prosans' }}>{rowobj.product_type === null ? "Null" : rowobj.product_type}</TableCell>
                                                                <TableCell sx={{ fontFamily: 'prosans' }}>{rowobj.minimum_stock_quantity === null ? "Null" : rowobj.minimum_stock_quantity}</TableCell>
                                                                <TableCell sx={{ fontFamily: 'prosans' }}>{rowobj.minimum_price === null ? "Null" : rowobj.minimum_price}</TableCell>
                                                                <TableCell sx={{ fontFamily: 'prosans' }}>{rowobj.maximum_price === null ? "Null" : rowobj.maximum_price}</TableCell>
                                                                <TableCell sx={{ fontFamily: 'prosans' }}>{rowobj.currency_get === null ? "Null" : rowobj.currency_get}</TableCell>
                                                                <TableCell sx={{ fontFamily: 'prosans' }}>{rowobj.multiple_parts == null ? "Null" : rowobj.multiple_parts === true ? "true" : "false"}</TableCell>
                                                                <TableCell sx={{ fontFamily: 'prosans' }}>{rowobj.parts !== null ? rowobj.parts.length !== 0 ? rowobj.parts.join(', ') : 'Null' : "Null"}</TableCell>
                                                                <TableCell>
                                                                    <IconButton aria-label="expand" size="small"
                                                                        onClick={() => {
                                                                            setco(rowobj.product_code); setnme(rowobj.product_name); settyp(rowobj.product_type);
                                                                            setmsq(rowobj.minimum_stock_quantity); setmxp(rowobj.maximum_price); setmnp(rowobj.minimum_price);
                                                                            setcrcy(rowobj.currency_get); setcrcypk(rowobj.currency); setmp(rowobj.multiple_parts); setupdtpk(rowobj.pk);
                                                                            setprmparr(rowobj.parts);
                                                                            UhandleClickOpen();
                                                                        }}
                                                                    ><EditIcon /></IconButton>
                                                                    <IconButton aria-label="expand" onClick={() => { setpk(rowobj.pk); setdelproname(rowobj.product_name); handleClickOpen(); }}
                                                                        size="small" sx={{ color: 'rgba(255, 0, 0, 0.755)' }}>
                                                                        <DeleteIcon /></IconButton>
                                                                </TableCell>
                                                            </TableRow>
                                                        </>
                                                    )
                                                })
                                                :
                                                rows.map((rowobj) => ( //|| rowobj.parts.map(ob => (<>{ob.match(searchdata) == searchdata}</>))  ||  || rowobj.parts.map((ob,ind) => ((ob.toString()).match(searchdata) == searchdata))
                                                    <>
                                                        {(rowobj.product_name.toLowerCase()).match(searchdata) == searchdata || (rowobj.product_code.toLowerCase()).match(searchdata) == searchdata || (rowobj.product_type.toLowerCase()).match(searchdata) == searchdata
                                                            || ((rowobj.multiple_parts.toString()).toLowerCase()).match(searchdata) == searchdata || (rowobj.minimum_stock_quantity.toString()).match(searchdata) == searchdata || (rowobj.maximum_price.toString()).match(searchdata) == searchdata
                                                            || rowobj.minimum_price == searchdata || (rowobj.currency_get.toLowerCase()).match(searchdata) == searchdata ||
                                                            ((rowobj.parts.toString()).toLowerCase()).match(searchdata) == searchdata ?

                                                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} hover={true}>
                                                                <TableCell component="th" scope="row" sx={{ fontFamily: 'prosans' }}>
                                                                    {count++}
                                                                </TableCell>
                                                                <TableCell sx={{ fontFamily: 'prosans' }}>{rowobj.product_name === null ? "Null" : rowobj.product_name}</TableCell>
                                                                <TableCell sx={{ fontFamily: 'prosans' }}>{rowobj.product_code === null ? "Null" : rowobj.product_code}</TableCell>
                                                                <TableCell sx={{ fontFamily: 'prosans' }}>{rowobj.product_type === null ? "Null" : rowobj.product_type}</TableCell>
                                                                <TableCell sx={{ fontFamily: 'prosans' }}>{rowobj.minimum_stock_quantity === null ? "Null" : rowobj.minimum_stock_quantity}</TableCell>
                                                                <TableCell sx={{ fontFamily: 'prosans' }}>{rowobj.minimum_price === null ? "Null" : rowobj.minimum_price}</TableCell>
                                                                <TableCell sx={{ fontFamily: 'prosans' }}>{rowobj.maximum_price === null ? "Null" : rowobj.maximum_price}</TableCell>
                                                                <TableCell sx={{ fontFamily: 'prosans' }}>{rowobj.currency_get === null ? "Null" : rowobj.currency_get}</TableCell>
                                                                <TableCell sx={{ fontFamily: 'prosans' }}>{rowobj.multiple_parts == null ? "Null" : rowobj.multiple_parts === true ? "true" : "false"}</TableCell>
                                                                <TableCell sx={{ fontFamily: 'prosans' }}>{rowobj.parts !== null ? rowobj.parts.length !== 0 ? rowobj.parts.join(', ') : 'Null' : "Null"}</TableCell>
                                                                <TableCell>
                                                                    <IconButton aria-label="expand" size="small"
                                                                        onClick={() => {
                                                                            setco(rowobj.product_code); setnme(rowobj.product_name); settyp(rowobj.product_type);
                                                                            setmsq(rowobj.minimum_stock_quantity); setmxp(rowobj.maximum_price); setmnp(rowobj.minimum_price);
                                                                            setcrcy(rowobj.currency_get); setcrcypk(rowobj.currency); setmp(rowobj.multiple_parts); setupdtpk(rowobj.pk);
                                                                            setprmparr(rowobj.parts);
                                                                            UhandleClickOpen();
                                                                        }}
                                                                    ><EditIcon /></IconButton>
                                                                    <IconButton aria-label="expand" onClick={() => { setpk(rowobj.pk); setdelproname(rowobj.product_name); handleClickOpen(); }}
                                                                        size="small" sx={{ color: 'rgba(255, 0, 0, 0.755)' }}>
                                                                        <DeleteIcon /></IconButton>
                                                                </TableCell>
                                                            </TableRow>
                                                            : null}
                                                    </>
                                                ))
                                            }
                                        </TableBody>
                                    </Table>
                                </TableContainer> : <Loader />}
                            </div>
                            {dispaddpro === false ? null : <Addproduct />}
                        </div>
                    </div>
                </div>
            </div>

            {/* Delete Dialog */}
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
                            <b style={{ color: 'black' }}>Product Name : &emsp;{delproname}</b>
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
            <div>
                <Dialog
                    open={Uopen}
                    onClose={UhandleClose}
                    TransitionComponent={Transition}
                >
                    <div className="comhed">
                        <h5>Update Products</h5>
                    </div>
                    <DialogTitle id="alert-dialog-title">
                        {"Row Details :  "}
                    </DialogTitle>
                    <DialogContent>

                        <div className="row">
                            <div className="col-lg-6 editscrn">
                                <label className="micardlble" >Product Code</label><br />
                                <input className="micardinpt" value={prco} onChange={(e) => setco(e.target.value)} required />
                            </div>
                            <div className="col-lg-6 editscrn">
                                <label className="micardlble" >Product Name</label><br />
                                <input className="micardinpt" value={prnme} onChange={(e) => setnme(e.target.value)} required />
                            </div>
                            <div className="col-lg-6 editscrn">
                                <label className="micardlble">Product Type</label><br />
                                <select className="micardinpt" onChange={(e) => { settyp(e.target.value); }} required>
                                    <option defaultValue={true} disabled={true} value={prtyp}>{prtyp}</option>
                                    <option value={"finished"}>Finished</option>
                                    <option value={"semi-finished"}>Semi-Finished</option>
                                </select>
                            </div>
                            <div className="col-lg-6 editscrn">
                                <label className="micardlble">Currency</label><br />
                                <select className="micardinpt" onChange={(e) => { setcrcypk(e.target.value); }} required>
                                    <option value={prcrcypk} defaultValue={true} >{prcrcy}</option>
                                    {countrysdat.map(contobj => (
                                        <>
                                            <option value={contobj.pk}>{contobj.currency_name}</option>
                                        </>
                                    ))}
                                </select>
                            </div>
                            <div className="col-lg-6 editscrn">
                                <label className="micardlble">Min Price</label><br />
                                <input type='number' value={prmnp} onChange={(e) => { setmnp(e.target.value); }} className="micardinpt" />
                            </div>
                            <div className="col-lg-6 editscrn">
                                <label className="micardlble">Max Price</label><br />
                                <input type='number' value={prmxp} onChange={(e) => { setmxp(e.target.value); }} className="micardinpt" />
                            </div>

                            <div className="col-lg-6 editscrn">
                                <label className="micardlble">Minimum Stock</label><br />
                                <input type='number' value={prmsq === null ? "" : prmsq} min={0} onChange={(e) => { setmsq(e.target.value); }} className="micardinpt" required />
                            </div>
                            <div className="col-lg-6">
                                <label className="micardlble">Multiple Parts</label><br />
                                <div className="micardboxinpt">
                                    <input type={'checkbox'} checked={prmp} onChange={() => { setmp(!prmp) }} className="micardboxinpt" required />
                                    &emsp;Add Multiple Parts
                                </div>
                            </div>
                            {prmp === true ?
                                <>
                                    <div className="col-lg-12" style={{ padding: '1em' }}>
                                        <Autocomplete
                                            sx={{ backgroundColor: 'transparent' }}
                                            multiple
                                            id="tags-filled"
                                            options={dummy.map((option) => option.title)}
                                            freeSolo
                                            value={prmparr}
                                            onChange={(item, index) => {
                                                setprmparr(index);
                                            }}
                                            renderTags={(value, getTagProps) =>
                                                value.map((option, index) => (
                                                    <Chip variant="outlined" label={option} onDelete={() => { prmparr.pop(prmparr[index]) }} {...getTagProps({ index })} />
                                                ))
                                            }
                                            renderInput={(params) => (
                                                <TextField
                                                    sx={{ backgroundColor: 'transparent' }}
                                                    {...params}
                                                    variant="filled"
                                                    label="Parts"
                                                    id="tagval"
                                                />
                                            )}
                                        />
                                    </div><div className="col-lg-6" >

                                    </div>
                                </> : null}
                        </div><br />
                        <button className="comadbtn" onClick={doPUT} style={{ marginBottom: 'unset' }}>Update</button>
                        <button className="cancelbtn" onClick={UhandleClose} >Discord</button>
                    </DialogContent>
                </Dialog><br />
            </div>
        </>
    );
}


export default Product;