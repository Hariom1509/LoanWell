import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import AuthenticationService from "../service/AuthenticationService";


const ViewAllLoans = () => {
    const [items, setItems] = useState([]);
    const [user, setUser] = useState(sessionStorage.getItem('id'));

    const history=useNavigate();

    useEffect(() => {
        // setUser(localStorage.getItem('id'));

        if(!AuthenticationService.isLoggedIn()){
            history('/');
        } else {
            sessionStorage.getItem('name');
            sessionStorage.getItem('id');

            
        }
    },[]);


    return(
        <div className="container">
            <h2 className="head">Items Purchased</h2>
            <br />
            <div className="table-responsive">
            <table class="table table-dark table-striped">
            <thead>
                <tr>
                <th scope="col">Employee ID</th>
                <th scope="col">Loan ID</th>
                <th scope="col">Issue ID</th>
                </tr>
            </thead>
            <tbody>
                {items.map(employee => {
                    return(
                    <tr key={employee.issue_id}>
                        <th scope="row">{employee.issue_id}</th>
                        <td>{employee.item_description}</td>
                        <td>{employee.item_make}</td>
                        <td>{employee.item_category}</td>
                        <td>{employee.item_valuation}</td>
                    </tr>
                    )
                })}
                
            </tbody>
            </table>
            </div>
        </div>
    );


}

export default ViewAllLoans;