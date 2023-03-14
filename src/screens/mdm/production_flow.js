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


// https://erp-dwe8a.ondigitalocean.app/api/get?model=productionflow


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
    const [open, setOpen] = useState(false);
    const [dispDilog, setDispDilog] = useState(false);
    const [pfdatas, setpfdatas] = useState([]);
    const [partname, setpartname] = useState('');
    const [productionphase, setproductionphase] = useState('');
    const [productivityperday, setproductivityperday] = useState();
    const [scrap, setscrap] = useState('');
    const [productionphasearr, setproductionphasearr] = useState([]);
    const [parts, setparts] = useState([])




    const openDialogue = () => {
        setDispDilog(true);
    };
    const handleClose = () => {
        setDispDilog(false);
    };
    //Production flow

    useEffect(() => { //

        fetch(`https://erp-new-production.up.railway.app/api/get?model=productivity&filter_by=&{product}&filter_value&{pk}`)
            .then((res) => { return res.json(); })
            .then((data) => {
                setpfdatas(data.data);
            })
    }, [])


    //production-phase

    useEffect(() => {
        fetch('https://erp-new-production.up.railway.app/api/get?model=productionphase')
            .then((res) => { return res.json(); })
            .then((data) => {
                setproductionphasearr(data.data);console.log(data.data)
            })
    }, [])

    //parts product
    useEffect(() => {
        fetch('https://erp-dwe8a.ondigitalocean.app/api/get?model=product')
            .then((res) => { return res.json(); })
            .then((data) => {
                setparts(data.data)
            })
    }, [])

    

    return (
        <>
            <React.Fragment>
                <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} hover='true' onClick={() => setOpen(!open)}>
                    <TableCell component="th" scope="row">
                        {++count}
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
                                {/* <div>
                                        <h5>{row.product_name} ( Product-Code : {row.product_code})</h5>
                                    </div> */}
                                {row.pk == pfdatas.map(chek => (chek.product)) ?
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
                                                            <TableCell align='center' component="th" scope="row">{PF.part_name}</TableCell>
                                                            <TableCell align='center'>{PF.phase_get}</TableCell>
                                                            <TableCell align='center'>{PF.quantity_perday}</TableCell>
                                                            <TableCell align='center'>{PF.scrap_quantity}</TableCell>
                                                            <TableCell align='center'><Butns /></TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </> : <h3>No Data :(</h3>}
                                <IconButton aria-label="expand row" onClick={openDialogue} size="small" sx={{ float: 'right', backgroundColor: 'white', margin: '0.5em', color: '#e3242b' }}>{<AddIcon />}</IconButton>
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
                    <DialogTitle>{"Add Bills of Materials"}</DialogTitle>

                    <DialogContent>
                        <label className="micardlble">Part Name</label><br />
                        <select className="micardinpt" onChange={(e) => { setpartname(e.target.value) }} required>
                            {parts.map(prtobj => (
                                <option value="">{'lid'}</option>
                            ))}
                        </select>
                        <label className="micardlble">Production Phase</label><br />
                        <select className="micardinpt" onChange={(e) => { setproductionphase(e.target.value) }} required>
                            {productionphasearr.map(ppa => (
                                <option value={ppa.pk}>{ppa.phase_name}</option>
                            ))}
                        </select>
                        <label className="micardlble">Productivity Per Day</label><br />
                        <input className="micardinpt" type='number' onChange={(e) => { setproductivityperday(e.target.value) }} required />
                        <label className="micardlble">Scrap</label><br />
                        <input className="micardinpt" onChange={(e) => { setscrap(e.target.value) }} required />
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleClose}>Add</Button>
                    </DialogActions>

                </Dialog>
            </div>
        </>
    );
}

function Productionflow() {

    const [productdata, setproductdata] = useState([]);

    useEffect(() => {
        fetch('https://erp-dwe8a.ondigitalocean.app/api/get?model=product')
            .then((res) => { return res.json(); })
            .then((data) => {
                setproductdata(data.data)
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
                                                <Row row={row} />
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