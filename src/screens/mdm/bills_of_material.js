import * as React from 'react';
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



function Billsofmaterials() {



    function createData(sno, product_code, product_name, product_type, action) {
        return {
            sno, product_code, product_name, product_type, action,
            history: [
                {
                    date: '2020-01-05', customerId: '11091700', amount: 3,
                },
                {
                    date: '2020-01-02',
                    customerId: 'Anonymous',
                    amount: 1,
                },
            ],
        };
    }



    function Row(props) {
        const { row } = props;
        const [open, setOpen] = React.useState(false);

        return (
            <React.Fragment>
                <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} hover='true' onClick={() => setOpen(!open)}>
                    <TableCell component="th" scope="row">
                        {row.sno}
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
                                            {row.history.map((historyRow) => (
                                                <TableRow>
                                                    <TableCell align='center' component="th" scope="row">{historyRow.date}</TableCell>
                                                    <TableCell align='center'>{historyRow.customerId}</TableCell>
                                                    <TableCell align='center'>{historyRow.amount}</TableCell>
                                                    <TableCell align='center'>{historyRow.amount}</TableCell>
                                                    <TableCell align='center'>{historyRow.amount}</TableCell>
                                                    <TableCell align='center'>{historyRow.amount}</TableCell>
                                                    <TableCell align='center'><Butns /></TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer><IconButton aria-label="expand row" onClick={openDialogue} size="small" sx={{ float: 'right', backgroundColor: 'white', margin: '0.5em', color: 'rgb(66, 34, 225)' }}>{<AddIcon />}</IconButton>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </React.Fragment>
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

    const rows = [
        createData(1, 112233, 'Cooker', 'Semi-Finished', <Butns />),
        createData(2, 112233, 'Makkar', 'Semi-Finished', <Butns />),
        createData(3, 112233, 'Cooker', 'Semi-Finished', <Butns />),
        createData(4, 112233, 'Cooker', 'Semi-Finished', <Butns />),
        createData(5, 112233, 'Cooker', 'Semi-Finished', <Butns />),
    ];

    let Disptbl = () => {
        return (
            <>
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
                            {rows.map((row) => (
                                <Row key={row.sno} row={row} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </>
        );
    }


    const [dispDilog, setDispDilog] = React.useState(false);


    const openDialogue = () => {
        setDispDilog(true);
    };

    const handleClose = () => {
        setDispDilog(false);
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
                            <h5>Bills of Materials</h5>
                            <h6>Master Data Management / Bills of Materials</h6>
                        </div>
                        <div className='tablepadding'>
                            <Disptbl />


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
                                        <input className="micardinpt" onChange={(e) => { }} required />
                                        <label className="micardlble">SFG/RM Code</label><br />
                                        <input className="micardinpt" onChange={(e) => { }} required />
                                        <label className="micardlble">SFG/RM Name</label><br />
                                        <input className="micardinpt" onChange={(e) => { }} required />
                                        <label className="micardlble">Measurement Unit</label><br />
                                        <input type='number' className="micardinpt" onChange={(e) => { }} required />
                                        <label className="micardlble">Quantity Required</label><br />
                                        <input type='number' className="micardinpt" onChange={(e) => { }} required />
                                        <label className="micardlble">Production Phase</label><br />
                                        <input className="micardinpt" onChange={(e) => { }} required />
                                    </DialogContent>

                                    <DialogActions>
                                        <Button onClick={handleClose}>Cancel</Button>
                                        <Button onClick={handleClose}>Add</Button>
                                    </DialogActions>

                                </Dialog>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Billsofmaterials;