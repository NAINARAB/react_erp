import React, { useState, useEffect } from "react";
import Header from "../../comp/header/header";
import Sidenav from "../../comp/sidenav/sidenav";
import { TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper, IconButton } from "@mui/material";
import { maxWidth } from "@mui/system";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';



function Butns() {
    return (
        <>
            <IconButton aria-label="expand row" size="small" sx={{ marginLeft: '0.5em' }}><EditIcon /></IconButton>
            <IconButton aria-label="expand row" size="small" sx={{ color: 'rgba(255, 0, 0, 0.755)', marginRight: '1em' }}><DeleteIcon /></IconButton>
        </>
    );
}


let PhasesRowsComp = (props) => {
    let { arr } = props;
    let count = 0;
    return (
        <>
            {arr.length != 0 ?
                <div>
                    <TableContainer component={Paper} sx={{ maxHeight: 650 }}>
                        <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell variant="head" align="left" Width={120} sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white', fontWeight: 'bold' }}>S.No</TableCell>
                                    <TableCell variant="head" align="left" width={maxWidth} sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white', fontWeight: 'bold' }}>Phases</TableCell>
                                    <TableCell variant="head" align="left" width={200} sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white', fontWeight: 'bold' }}>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {arr.map((phrow) => (
                                    <TableRow hover='true' >
                                        <TableCell >{++count}</TableCell>
                                        <TableCell>{phrow.phase_name}</TableCell>
                                        <TableCell align="left"><Butns /></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div> : "Looking For Data Or No Data"}
        </>
    );
}

function Phases() {
    const [phasedata, setphasedata] = useState([])
    useEffect(() => {
        fetch('https://erp-dwe8a.ondigitalocean.app/api/get?model=productionphase')
            .then((res) => { return res.json(); })
            .then((data) => {
                console.log(data.data);
                setphasedata(data.data)
            })
    }, [])
    const [dispPhases, setDispPhases] = useState(false);
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
                                    setDispPhases(true)
                                    document.getElementById('phasadbtn').style.display = 'none';
                                }}
                            >Add</button>
                            <h5>Phases</h5>
                            <h6>Master Data Management / Phases</h6>
                        </div>

                        <div className="tablepadding">
                            {dispPhases === false ? <PhasesRowsComp arr={phasedata} /> : <AddPhases />}
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
                        </div><div className="col-lg-4">{/* <- For Alignment -> */}</div><div className="col-lg-4"></div>
                    </div>
                </div><br />
                <button className="comadbtn">Add</button>
                <button className="cancelbtn" onClick={() => {
                    setDispPhases(false)
                    document.getElementById('phasadbtn').style.display = 'block';
                }} >Back</button>
            </>
        );
    }
}



export default Phases;