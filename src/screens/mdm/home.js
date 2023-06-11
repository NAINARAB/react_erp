import React, { useState, useEffect } from "react";
import Header from "../../comp/header/header";
import Sidenav from "../../comp/sidenav/sidenav";
import { Switch, Alert } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from "react-router-dom";


const Home = () => {
    const token = sessionStorage.getItem("token");
    const [che, setche] = useState(false);
    const [alr, setalr] = useState(true);
    const [crntusrnme, setcrntusrnme] = useState();

    useEffect(() => {
        if (token != null) {
            fetch('https://erp-test-3wqc9.ondigitalocean.app/api/profile/',
                {
                    headers: {
                        'Authorization': `token ${token}`
                    }
                })
                .then((res) => { return res.json(); })
                .then((data) => {
                    setcrntusrnme(data.data.name);
                })
        }
    }, [])

    function openFullscreen() {
        let elem = document.documentElement;
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) { /* Safari */
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE11 */
            elem.msRequestFullscreen();
        }
    }
    function closeFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { /* Safari */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE11 */
            document.msExitFullscreen();
        }
    }

    function action() {
        if (che == false) {
            openFullscreen();
            setche(true);
        }
        if (che == true) {
            closeFullscreen();
            setche(false);
        }
    }


    return (
        <>
            {crntusrnme != null && alr ?
                <div className="alrt">
                    <Alert severity={"success"}
                        onClose={() => { setalr(false) }}>{'Welcome ' + crntusrnme + ' 🙏'}</Alert>
                </div>
                : null}
            <div className="row">
                <div className="col-lg-12">
                    <Header />
                </div>
                <div className="col-lg-2">
                    <Sidenav />
                </div>
                <div className="col-lg-10">
                    <div className="comhed">
                        <h5>Home</h5>
                        <h6></h6>
                    </div>
                    <div className="tablepadding">
                        {token == null || token == '' ?
                            <h2>Please Login..&emsp; <Link to={'/'}>Login Page</Link></h2>
                            :
                            <>
                                <div>
                                    <h2>You Have Valid Token(Insert, Update, Delete)..!</h2><br /><br />
                                    <h3>Use Desktop or Laptop for better experience :)</h3>

                                    <h3>To Start Explore the Project
                                        <b style={{ fontWeight: 500 }}> (Admin Module)</b><br />
                                        <Link to='/admin/mdm/product'>Click Here</Link>
                                    </h3><br />

                                    <h3>Try FullScreen &emsp;
                                        <Switch checked={che} onChange={action} />
                                    </h3>

                                </div>
                            </>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;