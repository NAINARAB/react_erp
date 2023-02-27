import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Header from './comp/header/header';
import Login from './comp/login/login';
import Sidenav from './comp/sidenav/sidenav';
import Product from './screens/mdm/product';
import Rawmaterialsaccessories from './screens/mdm/raw_material_accessories';
import Billsofmaterials from './screens/mdm/bills_of_material';
import Productionflow from './screens/mdm/production_flow';
import Parties from './screens/mdm/parties';
import Phases from './screens/mdm/phases';
import Partytype from './screens/mdm/party_type';
import Country from './screens/mdm/country';















function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/header" element={<Header />} />
          <Route path="/sidenav" element={<Sidenav />} />
          <Route path="/admin/mdm/product" element={<Product />} />
          <Route path="/admin/mdm/rawmaterialsaccessories" element={<Rawmaterialsaccessories />} />
          <Route path="/admin/mdm/billsofmaterials" element={<Billsofmaterials />} />
          <Route path="/admin/mdm/productionflow" element={<Productionflow />} />
          <Route path="/admin/mdm/parties" element={<Parties />} />
          <Route path="/admin/mdm/phases" element={<Phases />} />
          <Route path="/admin/mdm/partytype" element={<Partytype />} />
          <Route path="/admin/mdm/country" element={<Country />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
