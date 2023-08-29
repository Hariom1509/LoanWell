import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthenticationService from "../service/AuthenticationService";

const AdminDashboard = () => {

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
        <div className="container col-6 mx-auto">
            <span className='head'><h2>Dashboard for {sessionStorage.getItem('name')}</h2></span>
            <br />
            <br />
            <div class="d-grid gap-3 col-6 mx-auto">
                <button class="btn btn-secondary" type="button"><Link to='/edit-cust-data' style={{ textDecoration: 'none', color:'white' }}>Customer Data Management</Link></button>
                <button class="btn btn-dark" type="button"><Link to='/viewLoans1' style={{ textDecoration: 'none', color:'white' }}>Loan Card Management</Link></button>
                <button class="btn btn-info" type="button"><Link to='/viewItems' style={{ textDecoration: 'none', color:'black' }}>Item Master Data</Link></button>
            </div>
        </div>
    );
};

export default AdminDashboard;