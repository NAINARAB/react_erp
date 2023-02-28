import React, { useState } from "react";
import Header from "../../comp/header/header";
import Sidenav from "../../comp/sidenav/sidenav";
import { TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper } from "@mui/material";
import '../common.css';
import Colbtble from "./checkinertable";

function Billsofmaterials() {

    function opnnav(){
        var presnav = document.getElementById('#menu_item4');
        presnav.click();
    }

    return (

        <>
            <div className="row" onLoad={opnnav}>
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

                        <div className="tablepadding">
                            <Colbtble />
                        </div>
                    </div>
                </div>
            </div>
        </>




    );
}

export default Billsofmaterials;