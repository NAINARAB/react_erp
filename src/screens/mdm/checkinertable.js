import * as React from 'react';
import { IconButton, Box, Collapse, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';




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
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
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
                <TableCell style={{ paddingBottom: 0, paddingTop: 0, backgroundColor:'#f2f2f2'}} colSpan={5}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: '7em 5em'}}>
                            <TableContainer component={Paper}>
                                <Table size="small" aria-label="purchases">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white' }}>Part Name</TableCell>
                                            <TableCell sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white' }}>SFG/RM Code</TableCell>
                                            <TableCell sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white' }}>SFG/RM Name</TableCell>
                                            <TableCell sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white' }}>Measurement Unit</TableCell>
                                            <TableCell sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white' }}>Quantity Required</TableCell>
                                            <TableCell sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white' }}>Production Phase</TableCell>
                                            <TableCell sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white' }}>Action</TableCell>
                                        </TableRow>
                                    </TableHead>


                                    <TableBody>
                                        {row.history.map((historyRow) => (
                                            <TableRow>
                                                <TableCell component="th" scope="row">{historyRow.date}</TableCell>
                                                <TableCell>{historyRow.customerId}</TableCell>
                                                <TableCell>{historyRow.amount}</TableCell>
                                                <TableCell>{historyRow.amount}</TableCell>
                                                <TableCell>{historyRow.amount}</TableCell>
                                                <TableCell>{historyRow.amount}</TableCell>
                                                <TableCell><Butns /></TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}


let Butns = () => {
    return (
        <>
            <button className="icbtn"><i className="bi bi-pencil-square"></i></button>
            <button className="icbtn icbtnred"><i className="bi bi-trash-fill"></i></button>
        </>
    );
}

const rows = [
    createData(1, 112233, 'Cooker', 'Semi-Finished', <Butns />),
    createData(2, 112233, 'Cooker', 'Semi-Finished', <Butns />),
    createData(3, 112233, 'Cooker', 'Semi-Finished', <Butns />),
    createData(4, 112233, 'Cooker', 'Semi-Finished', <Butns />),
    createData(5, 112233, 'Cooker', 'Semi-Finished', <Butns />),
];

function Colbtble() {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white' }}>S.No</TableCell>
                        <TableCell sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white' }}>Product Code</TableCell>
                        <TableCell sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white' }}>Product Name</TableCell>
                        <TableCell sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white' }}>Product Type</TableCell>
                        <TableCell sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white' }} align='center'>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <Row key={row.sno} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default Colbtble;
