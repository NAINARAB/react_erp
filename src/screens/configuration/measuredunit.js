import React, { useState, useEffect, useCallback } from "react";
import Header from "../../comp/header/header";
import Sidenav from "../../comp/sidenav/sidenav";
import {
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Slide,
    TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper, IconButton
} from "@mui/material";
import { maxWidth } from "@mui/system";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Loader from "../../comp/Load/loading";
import SearchIcon from '@mui/icons-material/Search';
import axios from "axios";


const Measuredunit = () => {
    const [searchdata, setsearchdata] = useState('');
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
                            <button className="comadbtn">Add</button>
                            <h5>Measuredunit</h5>
                            <h6>Admin / Configuration / Measuredunit</h6>
                        </div>

                        <div className="tablepadding">
                            <div className="search" style={{ marginBottom: 'unset' }}>
                                <input type={'search'} className='micardinpt'
                                    placeholder="Search Here...."
                                    onChange={(e) => {
                                        setsearchdata((e.target.value).toLowerCase());
                                    }} style={{ paddingLeft: '3em' }} />
                                <div className="sIcon">
                                    <SearchIcon sx={{ fontSize: '2em' }} />
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}



export default Measuredunit;