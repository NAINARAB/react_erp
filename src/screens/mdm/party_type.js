import React, { useState, useEffect } from "react";
import Header from "../../comp/header/header";
import Sidenav from "../../comp/sidenav/sidenav";
import { TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper, IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { maxWidth } from "@mui/system";
import Loader from "../../comp/Load/loading";


function Butns() {
    return (
        <>
            <IconButton aria-label="expand row" size="small"><EditIcon /></IconButton>
            <IconButton aria-label="expand row" size="small" sx={{ color: 'rgba(255, 0, 0, 0.755)', marginRight: '1em' }}><DeleteIcon /></IconButton>
        </>
    );
}

let PartyTypecomp = (props) => {
    const { PartyTypeRows } = props;
    let count = 0;
    return (
        <>
            {PartyTypeRows.length != 0 ?

                <div>
                    <TableContainer component={Paper} sx={{ maxHeight: 640 }}>
                        <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell variant="head" align="left" Width={120} sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white', fontWeight: 'bold' }}>S.No</TableCell>
                                    <TableCell variant="head" align="left" width={maxWidth} sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white', fontWeight: 'bold' }}>Party Type</TableCell>
                                    <TableCell variant="head" align="left" width={200} sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white', fontWeight: 'bold' }}>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {PartyTypeRows.map((ptr) => (
                                    <TableRow hover='true'>
                                        <TableCell >{++count}</TableCell>
                                        <TableCell>{ptr.party_type}</TableCell>
                                        <TableCell align="left"><Butns /></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>  : <Loader />}
        </>
    );
}



function Partytype() {

    const [disppartytypes, setdisppartytypes] = useState(false);
    const [partttypedata, setpartytypedata] = useState([]);

    useEffect(() => {
        fetch('https://erp-dwe8a.ondigitalocean.app/api/get?model=partytype')
            .then((res) => { return res.json(); })
            .then((data) => {
                console.log(data.data);
                setpartytypedata(data.data)
            })
    }, [])


    let AddPartyType = () => {
        return (
            <>
                <div className="micard">
                    <h5 className="micardhdr">Add Product</h5>
                    <div className="micardbdy row">
                        <div className="col-lg-4">
                            <label className="micardlble" >Party Type</label><br />
                            <input className="micardinpt" onChange={(e) => { }} required />
                        </div><div className="col-lg-4"></div><div className="col-lg-4"></div>
                    </div>
                </div><br />
                <button className="comadbtn">Add</button>
                <button className="cancelbtn" onClick={() => {
                    setdisppartytypes(false)
                    document.getElementById('prtytypeadbtn').style.display = 'block';
                }} >Back</button>
            </>
        );
    }

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
                            <button className="comadbtn" id='prtytypeadbtn' onClick={() => {
                                setdisppartytypes(true)
                                document.getElementById('prtytypeadbtn').style.display = 'none';
                            }}>Add</button>
                            <h5>Party Type</h5>
                            <h6>Master Data Management / Party Type</h6>
                        </div>
                        <div className="tablepadding">
                            {disppartytypes === false ? <PartyTypecomp PartyTypeRows={partttypedata} /> : <AddPartyType />}
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}


export default Partytype;