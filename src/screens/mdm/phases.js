import React, { useState } from "react";
import Header from "../../comp/header/header";
import Sidenav from "../../comp/sidenav/sidenav";
import { TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper,IconButton } from "@mui/material";
import { maxWidth } from "@mui/system";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const createPhaseData = (sno, phases, action) => {
    return { sno, phases, action }
}


let Butns = () => {
    return (
        <>
            <IconButton aria-label="expand row" size="small" sx={{ color: 'rgba(255, 0, 0, 0.755)', backgroundColor: '#f2f2f2' }}><DeleteIcon /></IconButton>
            <IconButton aria-label="expand row" size="small" sx={{ backgroundColor: '#f2f2f2', marginLeft: '1em' }}><EditIcon /></IconButton>
        </>
    );
}

const Phasesrows = [
    createPhaseData(1, 'Clean', <Butns />),
    createPhaseData(1, 'Clean', <Butns />),
    createPhaseData(1, 'Clean', <Butns />),
    createPhaseData(6, 'Clean', <Butns />),
    createPhaseData(1, 'Clean', <Butns />),
]


let PhasesRowsComp = () => {

    return (
        <>
            <div>
                <TableContainer component={Paper} sx={{maxHeight:650}}>
                    <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell variant="head" align="left" Width={120} sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white', fontWeight: 'bold' }}>S.No</TableCell>
                                <TableCell variant="head" align="left" width={maxWidth} sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white', fontWeight: 'bold' }}>Phases</TableCell>
                                <TableCell variant="head" align="left" width={200} sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white', fontWeight: 'bold' }}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Phasesrows.map((phrow) => (
                                <TableRow hover='true' >
                                    <TableCell >{phrow.sno}</TableCell>
                                    <TableCell>{phrow.phases}</TableCell>
                                    <TableCell align="left">{phrow.action}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    );
}







function Phases() {
    const [dispPhases, setDispPhases] = React.useState(<PhasesRowsComp />);
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
                            <button className="comadbtn" id='phasadbtn'
                                onClick={() => {
                                    setDispPhases(<AddPhases />)
                                    document.getElementById('phasadbtn').style.display = 'none';
                                }}
                            >Add</button>
                            <h5>Phases</h5>
                            <h6>Master Data Management / Phases</h6>
                        </div>

                        <div className="tablepadding">
                            {dispPhases}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

    function AddPhases() {
        return (
            <>
                <div className="micard">
                    <h5 className="micardhdr">Add Phases</h5>
                    <div className="micardbdy row">
                        <div className="col-lg-4">
                            <label className="micardlble" >Phases</label><br />
                            <input className="micardinpt" onChange={(e) => { }} required />
                        </div><div className="col-lg-4"></div><div className="col-lg-4"></div>
                    </div>
                </div><br />
                <button className="comadbtn">Add</button>
                <button className="cancelbtn" onClick={() => {setDispPhases(<PhasesRowsComp />)
                    document.getElementById('phasadbtn').style.display = 'block';
            }} >Back</button>
            </>
        );
    }
}









export default Phases;