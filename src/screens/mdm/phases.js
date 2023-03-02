import React, { useState } from "react";
import Header from "../../comp/header/header";
import Sidenav from "../../comp/sidenav/sidenav";
import { TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper } from "@mui/material";
import { maxWidth } from "@mui/system";


const createPhaseData = (sno, phases, action) => {
    return { sno, phases, action }
}


let Butns = () => {
    return (
        <>
            <button className="icbtn"><i className="bi bi-pencil-square"></i></button>
            <button className="icbtn icbtnred"><i className="bi bi-trash-fill"></i></button>
        </>
    );
}

const Phasesrows = [
    createPhaseData(1,'Clean',<Butns />),
    createPhaseData(1,'Clean',<Butns />),
    createPhaseData(1,'Clean',<Butns />),
    createPhaseData(6,'Clean',<Butns />),
    createPhaseData(1,'Clean',<Butns />),
    createPhaseData(1,'Clean',<Butns />),
]


let PhasesRowsComp = (props) => {

    const phasesrow = props;
    return (
        <>
            <div>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell variant="head" align="left" Width={ 120} sx={{backgroundColor: 'rgb(15, 11, 42)', color: 'white',fontWeight:'bold' }}>S.No</TableCell>
                                <TableCell variant="head" align="left" width={maxWidth} sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white',fontWeight:'bold' }}>Phases</TableCell>
                                <TableCell variant="head" align="left" width={200} sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white',fontWeight:'bold' }}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Phasesrows.map((phrow) => (
                                <TableRow>
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
                            <button className="comadbtn" id='adbtn'>Add</button>
                            <h5>Parties</h5>
                            <h6>Master Data Management / Parties</h6>
                        </div>

                        <div className="tablepadding">
                            {<PhasesRowsComp />}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Phases;