import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AuthenticationService from "../service/AuthenticationService";

const UserDashboard = () => {

    const history = useNavigate();

    useEffect(() => {

        if(!AuthenticationService.isLoggedIn()){
            history('/');
        } else {
            sessionStorage.getItem('name');
            sessionStorage.getItem('id');
        }
    },[])
    

    return(
        <div className="container">
            <span className='head'><h2>Dashboard for {sessionStorage.getItem('name')}</h2></span>
            <br />
            <br />
            <div class="d-grid gap-3 col-6 mx-auto">
                <button class="btn btn-secondary" type="button"><Link to='/viewloans' style={{ textDecoration: 'none', color:'white' }}>View Loans</Link></button>
                <button class="btn btn-dark" type="button"><Link to='/apply' style={{ textDecoration: 'none', color:'white' }}>Apply for Loans</Link></button>
                <button class="btn btn-info" type="button"><Link to='/viewuseritems' style={{ textDecoration: 'none', color:'black' }}>View Purchases</Link></button>
            </div>
        </div>
    );
};

export default UserDashboard;