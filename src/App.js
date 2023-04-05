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
import Branches from './screens/manage_user/branches';
import Department from './screens/manage_user/department';
import Devision from './screens/manage_user/division';
import Users from './screens/manage_user/user';
import Userrole from './screens/manage_user/user_role';
import State from './screens/configuration/state';
import Currency from './screens/configuration/currency';
import Measuredunit from './screens/configuration/measuredunit';






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
          <Route path="/admin/configuration/phases" element={<Phases />} />
          <Route path="/admin/configuration/partytype" element={<Partytype />} />
          <Route path="/admin/configuration/country" element={<Country />} />
          <Route path='/admin/manageusers/branches' element={<Branches />} />
          <Route path='/admin/manageusers/department' element={<Department />} />
          <Route path='/admin/manageusers/devision' element={<Devision />} />
          <Route path='/admin/manageusers/users' element={<Users />} />
          <Route path='/admin/manageusers/userrole' element={<Userrole />} />
          <Route path='/admin/configuration/state' element={<State />} />
          <Route path='/admin/configuration/currency' element={<Currency />} />
          <Route path='/admin/configuration/measuredunit' element={<Measuredunit />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
