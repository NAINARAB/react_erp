import React, { useState } from "react";
import Header from "../../comp/header/header";
import Sidenav from "../../comp/sidenav/sidenav";
import { TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper } from "@mui/material";
import '../common.css';





function Productionflow() {


    
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
                        <button className="comadbtn" id='adbtn'>Add</button>
                        <h5>Production Flow</h5>
                        <h6>Master Data Management / Production Flow</h6>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Productionflow;