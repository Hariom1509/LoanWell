import React from "react";
import { useState, useEffect } from "react";
import AuthenticationService from "../service/AuthenticationService";
import { useNavigate } from "react-router";

const ViewUserItems= () => {

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

            fetchItems();
        }
    },[]);

    console.log(user);

    const fetchItems = () =>{
        try {
            fetch('http://localhost:8085/lms/api/employees/'+user+'/viewmyitems')
            .then(res => {
                console.log(res);
                if(!res.ok){
                    throw Error('could not fetch the data for that resource');
                }
                return res.json()
            })
            .then(data =>{
                console.log(data);
                setItems(data);
            })
        } catch (error) {
            alert('An error occurred during fetching employess.');  
        }
    }

    return(
        <div className="container">
            <h2 className="head">Items Purchased</h2>

            <br />
            <br />

            <table class="table-primary">
            <tr class="table-primary">
            <td class="table-primary"><b>Employee id:</b> {localStorage.getItem('id')}</td>
            <td class="table-primary"><b>Designation:</b> {localStorage.getItem('design')}</td>
            <td class="table-primary"><b>Department:</b> {localStorage.getItem('dept')}</td>
            </tr>
            </table>

            <br />
            <br />
            <table class="table table-dark table-striped">
            <thead>
                <tr>
                <th scope="col">Issue Id</th>
                <th scope="col">Item Description</th>
                <th scope="col">Item Make</th>
                <th scope="col">Item Category</th>
                <th scope="col">Item Valuation</th>
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
    );
};

export default ViewUserItems;