import * as React from 'react';
import { useState, useEffect } from 'react';
import Header from "../../comp/header/header";
import Sidenav from "../../comp/sidenav/sidenav";
import { IconButton, Button, Box, Collapse, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Draggable from 'react-draggable';
import { Dialog, DialogContent, DialogTitle, Slide, DialogActions } from '@mui/material/';
import Loader from '../../comp/Load/loading';
import axios from 'axios';




const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});

function PaperComponent(props) {
    return (
        <Draggable
            handle="#draggable-dialog-title"
            cancel={'[class*="MuiDialogContent-root"]'}
        >
            <Paper {...props} />
        </Draggable>
    );
}

function Butns() {
    return (
        <>
            <IconButton aria-label="expand row" size="small" sx={{ marginLeft: '0.5em' }}><EditIcon /></IconButton>
            <IconButton aria-label="expand row" size="small" sx={{ color: 'rgba(255, 0, 0, 0.755)', marginRight: '1em' }}><DeleteIcon /></IconButton>
        </>
    );
}

let count = 0;


function Row(props) {
    const { row } = props;
    const { rowcount } = props;
    const [open, setOpen] = useState(false);
    const [dispDilog, setDispDilog] = useState(false);
    const [pfdatas, setpfdatas] = useState([]);
    const [propk, setpropk] = useState([]);
    const [partname, setpartname] = useState('');
    const [productionphase, setproductionphase] = useState('');
    const [productivityperday, setproductivityperday] = useState();
    const [scrap, setscrap] = useState('');
    const {productionphasearr} = props;

    const openDialogue = () => {
        setDispDilog(true);
    };
    const handleClose = () => {
        setDispDilog(false);
    };
    //Production flow

    useEffect(() => {

        fetch(`https://erp-test-3wqc9.ondigitalocean.app/api/get?model=productivity&filter_by=product&filter_value=${row.pk}`)
            .then((res) => { return res.json(); })
            .then((data) => {
                setpfdatas(data.data);
            })
        
    }, [])

    const postPF = axios.create({
        baseURL: "https://erp-test-3wqc9.ondigitalocean.app/api/get?model=productivity"
    });

    const postproductivity = (ppk, pnme, phs, qpd, sq) => {
        postPF.post('', {
            product: ppk,
            part_name: pnme,
            phase: phs,
            quantity_perday: qpd,
            scrap_quantity: sq
        })
            .then((res) => {
                console.log("after then", res)
                if (res.data.status === 'success') {

                    const pfpost = axios.create({
                        baseURL: "https://erp-test-3wqc9.ondigitalocean.app/api/pf"
                    });
                    const pf = () => {
                        pfpost.post('', {
                            product_code: ppk,
                            part_name: pnme,
                        })
                        .then((pres) => {
                            if (pres.data.status === 'success'){
                                alert('post Success');
                            }
                            else if (pres.data.status === 'failure') {
                                alert('pf error...');
                            }
                            else {
                                alert('something..')
                            }
                        })
                        .catch((err) => {
                            console.log(err);
                        })
                    }
                    pf(ppk,pnme)
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
        postproductivity(propk, partname, productionphase, productivityperday, scrap);
    }



    return (
        <>
            <React.Fragment>
                <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} hover='true' onClick={() => setOpen(!open)}>
                    <TableCell component="th" scope="row">
                        {rowcount}
                    </TableCell>
                    <TableCell>{row.product_code}</TableCell>
                    <TableCell>{row.product_name}</TableCell>
                    <TableCell>{row.product_type}</TableCell>
                    <TableCell align='center'>
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => setOpen(!open)}
                        >
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </TableCell>
                </TableRow>


                <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0, backgroundColor: '#f2f2f2' }} colSpan={5}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box sx={{ margin: '7em 5em' }}>
                                <div>
                                    <h5>{row.product_name} ( Product-Code : {row.product_code})</h5>
                                </div>
                                {Object.values(pfdatas).length != 0 ?
                                    <>
                                        <TableContainer component={Paper}>
                                            <Table stickyHeader size="small" aria-label="purchases">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell align='center' sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white' }}>Part Name</TableCell>
                                                        <TableCell align='center' sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white' }}>Production Phase</TableCell>
                                                        <TableCell align='center' sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white' }}>Productivity Per Day</TableCell>
                                                        <TableCell align='center' sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white' }}>Scrap</TableCell>
                                                        <TableCell align='center' sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white' }}>Action</TableCell>
                                                    </TableRow>
                                                </TableHead>

                                                <TableBody>
                                                    {pfdatas.map((PF) => (
                                                        <TableRow>
                                                            <TableCell align='center' component="th" scope="row">{PF.part_name !== null ? PF.part_name : "Null"}</TableCell>
                                                            <TableCell align='center'>{PF.phase_get !== null ? PF.phase_get : "Null"}</TableCell>
                                                            <TableCell align='center'>{PF.quantity_perday !== null ? PF.quantity_perday : "Null"}</TableCell>
                                                            <TableCell align='center'>{PF.scrap_quantity !== null ? PF.scrap_quantity : "Null"}</TableCell>
                                                            <TableCell align='center'><Butns /></TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </> : <h3>No Data </h3>}
                                <IconButton aria-label="expand row" onClick={() => {
                                    openDialogue(); setpropk(row.pk);
                                }}
                                    size="small"
                                    sx={{ float: 'right', backgroundColor: 'white', margin: '0.5em', color: '#e3242b' }}
                                >{<AddIcon />}</IconButton>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>


            </React.Fragment>
            <div>
                <Dialog
                    open={dispDilog}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    PaperComponent={PaperComponent}
                    aria-labelledby="draggable-dialog-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle style={{ cursor: 'move', padding: '0px' }} id="draggable-dialog-title">
                        <div className="comhed">
                            <h5>Add Production Flow</h5>
                        </div>
                    </DialogTitle>

                    <DialogContent>
                        <div className='setsp'>
                            <form>
                                <label className="micardlble">Part Name</label><br />
                                <select className="micardinpt" onChange={(e) => { setpartname(e.target.value) }} required>
                                    <option value={''} selected={true} disabled={true}>Select Part</option>
                                    {row.parts.map(item => (
                                        <option value={item}>{item}</option>
                                    ))}
                                </select>
                                <label className="micardlble">Production Phase</label><br />
                                <select className="micardinpt" onChange={(e) => { setproductionphase(e.target.value) }} required>
                                <option value={''} selected={true} disabled={true}>Select Phase</option>
                                    {productionphasearr.map(ppa => (
                                        <option value={ppa.pk}>{ppa.phase_name}</option>
                                    ))}
                                </select>
                                <label className="micardlble">Productivity Per Day</label><br />
                                <input className="micardinpt" type='number' onChange={(e) => { setproductivityperday(e.target.value) }} required />
                                <label className="micardlble">Scrap Quantity</label><br />
                                <input className="micardinpt" type='number' onChange={(e) => { setscrap(e.target.value) }} required />
                            </form>
                        </div>
                    </DialogContent>

                    <DialogActions>
                        <div className='tablepadding'>
                            <button className='comadbtn' onClick={doPost} style={{ marginBottom: 'unset' }}>Add</button>
                            <button className='cancelbtn' onClick={handleClose} >Cancel</button>
                        </div>
                    </DialogActions>
                </Dialog>
            </div>
        </>
    );
}

function Productionflow() {

    const [productdata, setproductdata] = useState([]);
    const [productionphasearr,setproductionphasearr] = useState([]);

    useEffect(() => {
        fetch('https://erp-test-3wqc9.ondigitalocean.app/api/get?model=product')
            .then((res) => { return res.json(); })
            .then((data) => {
                setproductdata(data.data)
            })
        fetch('https://erp-test-3wqc9.ondigitalocean.app/api/get?model=productionphase')
            .then((res) => { return res.json(); })
            .then((data) => {
                setproductionphasearr(data.data);
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
                        <h5>Production Flow</h5>
                        <h6>Master Data Management / Production Flow</h6>
                    </div>
                    <div className="tablepadding">
                        {productdata.length !== 0 ?
                            <>
                                <TableContainer component={Paper} sx={{ maxHeight: 740 }}>
                                    <Table aria-label="collapsible table" stickyHeader>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell width={100} sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white' }}>S.No</TableCell>
                                                <TableCell width={200} sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white' }}>Product Code</TableCell>
                                                <TableCell width={300} sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white' }}>Product Name</TableCell>
                                                <TableCell sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white' }}>Product Type</TableCell>
                                                <TableCell sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white' }} align='center'></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {productdata.map((row) => (
                                                <Row row={row} rowcount={
                                                    (productdata.length + 1) - (productdata.length - count++)
                                                }
                                                productionphasearr={productionphasearr} />
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </> : <Loader />}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Productionflow;