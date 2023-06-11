import * as React from 'react';
import { useState, useEffect } from 'react';
import Header from "../../comp/header/header";
import Sidenav from "../../comp/sidenav/sidenav";
import { IconButton, Alert, Box, Collapse, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Draggable from 'react-draggable';
import { Dialog, DialogContent, DialogTitle, Slide, DialogActions } from '@mui/material/';
import Loader from '../../comp/Load/loading';
import axios from 'axios';
import { Link } from 'react-router-dom';

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


function Productionflow() {

    let count = 0;
    const token = sessionStorage.getItem("token");
    const [productdata, setproductdata] = useState([]);
    const [productionphasearr, setproductionphasearr] = useState([]);
    const [dispalr, setdispalr] = useState(false);
    const [alrstatus, setalrstatus] = useState(false);
    const [alrmes, setalrmes] = useState('');
    const [fet, setfet] = useState(false);
    const success = document.getElementById("suc");
    const failure = document.getElementById("fail");

    const Alr = () => {
        return (
            <div className="alrt">
                <Alert severity={alrstatus === true ? "success" : "error"}
                    onClose={() => { setdispalr(false) }}>{alrmes}</Alert>
            </div>
        );
    }

    const playsuccess = () => {
        success.play();
    }
    const playfailure = () => {
        failure.play();
    }


    useEffect(() => {
        if (token != null) {
            fetch('https://erp-test-3wqc9.ondigitalocean.app/api/master-data-management?model=product',
                {
                    headers: {
                        'Authorization': `token ${token}`
                    }
                })
                .then((res) => { return res.json(); })
                .then((data) => {
                    setproductdata(data.data)
                })
            fetch('https://erp-test-3wqc9.ondigitalocean.app/api/master-data-management?model=productionphase',
                {
                    headers: {
                        'Authorization': `token ${token}`
                    }
                })
                .then((res) => { return res.json(); })
                .then((data) => {
                    setproductionphasearr(data.data);
                })
        }
    }, [fet])

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
        const { productionphasearr } = props;

        const openDialogue = () => {
            setDispDilog(true);
        };
        const handleClose = () => {
            setDispDilog(false);
        };
        //Production flow

        useEffect(() => {
            if (token != null) {
                fetch(`https://erp-test-3wqc9.ondigitalocean.app/api/master-data-management?model=productivity&filter_by=product&filter_value=${row.pk}`,
                    {
                        headers: {
                            'Authorization': `token ${token}`
                        }
                    })
                    .then((res) => { return res.json(); })
                    .then((data) => {
                        setpfdatas(data.data);
                    })
            }
        }, [fet])

        const postPF = axios.create({
            baseURL: "https://erp-test-3wqc9.ondigitalocean.app/api/master-data-management?model=productivity"
        });

        const postproductivity = (ppk, pnme, phs, qpd, sq) => {
            postPF.post('', {
                product: ppk,
                part_name: pnme,
                phase: phs,
                quantity_perday: qpd,
                scrap_quantity: sq
            },
                {
                    headers: {
                        'Authorization': `token ${token}`
                    }
                })
                .then((res) => {
                    if (res.data.status === 'success') {
                        setDispDilog(false);
                        setdispalr(true);
                        setalrstatus(true);
                        setalrmes("New PF Data Added");
                        setfet(!fet);
                        playsuccess();
                        const pfpost = axios.create({
                            baseURL: "https://erp-test-3wqc9.ondigitalocean.app/api/production-flow"
                        });
                        const pf = () => {
                            pfpost.post('', {
                                product_code: ppk,
                                part_name: pnme,
                            },
                                {
                                    headers: {
                                        'Authorization': `token ${token}`
                                    }
                                })
                                .then((pres) => {
                                    // if (pres.data.status === 'success'){
                                    //     alert('post Success');
                                    // }
                                    // else if (pres.data.status === 'failure') {
                                    //     alert('pf error...');
                                    // }
                                    // else {
                                    //     alert('something..')
                                    // }
                                })
                                .catch((err) => {
                                    console.log(err);
                                })
                        }
                        pf(ppk, pnme)
                    }
                    if (res.data.status === 'failure') {
                        setDispDilog(false);
                        setdispalr(true);
                        setalrstatus(false);
                        setalrmes(":( Failure Please Try Again..")
                        playfailure();
                    }

                }).catch((err) => {
                    console.log(err);
                })
        };
        const doPost = (e) => {
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
                                                            {/* <TableCell align='center' sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white' }}>Action</TableCell> */}
                                                        </TableRow>
                                                    </TableHead>

                                                    <TableBody>
                                                        {pfdatas.map((PF) => (
                                                            <TableRow>
                                                                <TableCell align='center' component="th" scope="row">{PF.part_name !== null ? PF.part_name : "Null"}</TableCell>
                                                                <TableCell align='center'>{PF.phase_get !== null ? PF.phase_get : "Null"}</TableCell>
                                                                <TableCell align='center'>{PF.quantity_perday !== null ? PF.quantity_perday : "Null"}</TableCell>
                                                                <TableCell align='center'>{PF.scrap_quantity !== null ? PF.scrap_quantity : "Null"}</TableCell>
                                                                {/* <TableCell align='center'>NOT Allowed!</TableCell> */}
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



    return (
        <>
            <audio id="suc">
                <source src="https://drive.google.com/uc?export=download&id=1V_Caw86copGxXg6c9cn2xg2mxQOvEc83" type="audio/mp3" />
            </audio>
            <audio id="fail">
                <source src="https://drive.google.com/uc?export=download&id=1j41aa4YxNua9mihX-qb9p5X_hm2ZPDpJ" type="audio/mp3" />
            </audio>
            {dispalr == true ? <Alr /> : null}
            <div className="row">
                <div className="col-lg-12">
                    <Header />
                </div>
                <div className="col-lg-2">
                    <Sidenav currentmodule={'Admin'} currentbutton={'Master Data Management'} currentpage={'Production Flow'} />
                </div>
                <div className="col-lg-10">
                    <div className="comhed">
                        <h5>Production Flow</h5>
                        <h6>Admin / Master Data Management / Production Flow</h6>
                    </div>
                    <div className="tablepadding">
                        {token == null || token == '' ?
                            <h2>Please Login..&emsp; <Link to={'/'}>Login Page</Link></h2>
                            :
                            <>
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
                            </>}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Productionflow;