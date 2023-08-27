import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {

    return(
        <div className="container">
            <span className='head'><h2>Dashboard for {localStorage.getItem('name')}</h2></span>
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