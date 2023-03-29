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
import { get } from 'jquery';

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

function BomComp(props) {
    const { row } = props;
    const { rowcount } = props;
    const { prodat } = props;
    const { rawmatdat } = props;
    const { pfdat } = props;
    const [open, setOpen] = useState(false);
    const [dispDilog, setDispDilog] = useState(false);
    const [bomdata, setbomdata] = useState([]);

    {/* Post variables */ }
    const [prt, setprt] = useState();
    const [sfmtotval, setsfmtotval] = useState('');
    const [sfmcode, setsfmcode] = useState('');
    const [sfmname, setsfmname] = useState('');
    const [sfmmu, setsfmmu] = useState('');
    const [spltpur, setspltpur] = useState([]);
    const openDialogue = () => {
        setDispDilog(true);
    };

    const handleClose = () => { //row.pk 
        setDispDilog(false);
    };

    useEffect(() => {//&filter_by=&{product_code}&filter_value=   &pk=    &pk=${row.pk}

        fetch(`https://erp-test-3wqc9.ondigitalocean.app/api/get?model=billofmaterial&filter_by=product_code&filter_value=${row.pk}`)
            .then((res) => { return res.json(); })
            .then((data) => {
                setbomdata(data.data);
            })
    }, [])


function get_rm(element){
    console.log(element)
    let current_element
    prodat.map(data =>{
        if(data.pk == element){
            current_element = data
        }
    })
    setsfmname(current_element.product_name)
    console.log(current_element)
}


    return (
        <>
            <React.Fragment>
                <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} hover={true} onClick={() => setOpen(!open)}>
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
                                {row.pk == bomdata.map(bomkobj => (bomkobj.product_code)) ?
                                    <>
                                        <TableContainer component={Paper}>
                                            <Table stickyHeader size="small" aria-label="purchases">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell align='center' sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white' }}>Part Name</TableCell>
                                                        <TableCell align='center' sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white' }}>SFG/RM Code</TableCell>
                                                        <TableCell align='center' sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white' }}>SFG/RM Name</TableCell>
                                                        <TableCell align='center' sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white' }}>Measurement Unit</TableCell>
                                                        <TableCell align='center' sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white' }}>Quantity Required</TableCell>
                                                        <TableCell align='center' sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white' }}>Production Phase</TableCell>
                                                        <TableCell align='center' sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white' }}>Action</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {bomdata.map(bomobj => (
                                                        <>
                                                            <TableRow hover={true}>
                                                                <TableCell align='center'>{bomobj.part_name == null ? "Null" : null}</TableCell>
                                                                <TableCell align='center'>{bomobj.rm_code}</TableCell>
                                                                <TableCell align='center'>{bomobj.rm_name}</TableCell>
                                                                <TableCell align='center'>{bomobj.measured_unit_get}</TableCell>
                                                                <TableCell align='center'>{bomobj.rm_quantity}</TableCell>
                                                                <TableCell align='center'>{bomobj.production_phase_get}</TableCell>
                                                                <TableCell align='center'><Butns /></TableCell>
                                                            </TableRow>
                                                        </>
                                                    ))}

                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </> : <h3>No Data</h3>}
                                <IconButton aria-label="expand row" onClick={() => { openDialogue() }} size="small" sx={{ float: 'right', backgroundColor: 'white', margin: '0.5em', color: 'rgb(66, 34, 225)' }}>{<AddIcon />}</IconButton>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </React.Fragment>
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
                    <form className='setsp'>
                        <label className="micardlble">Part Name</label><br />
                        <select className="micardinpt" onChange={(e) => {}} required >
                            <option value={''} selected={true} disabled={true}>Select Part</option>
                            {row.parts.map(item => (
                                <option value={item}>{item}</option>
                            ))}
                        </select>
                        {/* setsfmtotval(e.target.value);setspltpur(sfmtotval.split(' ^ ')); console.log(spltpur[1]+"TEST"); setsfmmu(spltpur[1]);console.log(sfmmu) } 
                          + " ^ " + rmob.rm_name + " ^ " + rmob.measured_unit + " ^ " + rmob.measured_unit_get   */}
                        <label className="micardlble">SFG/RM Code</label><br />
                        <select className="micardinpt" onChange={(e) => {get_rm(e.target.value)}} required >
                            <option value={''} selected={true} disabled={true}>Select Product</option>
                            <optgroup label="Semi-Finished Products">
                                {prodat.map(probj => (
                                    probj.product_type == 'semi-finished' ?
                                        <option value={probj.pk}>{probj.product_name}</option> : null
                                ))}
                            </optgroup>
                            <optgroup label="Raw Materials">
                                {rawmatdat.map(rmob => (
                                    <option value={rmob.pk}>{rmob.rm_name}</option>
                                ))}
                            </optgroup>
                        </select>
                        <label className="micardlble">SFG/RM Name</label><br />
                        <input className="micardinpt" disabled={true} value={sfmname} required />
                        <label className="micardlble">Measurement Unit</label><br />
                        <input className="micardinpt" disabled={true} value={sfmmu} />
                        <label className="micardlble">Quantity Required</label><br />
                        <input type='number' min={0} className="micardinpt" onChange={(e) => { }} required placeholder='Min value 0' />
                        <label className="micardlble">Production Phase</label><br />
                        <select className="micardinpt" onChange={(e) => { }} required >
                            <option value={''} defaultValue={true} selected={true} disabled={true}>Select Phase</option>
                            {pfdat.map(pfob => (
                                <option value={pfob.pk}>{pfob.phase_name}</option>
                            ))}
                        </select>
                    </form>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Add</Button>
                </DialogActions>

            </Dialog>
        </>
    );
}



function Billsofmaterials() {

    const [productdata, setproductdata] = React.useState([]);
    const [rawmatdat, setrawmatdat] = React.useState([]);
    const [pfdat, setpfdat] = useState([]);
    let count = 0;
    useEffect(() => {

        fetch('https://erp-test-3wqc9.ondigitalocean.app/api/get?model=product')
            .then((res) => { return res.json(); })
            .then((data) => {
                setproductdata(data.data);
            })
        fetch('https://erp-test-3wqc9.ondigitalocean.app/api/get?model=rawmaterial')
            .then((res) => { return res.json(); })
            .then((data) => {
                setrawmatdat(data.data);
            })
        fetch('https://erp-test-3wqc9.ondigitalocean.app/api/get?model=productionphase')
            .then((res) => { return res.json(); })
            .then((data) => {
                setpfdat(data.data)
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
                    <div>
                        <div className="comhed">
                            <h5>Bills of Materials</h5>
                            <h6>Master Data Management / Bills of Materials</h6>
                        </div>
                        <div className='tablepadding'>
                            {productdata.length !== 0 ? <>
                                <TableContainer component={Paper} sx={{ maxHeight: 740 }}>
                                    <Table aria-label="collapsible table" stickyHeader>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell width={100} sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white' }}>S.No</TableCell>
                                                <TableCell width={200} sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white' }}>Product Code</TableCell>
                                                <TableCell width={350} sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white' }}>Product Name</TableCell>
                                                <TableCell sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white' }}>Product Type</TableCell>
                                                <TableCell sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white' }} align='center'></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {productdata.map(propobj => (
                                                <BomComp row={propobj} rowcount={
                                                    (productdata.length + 1) - (productdata.length - count++)
                                                } prodat={productdata} rawmatdat={rawmatdat} pfdat={pfdat} />
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </> : <Loader />}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Billsofmaterials;