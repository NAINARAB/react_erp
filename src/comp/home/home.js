import React from "react";
import './home.css';
import Header from "../header/header";
import Sidenav from "../sidenav/sidenav";
import Product from "../../screens/mdm/product";

import Rawmaterialsaccessories from "../../screens/mdm/raw_material_accessories";








function Home() {
    return (
        <div>
            <div style={{ backgroundColor: '#f9f9f9', height: '100vh' }}>
                <Header />
                <div className="row">
                    <div className="col-lg-2">
                        <Sidenav />
                    </div>
                    <div className="col-lg-10">
                        <Product />
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Home;