import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthenticationService from "../service/AuthenticationService";

const Sidebar = () =>{

    const[userType, setUserType] = useState("admin");
    const history = useNavigate();

    useEffect(() => {

        if(!AuthenticationService.isLoggedIn()){
            setUserType('none');
            history('/');
        } else {
            setUserType(sessionStorage.getItem('role'));
            sessionStorage.getItem('name');
            sessionStorage.getItem('id');
        }
    },[])

    const handleChange = async() => {
        if(sessionStorage.getItem('id') !== ''){
            sessionStorage.clear();
            history("/");
            window.location.reload();
        }
    }

    //setUserType('none');

    // const handleLogout = async() => {
    //     localStorage.clear();
    //     localStorage.setItem('role','none');
    // }

    return(
        <>
 
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                    {<li>
                            <Link className="nav-link px-0 align-middle" style={{color:'white'}} to='/'>
                                <i class="fs-4 bi-coin"></i>
                                <span class="ms-2 d-none d-lg-inline">LoanWell</span>
                            </Link>
                        </li>
                    }
                    {userType === 'cust' && <li>
                        <Link className="nav-link px-0 align-middle" to='/dashboard'>
                            <i class="fs-4 bi-speedometer2"></i>
                            <span class="ms-1 d-none d-sm-inline">Dashboard</span>
                        </Link>
                    </li>}
                    {userType==='admin' && <li>
                        <Link className="nav-link px-0 align-middle" to='/admin-dashboard'>
                            <i class="fs-4 bi-speedometer2"></i>
                            <span class="ms-1 d-none d-sm-inline">Admin Dashboard</span>
                        </Link>
                    </li>}
                    {userType==='none' && <li>
                        <Link className="nav-link px-0 align-middle" to='/login'>
                            <i class="fs-4 bi-power"></i> 
                            <span class="ms-1 d-none d-sm-inline">Login</span>
                        </Link>
                    </li>}
                    {userType==='admin' &&<li>
                        <Link className="nav-link px-0 align-middle" to='/register'>
                            <i class="fs-4 bi-house-lock"></i> 
                            <span class="ms-1 d-none d-sm-inline">Register User</span>
                        </Link>
                    </li>}
                    {userType==='cust' &&<li>
                        <Link className="nav-link px-0 align-middle" to='/apply'>
                            <i class="fs-4 bi-bank"></i> 
                            <span class="ms-1 d-none d-sm-inline">Apply Loan</span>
                        </Link>
                    </li>}
                    {userType==='cust' &&<li>
                        <Link className="nav-link px-0 align-middle" to='/viewuseritems'>
                            <i class="fs-4 bi-credit-card"></i> 
                            <span class="ms-1 d-none d-sm-inline">View Purchases</span>
                        </Link>
                    </li>}
                    {userType==='cust' &&<li>
                        <Link className="nav-link px-0 align-middle" to='/viewloans'>
                            <i class="fs-4 bi-table"></i> 
                            <span class="ms-1 d-none d-sm-inline">View Loans</span>
                        </Link>
                    </li>}
                    {userType!=='none' &&<li>
                        <Link className="nav-link px-0 align-middle" to='/' onClick={handleChange}>
                            <i class="fs-4 bi-power"></i> 
                            <span class="ms-1 d-none d-sm-inline">Logout</span>
                        </Link>
                    </li>}
                </ul>

                {/* <hr/>
                {userType!== 'none' &&<div className="dropdown pb-4">
                    <p class="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src="https://github.com/mdo.png" alt="hugenerd" width="30" height="30" class="rounded-circle" />
                        
                        <span class="d-none d-sm-inline mx-1">{localStorage.getItem('name')}</span>
                    </p>
                    
                    <ul class="dropdown-menu dropdown-menu-dark text-small shadow">
                    <li>
                        <Link className="dropdown-item" to='/'>Logout</Link>
                    </li>
                    </ul>
                </div>} */}
            </div>
        </div>

        </>
    );
};

export default Sidebar;