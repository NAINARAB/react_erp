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
import { Dialog, DialogContent, DialogTitle, Slide, DialogActions, DialogContentText } from '@mui/material/';
import Loader from '../../comp/Load/loading';
import axios from 'axios';

const token = sessionStorage.getItem("token");

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
    const [Dopen, setDopen] = useState(false);

    {/* Post variables */ }
    const [propk, setpropk] = useState();
    const [prt, setprt] = useState();
    const [sfmcode, setsfmcode] = useState('');
    const [sfmqnty, setsfmqnty] = useState();
    const [sfmname, setsfmname] = useState('');
    const [sfmmu, setsfmmu] = useState();
    const [sfmmuget, setsfmmuget] = useState('')
    const [rmtype, setrmtype] = useState('');
    const [pphase, setphase] = useState();
    const [deletepk, setdeletepk] = useState();

    {/* Update variables */ }

    const [Uopen, setUopen] = useState(false);

    const [upropk, setupropk] = useState();
    const [uproget, setuproget] = useState('');
    const [uprtnme, setuprtnme] = useState('');
    const [urmcod, seturmcod] = useState('');
    const [urmqty, seturmqty] = useState();
    const [urmnme, seturmnme] = useState('');
    const [urmtype, seturmtype] = useState('');
    const [uphse, setuphse] = useState();
    const [uphseget, setuphseget] = useState('');


    const UhandleClose = () => { //row.pk 
        setUopen(false);
    };

    const UhandleOpen = () => { //row.pk 
        setUopen(true);
    };

    const openDialogue = () => {
        setDispDilog(true);
    };

    const handleClose = () => { //row.pk 
        setDispDilog(false);
    };

    const DopenDialogue = () => {
        setDopen(true);
    };

    const DhandleClose = () => { //row.pk 
        setDopen(false);
    };

    useEffect(() => {//&filter_by=&{product_code}&filter_value=   &pk=    &pk=${row.pk}

        fetch(`https://erp-test-3wqc9.ondigitalocean.app/api/get?model=billofmaterial&filter_by=product_code&filter_value=${row.pk}`,
        {
            headers: {
                'Authorization': `token ${token}`
            }
        })
            .then((res) => { return res.json(); })
            .then((data) => {
                setbomdata(data.data);
            })
    }, [])


    function get_rm(probs) {
        let current_element = null
        let rm_type = null
        setsfmname(probs.text);
        setsfmcode(probs.id);
        prodat.map(element => {
            if (element['product_code'] == probs.id && element['product_name'] == probs.text) {
                rm_type = 'semi_finished_goods'
                return
            }
        })
        if (rm_type == null) {
            rawmatdat.map(element => {
                if (element['rm_code'] == probs.id && element['rm_name'] == probs.text) {
                    rm_type = 'rawmaterial'
                    current_element = element
                    setsfmmu(element['measured_unit'])
                    setsfmmuget(element['measured_unit_get'])
                    return
                }
            })
        }
        setrmtype(rm_type)
    }


    {/* Posting DATA */ }

    const postbominpt = axios.create({
        baseURL: "https://erp-test-3wqc9.ondigitalocean.app/api/get?model=billofmaterial"
    });

    const postbom = (prc, pnme, rmc, rmq, rmn, rmtyp, prphs) => {
        postbominpt.post('', {
            product_code: prc,
            part_name: pnme,
            rm_code: rmc,
            rm_quantity: rmq,
            rm_name: rmn,
            rm_type: rmtyp,
            production_phase: prphs
        },
        {
            headers: {
                'Authorization': `token ${token}`
            }
        })
            .then((res) => {
                console.log("after then", res)
                if (res.data.status === 'success') {
                    window.location.reload();
                    console.log(res)
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
        postbom(propk, prt, sfmcode, sfmqnty, sfmname, rmtype, pphase);
    }

    function doDelete() {
        deleteRow(deletepk);
    }

    const deleteRow = (pkobj) => {
        console.log(pkobj)
        let currentpk = pkobj;
        const deleterowurl = axios.create({ //phase
            baseURL: `https://erp-test-3wqc9.ondigitalocean.app/api/get?model=billofmaterial&pk=${currentpk}`
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
                                {Object.values(bomdata).length != 0 ?
                                    <>
                                        <TableContainer component={Paper}>
                                            <Table stickyHeader size="small" aria-label="purchases">
                                                <TableHead>
                                                    <TableRow >
                                                        <TableCell align='center' sx={{ padding: '0.8em', backgroundColor: 'rgb(15, 11, 42)', color: 'white' }}>Part Name</TableCell>
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
                                                        <TableRow hover={true}>
                                                            <TableCell align='center'>{bomobj.part_name == null ? "Null" : bomobj.part_name}</TableCell>
                                                            <TableCell align='center'>{bomobj.rm_code}</TableCell>
                                                            <TableCell align='center'>{bomobj.rm_name}</TableCell>
                                                            <TableCell align='center'>{bomobj.measured_unit_get}</TableCell>
                                                            <TableCell align='center'>{bomobj.rm_quantity}</TableCell>
                                                            <TableCell align='center'>{bomobj.production_phase_get}</TableCell>
                                                            <TableCell align='center'>
                                                                {/* <IconButton aria-label="expand row" size="small"
                                                                    onClick={() => {
                                                                        setupropk(row.pk); setuproget(row.product_name); setuprtnme(bomobj.part_name);
                                                                        seturmcod(bomobj.rm_code); seturmqty(bomobj.rm_quantity); //uproget
                                                                        seturmnme(bomobj.rm_name);
                                                                        seturmtype(bomobj.rm_type);
                                                                        setuphse(bomobj.production_phase);
                                                                        setuphseget(bomobj.production_phase_get);
                                                                        UhandleOpen();
                                                                    }}
                                                                ><EditIcon /></IconButton> */}

                                                                <IconButton aria-label="expand row" size="small"
                                                                    onClick={() => { setdeletepk(bomobj.pk); DopenDialogue(); }}
                                                                    sx={{ color: 'rgba(255, 0, 0, 0.755)' }}>
                                                                    <DeleteIcon /></IconButton>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}

                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </>
                                    : <h3>No Data</h3>}
                                <IconButton aria-label="expand row" onClick={() => {
                                    openDialogue(); setpropk(row.pk);
                                }}
                                    size="small"
                                    sx={{ float: 'right', backgroundColor: 'white', margin: '0.5em', color: 'rgb(66, 34, 225)' }}>
                                    {<AddIcon />}</IconButton>

                                <div>
                                    <Dialog
                                        open={Dopen}
                                        onClose={DhandleClose}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description"
                                    >
                                        <DialogTitle id="alert-dialog-title">
                                            {"Do You Want To Delete ? "}
                                        </DialogTitle>
                                        <DialogContent>
                                            <DialogContentText id="alert-dialog-description">
                                            </DialogContentText>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={DhandleClose}>Cancel</Button>
                                            <Button onClick={() => { doDelete() }} autoFocus sx={{ color: 'red' }}>
                                                Delete
                                            </Button>
                                        </DialogActions>
                                    </Dialog>
                                </div>
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
                    onClose={UhandleClose}
                    PaperComponent={PaperComponent}
                    aria-labelledby="draggable-dialog-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle style={{ cursor: 'move', padding: '0px' }} id="draggable-dialog-title">
                        <div className="comhed">
                            <h5>Add Bill Of Materials</h5>
                        </div>
                    </DialogTitle>

                    <DialogContent>
                        <form className='setsp'>
                            <div className='row'>
                                <label className="micardlble">Part Name</label><br />
                                <select className="micardinpt" style={{ padding: '0.5em' }} onChange={(e) => { setprt(e.target.value) }} required >
                                    <option value={''} selected={true} disabled={true}>Select Part</option>
                                    {row.parts.map(item => (
                                        <option value={item}>{item}</option>
                                    ))}
                                </select>

                                <label className="micardlble">SFG/RM Code</label><br />
                                <select className="micardinpt" style={{ padding: '0.5em' }} onInput={(e) => {
                                    get_rm({
                                        id: e.target.value,
                                        text: e.nativeEvent.target[e.target.selectedIndex].text
                                    })
                                }} required >
                                    <option value={''} selected={true} disabled={true}>Select Product</option>
                                    <optgroup label="Semi-Finished Products">
                                        {prodat.map(probj => (
                                            probj.product_type == 'semi-finished' ?
                                                <option value={probj.product_code}>{probj.product_name}</option> : null
                                        ))}
                                    </optgroup>
                                    <optgroup label="Raw Materials">
                                        {rawmatdat.map(rmob => (
                                            <option value={rmob.rm_code}>{rmob.rm_name}</option>
                                        ))}
                                    </optgroup>
                                </select>

                                <div className='col-lg-6' >
                                    <label className="micardlble">SFG/RM Name</label><br />
                                    <input className="micardinpt" disabled={true} value={sfmname} required />
                                </div>

                                <div className='col-lg-6'>
                                    <label className="micardlble">Measurement Unit</label><br />
                                    <input className="micardinpt" disabled={true} value={sfmmuget} />
                                </div>

                                <label className="micardlble">Quantity Required</label><br />
                                <input type='number' min={0} style={{ padding: '0.5em' }} className="micardinpt" onChange={(e) => { setsfmqnty(e.target.value) }} required placeholder='Min value 0' />

                                <label className="micardlble">Production Phase</label><br />
                                <select className="micardinpt" style={{ padding: '0.5em' }} onChange={(e) => { setphase(e.target.value); }} required >
                                    <option value={''} defaultValue={true} selected={true} disabled={true}>Select Phase</option>
                                    {pfdat.map(pfob => (
                                        <option value={pfob.pk}>{pfob.phase_name}</option>
                                    ))}
                                </select>
                            </div>
                        </form>
                    </DialogContent>

                    <DialogActions>
                        <div className='tablepadding'>
                            <button className='comadbtn' onClick={doPost} style={{ marginBottom: 'unset' }}>Add</button>
                            <button className='cancelbtn' onClick={handleClose}>Cancel</button>

                        </div>
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
                        <h5>Update Bill of Material</h5>
                    </div>
                    <DialogTitle id="alert-dialog-title">
                        {"Row Details :  "}
                    </DialogTitle>
                    <DialogContent>

                        <div className='row'>
                            <label className="micardlble" >Part Name</label><br />
                            <select className="micardinpt" style={{ padding: '0.5em' }} value={uprtnme} onChange={(e) => { setprt(e.target.value) }} required >
                                <option value={''} selected={true} disabled={true}>Select Part</option>
                                {row.parts.map(item => (
                                    <option value={item}>{item}</option>
                                ))}
                            </select>

                            <label className="micardlble" >SFG/RM Code</label><br />
                            <select className="micardinpt" value={uproget} style={{ padding: '0.5em' }} onChange={(e) => {
                                get_rm({
                                    id: e.target.value,
                                    text: e.nativeEvent.target[e.target.selectedIndex].text
                                })
                            }} required >
                                <option value={''} selected={true} disabled={true}>Select Product</option>
                                <optgroup label="Semi-Finished Products">
                                    {prodat.map(probj => (
                                        probj.product_type == 'semi-finished' ?
                                            <option value={probj.product_code}>{probj.product_name}</option> : null
                                    ))}
                                </optgroup>
                                <optgroup label="Raw Materials">
                                    {rawmatdat.map(rmob => (
                                        <option value={rmob.rm_code}>{rmob.rm_name}</option>
                                    ))}
                                </optgroup>
                            </select>

                            <label className="micardlble">SFG/RM Name</label><br />
                            <input className="micardinpt" disabled={true} value={uproget} required />
                        </div>

                        <div style={{ marginTop: '1em' }}>
                            <button className="comadbtn" style={{ marginBottom: 'unset' }}>Update</button>
                            <button className="cancelbtn" onClick={UhandleClose} >Discord</button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </>
    );
}



function Billsofmaterials() {

    const [productdata, setproductdata] = useState([]);
    const [rawmatdat, setrawmatdat] = useState([]);
    const [pfdat, setpfdat] = useState([]);
    let count = 0;
    useEffect(() => {

        fetch('https://erp-test-3wqc9.ondigitalocean.app/api/get?model=product',
        {
            headers: {
                'Authorization': `token ${token}`
            }
        })
            .then((res) => { return res.json(); })
            .then((data) => {
                setproductdata(data.data);
            })
        fetch('https://erp-test-3wqc9.ondigitalocean.app/api/get?model=rawmaterial',
        {
            headers: {
                'Authorization': `token ${token}`
            }
        })
            .then((res) => { return res.json(); })
            .then((data) => {
                setrawmatdat(data.data);
            })
        fetch('https://erp-test-3wqc9.ondigitalocean.app/api/get?model=productionphase',
        {
            headers: {
                'Authorization': `token ${token}`
            }
        })
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