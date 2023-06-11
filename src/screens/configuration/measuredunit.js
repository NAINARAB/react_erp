import React, { useState, useEffect } from "react";
import Header from "../../comp/header/header";
import Sidenav from "../../comp/sidenav/sidenav";
import { Link } from "react-router-dom";
import Tbl from "../../comp/table/table";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Alert } from "@mui/material";
import axios from "axios";



const Measuredunit = () => {
    const token = sessionStorage.getItem("token");
    const [fet,setfet] = useState(false);
    const [muntdat, setmutdat] = useState([]);
    const [upk, setupk] = useState();
    const [dpk, setdpk] = useState();
    const [open, setOpen] = useState(false);


    const [dispalr, setdispalr] = useState(false);
    const [alrstatus, setalrstatus] = useState(false);
    const [alrmes, setalrmes] = useState('');
    const success = document.getElementById("suc");
    const failure = document.getElementById("fail");

    const tableheaddata = [
        {
            'headname' : 'SNo',
            'variant' : 'head',
            'align' : 'left',
            'width' : 100
        },
        {
            'headname' : 'Measured Unit Code',
            'align' : 'left',
        },
        {
            'headname' : 'Measured Unit Name',
            'align' : 'left',
        },
        {
            'headname' : 'Action',
            'align' : 'right',
        },
    ]
    const tablebodycolumn = ['measured_unit_code','measured_unit_name'];

    const Alr = () => {
        return (
            <div className="alrt">
                <Alert severity={alrstatus === true ? "success" : "error"}
                    onClose={() => { setdispalr(false) }}>{alrmes}</Alert>
            </div>
        );
    }
//https://erp-tiarx.ondigitalocean.app/api/master-data-management?model=measuredunits
//https://erp-test-3wqc9.ondigitalocean.app/api/master-data-management?model=currency
    useEffect(() => {
        if(token != null){
            fetch('https://erp-test-3wqc9.ondigitalocean.app/api/master-data-management?model=measuredunits',
            {
                headers: {
                    'Authorization': `token ${token}`
                }
            })
            .then((res) => { return res.json(); })
            .then((data) => {
                setmutdat(data.data);
            })
        }
    }, [fet])

    function doDelete() {
        deleteRow(dpk);
    }

    const deleteRow = (pkobj) => {
        let currentpk = pkobj;
        const deleterowurl = axios.create({ //phase
            baseURL: `https://erp-test-3wqc9.ondigitalocean.app/api/master-data-management?model=measuredunits&pk=${currentpk}`
        });

        deleterowurl.delete('',
            {
                headers: {
                    'Authorization': `token ${token}`
                }
            })
            .then((response) => {
                setOpen(false);
                setdispalr(true);
                setalrstatus(true);
                setalrmes('One Row Deleted!');
                setfet(!fet);
                playsuccess();
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const playsuccess = () => {
        success.play();
    }
    const playfailure = () => {
        failure.play();
    }


    return (
        <>
            <audio id="suc">
                <source src="https://drive.google.com/uc?export=download&id=1V_Caw86copGxXg6c9cn2xg2mxQOvEc83" type="audio/mp3" />
            </audio>
            <audio id="fail">
                <source src="https://drive.google.com/uc?export=download&id=1j41aa4YxNua9mihX-qb9p5X_hm2ZPDpJ" type="audio/mp3" />
            </audio>
            {dispalr == true ? <Alr /> : null}
            <div className="row">
                <div className="col-lg-12">
                    <Header />
                </div>
                <div className="col-lg-2">
                    <Sidenav currentmodule={'Admin'} currentbutton={'Configuration'} currentpage={'Measured Unit'} />
                </div>
                <div className="col-lg-10">
                    <div className="comhed">
                        {/* {disp === true ? <button className="comadbtn" onClick={() => { setdisp(!disp) }}>Add</button> :
                        <button className="comadbtn" onClick={() => { setdisp(!disp) }}>Cancel</button>} */}
                        <h5>Currency</h5>
                        <h6>Admin / Configuration / Measured Unit</h6>
                    </div>
                    <div className="tablepadding">
                        {token == null || token == '' ?
                            <h2>Please Login..&emsp; <Link to={'/'}>Login Page</Link></h2>
                            :
                            <>
                                <Tbl
                                    tableheaddata={tableheaddata}
                                    tablebodydata={muntdat}
                                    tablebodycolumn={tablebodycolumn}
                                    upk={setupk}
                                    dpk={setdpk}
                                    delog={setOpen}
                                />
                            </>
                        }
                    </div>
                </div>

            </div>
            <div>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            {"Do You Want To Delete ? "}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                <b style={{ color: 'black' }}>Unit Name: &emsp;{dpk}</b>
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button onClick={doDelete} autoFocus sx={{ color: 'red' }}>
                                Delete
                            </Button>
                        </DialogActions>
                    </Dialog>
            </div>
        </>
    );
}



export default Measuredunit;