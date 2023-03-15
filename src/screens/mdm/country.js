import React, { useState, useEffect } from "react";
import Header from "../../comp/header/header";
import Sidenav from "../../comp/sidenav/sidenav";
import { IconButton, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import '../common.css';
import { maxWidth } from "@mui/system";
import Loader from "../../comp/Load/loading";
import axios from "axios";

function Butns() {
    return (
        <>
            <IconButton aria-label="expand row" size="small" ><EditIcon /></IconButton>
            <IconButton aria-label="expand row" size="small" sx={{ color: 'rgba(255, 0, 0, 0.755)', marginRight: '1em' }}><DeleteIcon /></IconButton>
        </>
    );
}

let Countrycomp = (props) => {
    const { countrys } = props;
    let count = 0;
    return (
        <>
            {countrys.length != 0 ?

                <TableContainer component={Paper} sx={{ maxHeight: 650 }}>
                    <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell variant="head" align="left" Width={120} sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white', fontWeight: 'bold' }}>S.No</TableCell>
                                <TableCell variant="head" align="left" width={maxWidth} sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white', fontWeight: 'bold' }}>Country</TableCell>
                                <TableCell variant="head" align="left" width={200} sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white', fontWeight: 'bold' }}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {countrys.map((cntry) => (
                                <TableRow hover='true'>
                                    <TableCell >{++count}</TableCell>
                                    <TableCell>{cntry.country_name}</TableCell>
                                    <TableCell align="left"><Butns /></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer> : <Loader />}
        </>
    );
}


function Country() {
    const [dispcountry, setdispcountry] = useState(false);
    const [countrydata, setcountrydata] = useState([]);


    useEffect(() => {
        fetch('https://erp-dwe8a.ondigitalocean.app/api/get?model=country')
            .then((res) => { return res.json(); })
            .then((data) => {
                console.log(data.data);
                setcountrydata(data.data);
            })
    }, [])

    function AddCountry() {
        const [countryinpt, setcountryinpt] = useState('');
        const postcountryinpt = axios.create({
            baseURL: "https://erp-dwe8a.ondigitalocean.app/api/get?model=country"
        });

        const postcountry = (country) => {
            postcountryinpt.post('', {
                country_name: country
            })
                .then((res) => {
                    console.log("after then", res)
                    if (res.data.status === 'success') {
                        alert("Country Added");
                    }
                    else {
                        if (res.data.status === 'failure') {
                            alert('Something Went Wrong Please Try Again...');
                        }
                    }

                }).catch((err) => {
                    console.log(err);
                })
        };
        let doPost = (e) => {
            e.preventDefault();
            postcountry(countryinpt);
        }
        return (
            <>
                <form>
                    <div className="micard">
                        <h5 className="micardhdr">Add Country</h5>
                        <div className="micardbdy row">
                            <div className="col-lg-4">
                                <label className="micardlble" >Country</label><br />
                                <input className="micardinpt" onChange={(e) => { setcountryinpt(e.target.value) }} required />
                            </div><div className="col-lg-4"></div><div className="col-lg-4"></div>
                        </div>
                    </div><br />
                    <button className="comadbtn" type="submit" onClick={doPost}>Add</button>
                    <button className="cancelbtn" onClick={() => {
                        setdispcountry(false)
                        document.getElementById('countryadbtn').style.display = 'block';
                    }} >Back</button>
                </form>
            </>
        );
    }

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
                            setdispcountry(true)
                            document.getElementById("countryadbtn").style.display = 'none';
                        }}>Add</button>
                        <h5>Country</h5>
                        <h6>Master Data Management / Country </h6>
                    </div>
                    <div className="tablepadding">
                        {dispcountry === false ? <Countrycomp countrys={countrydata} /> : <AddCountry />}
                    </div>
                </div>
            </div>
        </>
    );

}

export default Country;