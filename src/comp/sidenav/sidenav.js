import * as React from 'react';
import { useState, useEffect, memo } from 'react';
import './sidenav.css'
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';


const Sidenav = () => {
    const token = sessionStorage.getItem("token");
    const [opncond, setopencond] = useState(false)
    const navigate = useNavigate();

    const [crntusrnme, setcrntusrnme] = useState('');
    const [usrrol, setusrrol] = useState('');

    useEffect(() => {
        fetch('https://erp-test-3wqc9.ondigitalocean.app/api/profile/',
        {
            headers: {
                'Authorization': `token ${token}`
            }
        })
            .then((res) => { return res.json(); })
            .then((data) => {console.log(data)
                setcrntusrnme(data.data.name);console.log("name", crntusrnme)
                setusrrol(data.data.role_get); console.log("role", usrrol)
            })
    }, [])

    return (
        <div>
            <div className='menuhide'>
                {opncond === false ? <IconButton size='small' sx={{ color: 'white', fontWeight: 'bold' }}
                    onClick={() => { document.getElementById('sid').style.display = 'block'; setopencond(true) }}
                ><MenuIcon /></IconButton> :

                    <IconButton size='small' sx={{ color: 'white', fontWeight: 'bold' }}
                        onClick={() => { document.getElementById('sid').style.display = 'none'; setopencond(false) }}
                    ><CloseIcon /></IconButton>}
            </div>
            <div className='hideside' id='sid'>
                <section className="section-content">
                    <div>
                        <aside>

                            <nav className="sidebar cuscard py-2 mb-4">

                                <ul className="nav flex-column" id="nav_accordion">

                                    <div className='usrinfo' style={{ display: 'flex' }}>
                                        <i className="bi bi-person-circle" ></i>
                                        <div>
                                            <h5 style={{color:'rgb(64, 38, 236)'}}>{crntusrnme.toUpperCase()}</h5>
                                            <p style={{color:'rgb(64, 38, 236)'}}>{usrrol}</p>
                                        </div>

                                    </div>


                                    <li className="nav-item">
                                        <button className="nav-link sbutton butful" data-bs-toggle="collapse" data-bs-target="#menu_item0" style={{ display: 'inline' }}>
                                            <i className="bi bi-ui-checks-grid itme"></i>&ensp;
                                            Dashboard <i className="bi bi-chevron-right itmeright"></i></button>
                                        <ul id="menu_item0" className="submenu collapse" data-bs-parent="#nav_accordion">
                                            <li><button className="nav-link sbutton" ><i className="bi bi-dot"></i>Submenu</button></li>
                                        </ul>
                                    </li>




                                    <li className="nav-item">
                                        <button className="nav-link sbutton butful" data-bs-toggle="collapse" data-bs-target="#menu_item1">
                                            <i className="bi bi-person-circle itme"></i>&ensp;
                                            Admin&ensp; <i className="bi bi-chevron-right itmeright"></i> </button>
                                        <ul id="menu_item1" className="submenu collapse" style={{ paddingLeft: '0', paddingRight: '0' }} data-bs-parent="#nav_accordion">

                                            <li>
                                                <button className="nav-link sbutton butful" data-bs-toggle="collapse" data-bs-target="#menu_item10">
                                                    <i className="bi bi-people-fill itme"></i>&ensp;
                                                    User Management &ensp;<i className="bi bi-chevron-right itmeright"></i></button>
                                                <ul id="menu_item10" className="submenu collapse">
                                                    <li><button className="nav-link sbutton" onClick={() => { navigate('/admin/manageusers/branches') }}><i className="bi bi-dot"></i>Branches</button></li>
                                                    <li><button className="nav-link sbutton" onClick={() => { navigate('/admin/manageusers/department') }}><i className="bi bi-dot"></i>Department</button></li>
                                                    <li><button className="nav-link sbutton" onClick={() => { navigate('/admin/manageusers/devision') }}><i className="bi bi-dot"></i>Devision</button></li>
                                                    <li><button className="nav-link sbutton" onClick={() => { navigate('/admin/manageusers/users') }}><i className="bi bi-dot"></i>User</button></li>
                                                    <li><button className="nav-link sbutton" onClick={() => { navigate('/admin/manageusers/userrole') }}><i className="bi bi-dot"></i>User Role</button></li>
                                                </ul>
                                            </li>


                                            <li>
                                                <button className="nav-link sbutton butful" data-bs-toggle="collapse" data-bs-target="#menu_item2">
                                                    <i className="bi bi-ui-checks itme"></i>&ensp;
                                                    Master Data Management &ensp;<i className="bi bi-chevron-right itmeright"></i> </button>
                                                <ul id="menu_item2" className="submenu collapse">
                                                    <li><button className="nav-link sbutton" onClick={() => { navigate('/admin/mdm/product') }}><i className="bi bi-dot"></i>Product</button></li>
                                                    <li><button className="nav-link sbutton" onClick={() => { navigate('/admin/mdm/rawmaterialsaccessories') }}><i className="bi bi-dot"></i>Raw Material </button></li>
                                                    <li><button className="nav-link sbutton" onClick={() => { navigate('/admin/mdm/billsofmaterials') }}><i className="bi bi-dot"></i>Bills of Materials</button></li>
                                                    <li><button className="nav-link sbutton" onClick={() => { navigate('/admin/mdm/productionflow') }}><i className="bi bi-dot"></i>Production Flow</button></li>
                                                    <li><button className="nav-link sbutton" onClick={() => { navigate('/admin/mdm/parties') }}><i className="bi bi-dot"></i>Parties</button></li>
                                                </ul>
                                            </li>


                                            <li>
                                                <button className="nav-link sbutton butful" data-bs-toggle="collapse" data-bs-target="#menu_item3">
                                                    <i className="bi bi-gear-fill itme"></i>&ensp;
                                                    Configuration &ensp;<i className="bi bi-chevron-right itmeright"></i></button>
                                                <ul id="menu_item3" className="submenu collapse">
                                                    <li><button className="nav-link sbutton" onClick={() => { navigate('/admin/configuration/partytype') }}><i className="bi bi-dot"></i>Party Type</button></li>
                                                    <li><button className="nav-link sbutton" onClick={() => { navigate('/admin/configuration/phases') }}><i className="bi bi-dot"></i>Production Phases</button></li>
                                                    <li><button className="nav-link sbutton" onClick={() => { navigate('/admin/configuration/country') }}><i className="bi bi-dot"></i>Country</button></li>
                                                    <li><button className="nav-link sbutton" onClick={() => { navigate('/admin/configuration/state') }}><i className="bi bi-dot"></i>State</button></li>
                                                    <li><button className="nav-link sbutton" onClick={() => { navigate('/admin/configuration/currency') }}><i className="bi bi-dot"></i>Currency</button></li>
                                                    <li><button className="nav-link sbutton" onClick={() => { navigate('/admin/configuration/measuredunit') }}><i className="bi bi-dot"></i>Measured Units</button></li>
                                                </ul>
                                            </li>


                                        </ul>
                                    </li>






                                    <li className="nav-item">
                                        <button className="nav-link sbutton butful" data-bs-toggle="collapse" data-bs-target="#menu_item4">
                                            <i className="bi bi-diagram-3-fill itme"></i>&ensp;
                                            Inventry Management &ensp;<i className="bi bi-chevron-right itmeright"></i> </button>
                                        <ul id="menu_item4" className="submenu collapse" data-bs-parent="#nav_accordion">
                                            <li><button className="nav-link sbutton"><i className="bi bi-dot"></i>Submenu</button></li>
                                        </ul>
                                    </li>




                                    <li className="nav-item">
                                        <button className="nav-link sbutton butful" data-bs-toggle="collapse" data-bs-target="#menu_item5">
                                            <i className="bi bi-bar-chart-fill itme"></i>&ensp;
                                            Sales Management &ensp;<i className="bi bi-chevron-right itmeright"></i> </button>
                                        <ul id="menu_item5" className="submenu collapse" data-bs-parent="#nav_accordion">
                                            <li><button className="nav-link sbutton"><i className="bi bi-dot"></i>Submenu</button></li>
                                        </ul>
                                    </li>





                                    <li className="nav-item">
                                        <button className="nav-link sbutton butful" data-bs-toggle="collapse" data-bs-target="#menu_item6">
                                            <i className="bi bi-cart-check-fill itme"></i>&ensp;
                                            Purchase Management &ensp;<i className="bi bi-chevron-right itmeright"></i> </button>
                                        <ul id="menu_item6" className="submenu collapse" data-bs-parent="#nav_accordion">
                                            <li><button className="nav-link sbutton" ><i className="bi bi-dot"></i>Submenu</button></li>
                                        </ul>
                                    </li>





                                    <li className="nav-item">
                                        <button className="nav-link sbutton butful" data-bs-toggle="collapse" data-bs-target="#menu_item7">
                                            <i className="bi bi-rulers itme"></i>&ensp;
                                            Production Management &ensp;<i className="bi bi-chevron-right itmeright"></i> </button>
                                        <ul id="menu_item7" className="submenu collapse" data-bs-parent="#nav_accordion">
                                            <li><button className="nav-link sbutton" ><i className="bi bi-dot"></i>Submenu</button></li>
                                        </ul>
                                    </li>

                                </ul>
                            </nav>

                        </aside>
                    </div>
                </section>

            </div>

        </div>
    );

}

export default Sidenav;