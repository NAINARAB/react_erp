import React, { useState } from "react";
import Header from "../../comp/header/header";
import Sidenav from "../../comp/sidenav/sidenav";
import { IconButton, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import '../common.css';
import { maxWidth } from "@mui/system";


function createCountryData(sno, country, action) {
    return { sno, country, action }
}

function Butns() {
    return (
        <>
            <IconButton aria-label="expand row" size="small" ><EditIcon /></IconButton>
            <IconButton aria-label="expand row" size="small" sx={{ color: 'rgba(255, 0, 0, 0.755)', marginRight: '1em' }}><DeleteIcon /></IconButton>
        </>
    );
}

let Countrycomp = () => {
    return (
        <>
            <TableContainer component={Paper} sx={{ maxHeight:650}}>
                <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell variant="head" align="left" Width={120} sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white', fontWeight: 'bold' }}>S.No</TableCell>
                            <TableCell variant="head" align="left" width={maxWidth} sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white', fontWeight: 'bold' }}>Country</TableCell>
                            <TableCell variant="head" align="left" width={200} sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white', fontWeight: 'bold' }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Countryrows.map((cntry) => (
                            <TableRow hover='true'>
                                <TableCell >{cntry.sno}</TableCell>
                                <TableCell>{cntry.country}</TableCell>
                                <TableCell align="left">{cntry.action}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}


const Countryrows = [
    createCountryData(1, 'India', <Butns />),
    createCountryData(1, 'India', <Butns />),
    createCountryData(1, 'India', <Butns />),
    createCountryData(6, 'India', <Butns />),
    createCountryData(1, 'India', <Butns />),
    createCountryData(1, 'India', <Butns />),
]


function Country() {

    function AddCountry() {
        return (
            <>
                <div className="micard">
                    <h5 className="micardhdr">Add Country</h5>
                    <div className="micardbdy row">
                        <div className="col-lg-4">
                            <label className="micardlble" >Country</label><br />
                            <input className="micardinpt" onChange={(e) => { }} required />
                        </div><div className="col-lg-4"></div><div className="col-lg-4"></div>
                    </div>
                </div><br />
                <button className="comadbtn">Add</button>
                <button className="cancelbtn" onClick={() => {
                    setdispcountry(<Countrycomp />)
                    document.getElementById('countryadbtn').style.display = 'block';
                }} >Back</button>
            </>
        );
    }

    const [dispcountry, setdispcountry] = useState(<Countrycomp />)
    return (
        <>
            <div className="row" >
                <div className="col-lg-12">
                    <Header />
                </div>
                <div className="col-lg-2">
                    <Sidenav />
                </div>
                <div className="col-lg-10">
                    <div className="comhed">
                        <button className="comadbtn" id="countryadbtn" onClick={() => {
                            setdispcountry(<AddCountry />)
                            document.getElementById("countryadbtn").style.display = 'none';
                        }}>Add</button>
                        <h5>Country</h5>
                        <h6>Master Data Management / Country </h6>
                    </div>
                    <div className="tablepadding">
                        {dispcountry}
                    </div>
                </div>
            </div>
        </>
    );

}

export default Country;