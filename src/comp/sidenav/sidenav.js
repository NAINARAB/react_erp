import * as React from 'react';
import { useNavigate } from "react-router-dom";
import './sidenav.css'


function Sidenav() {
    return (
        <div>
            <div>
                <section class="section-content">
                    <div class="row">
                        <aside class="col-lg-2">

                            <nav class="sidebar cuscard py-2 mb-4">

                                <ul class="nav flex-column" id="nav_accordion">

                                    <div className='usrinfo' style={{ display: 'flex' }}>
                                        <i class="bi bi-person-circle" ></i>
                                        <div style={{ display: 'inline' }}>
                                            <h5>Nainar AB</h5>
                                            <p>Admin</p>
                                        </div>

                                    </div>


                                    <li class="nav-item">
                                        <button class="nav-link sbutton butful" data-bs-toggle="collapse" data-bs-target="#menu_item0" style={{ display: 'inline' }}>
                                            <i class="bi bi-ui-checks-grid itme"></i>&ensp;
                                            Dashboard <i class="bi bi-chevron-right itmeright"></i></button>
                                        <ul id="menu_item0" class="submenu collapse" data-bs-parent="#nav_accordion">
                                            <li><button class="nav-link sbutton" ><i class="bi bi-dot"></i>Submenu</button></li>
                                        </ul>
                                    </li>





                                    <li class="nav-item">
                                        <button class="nav-link sbutton butful" data-bs-toggle="collapse" data-bs-target="#menu_item1">
                                            <i class="bi bi-person-circle itme"></i>&ensp;
                                            Admin&ensp; <i class="bi bi-chevron-right itmeright"></i> </button>
                                        <ul id="menu_item1" class="submenu collapse" data-bs-parent="#nav_accordion">
                                            <li><button class="nav-link sbutton" ><i class="bi bi-dot"></i>Submenu</button></li>
                                        </ul>
                                    </li>



                                    <li class="nav-item">
                                        <button class="nav-link sbutton butful" data-bs-toggle="collapse" data-bs-target="#menu_item2" href="#">
                                            <i class="bi bi-ui-checks itme"></i>&ensp;
                                            Master Data Management &ensp;<i class="bi bi-chevron-right itmeright"></i> </button>
                                        <ul id="menu_item2" class="submenu collapse" data-bs-parent="#nav_accordion">
                                            <li><button class="nav-link sbutton"><i class="bi bi-dot"></i>Product</button></li>
                                            <li><button class="nav-link sbutton"><i class="bi bi-dot"></i>Raw Material & Accessories</button></li>
                                            <li><button class="nav-link sbutton"><i class="bi bi-dot"></i>Bills of Materials</button></li>
                                            <li><button class="nav-link sbutton"><i class="bi bi-dot"></i>Production Flow</button></li>
                                            <li><button class="nav-link sbutton"><i class="bi bi-dot"></i>Parties</button></li>
                                            <li><button class="nav-link sbutton"><i class="bi bi-dot"></i>Phases</button></li>
                                            <li><button class="nav-link sbutton"><i class="bi bi-dot"></i>Party Type</button></li>
                                            <li><button class="nav-link sbutton"><i class="bi bi-dot"></i>Country</button></li>
                                        </ul>
                                    </li>



                                    <li class="nav-item">
                                        <button class="nav-link sbutton butful" data-bs-toggle="collapse" data-bs-target="#menu_item3">
                                            <i class="bi bi-people-fill itme"></i>&ensp;
                                            Users &ensp;<i class="bi bi-chevron-right itmeright"></i></button>
                                        <ul id="menu_item3" class="submenu collapse" data-bs-parent="#nav_accordion">
                                            <li><button class="nav-link sbutton"><i class="bi bi-dot"></i>Branches</button></li>
                                            <li><button class="nav-link sbutton"><i class="bi bi-dot"></i>Department</button></li>
                                            <li><button class="nav-link sbutton"><i class="bi bi-dot"></i>Devision</button></li>
                                            <li><button class="nav-link sbutton"><i class="bi bi-dot"></i>User</button></li>
                                            <li><button class="nav-link sbutton"><i class="bi bi-dot"></i>User Role</button></li>
                                        </ul>
                                    </li>



                                    <li class="nav-item">
                                        <button class="nav-link sbutton butful" data-bs-toggle="collapse" data-bs-target="#menu_item4">
                                            <i class="bi bi-diagram-3-fill itme"></i>&ensp;
                                            Inventry Management &ensp;<i class="bi bi-chevron-right itmeright"></i> </button>
                                        <ul id="menu_item4" class="submenu collapse" data-bs-parent="#nav_accordion">
                                            <li><button class="nav-link sbutton"><i class="bi bi-dot"></i>Submenu</button></li>
                                        </ul>
                                    </li>




                                    <li class="nav-item">
                                        <button class="nav-link sbutton butful" data-bs-toggle="collapse" data-bs-target="#menu_item5">
                                            <i class="bi bi-bar-chart-fill itme"></i>&ensp;
                                            Sales Management &ensp;<i class="bi bi-chevron-right itmeright"></i> </button>
                                        <ul id="menu_item5" class="submenu collapse" data-bs-parent="#nav_accordion">
                                            <li><button class="nav-link sbutton"><i class="bi bi-dot"></i>Submenu</button></li>
                                        </ul>
                                    </li>





                                    <li class="nav-item">
                                        <button class="nav-link sbutton butful" data-bs-toggle="collapse" data-bs-target="#menu_item6">
                                            <i class="bi bi-cart-check-fill itme"></i>&ensp;
                                            Purchase Management &ensp;<i class="bi bi-chevron-right itmeright"></i> </button>
                                        <ul id="menu_item6" class="submenu collapse" data-bs-parent="#nav_accordion">
                                            <li><button class="nav-link sbutton" ><i class="bi bi-dot"></i>Submenu</button></li>
                                        </ul>
                                    </li>





                                    <li class="nav-item">
                                        <button class="nav-link sbutton butful" data-bs-toggle="collapse" data-bs-target="#menu_item7">
                                            <i class="bi bi-rulers itme"></i>&ensp;
                                            Production Management &ensp;<i class="bi bi-chevron-right itmeright"></i> </button>
                                        <ul id="menu_item7" class="submenu collapse" data-bs-parent="#nav_accordion">
                                            <li><button class="nav-link sbutton" ><i class="bi bi-dot"></i>Submenu</button></li>
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