import React, { useState, useEffect, useCallback } from "react";
import Header from "../../comp/header/header";
import Sidenav from "../../comp/sidenav/sidenav";
import TestSide from "./testsidenav";


const Measuredunit = () => {
    

    return (
        <>
            <div className="row">
                <div className="col-lg-12">
                    <Header />
                </div>
                <div className="col-lg-2">
                    <Sidenav currentmodule={'Admin'} currentbutton={'Master Data Management'} currentpage={'Bill of Material'} />
                </div>
                
            </div>
        </>
    );
}



export default Measuredunit;