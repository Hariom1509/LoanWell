import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () =>{

    return(
        <>
 
        <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
            <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                    <li class="nav-item">
                        <Link className="nav-link align-middle px-0" to='/'><i class="fs-4 bi-house"></i><span class="ms-1 d-none d-sm-inline">Home</span></Link>
                    </li>
                    <li>
                        <Link className="nav-link px-0 align-middle" to='/dashboard'><i class="fs-4 bi-speedometer2"></i><span class="ms-1 d-none d-sm-inline">Dashboard</span></Link>
                    </li>
                    <li>
                        <Link className="nav-link px-0 align-middle" to='/login'><i class="fs-4 bi-table"></i> <span class="ms-1 d-none d-sm-inline">Login</span></Link>
                    </li>
                    <li>
                        <Link className="nav-link px-0 align-middle" to='/register'><i class="fs-4 bi-table"></i> <span class="ms-1 d-none d-sm-inline">Register</span></Link>
                    </li>
                    <li>
                        <Link className="nav-link px-0 align-middle" to='/apply'><i class="fs-4 bi-table"></i> <span class="ms-1 d-none d-sm-inline">Apply Loan</span></Link>
                    </li>
                    <li>
                        <Link className="nav-link px-0 align-middle" to='/viewuseritems'><i class="fs-4 bi-table"></i> <span class="ms-1 d-none d-sm-inline">View Purchases</span></Link>
                    </li>
                    <li>
                        <Link className="nav-link px-0 align-middle" to='/viewloans'><i class="fs-4 bi-table"></i> <span class="ms-1 d-none d-sm-inline">View Loans</span></Link>
                    </li>
                </ul>

                <hr/>
                <div className="dropdown pb-4">
                    <a href="#" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src="https://github.com/mdo.png" alt="hugenerd" width="30" height="30" class="rounded-circle" />
                        
                        <span class="d-none d-sm-inline mx-1">Hariom</span>
                    </a>
                    
                    <ul class="dropdown-menu dropdown-menu-dark text-small shadow">
                    <li>
                        <Link className="dropdown-item" to='/logout'>Logout</Link>
                    </li>
                    </ul>
                </div>
            </div>
        </div>

        </>
    );
};

export default Sidebar;