import React from "react";
import './home.css';
import Header from "../header/header";
import Sidenav from "../sidenav/sidenav";
import Product from "../../screens/mdm/product";


function Home() {
    return (
        <div>
        <Header />
        <Sidenav />
        <Product />
        </div>
    );
}


export default Home;