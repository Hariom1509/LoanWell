import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserState } from "./UserState";
import { UserContext } from "./UserState";

const UserDashboard = () => {

    return(
        <div className="container">
            <span className='head'><h2>User Dashboard</h2></span>
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