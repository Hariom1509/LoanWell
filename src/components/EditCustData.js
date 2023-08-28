import React,{useState,useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthenticationService from "../service/AuthenticationService";

const EditCustData = () => {

    const [allEmployees,setAllEmployees] = useState([]);

    const history = useNavigate();
    useEffect(() => {
        if(!AuthenticationService.isLoggedIn()){
            history('/');
        } else {
            sessionStorage.getItem('name');
            sessionStorage.getItem('id');
            fetchItems();
        }
    },[]);

    const fetchItems = () =>{
        try {
            fetch('http://localhost:8085/lms/api/employees')
            .then(res => {
                console.log(res);
                if(!res.ok){
                    throw Error('could not fetch the data for that resource');
                }
                return res.json()
            })
            .then(data =>{
                console.log(data);
                setAllEmployees(data);
            })
        } catch (error) {
            alert('An error occurred during fetching employess.');  
        }
    }
    const editEmployee = (id) => {
        history(`/editEmployee/${id}`);
    }
    const deleteEmployee = (id) => {
        try {
            fetch('http://localhost:8085/lms/api/employees/'+id, {
                method: 'DELETE',
                headers: { "Content-Type": "application/json" }
            }).then(() => {
                console.log('Employee Deleted');
                fetchItems();
                alert("Employee Deleted");
                // window.location.reload();
    
            })
        } catch (error) {
            alert('An error occurred during deleting employee.');  
        }
    };

    return(
        <div className='container'>
            <h2 className="head">Edit Customer Data</h2>
            <br />
            <div class="d-grid gap-3 col-6 mx-auto">
                <button class="btn btn-success" type="button"><Link to='/register' style={{ textDecoration: 'none', color:'white' }}>Add New Customer</Link></button>
            </div>
            <br />
            <div style={{diplay:'flex', width:'25%', transform: 'rotate (-90deg)', position: 'absolute', left: '30%'}}>
            <table class="table table-dark table-striped">
            <thead>
                <tr>
                    <th scope="col">Employee Id</th>
                    <th scope="col">Employee Name</th>
                    <th scope="col">Designation</th>
                    <th scope="col">Department</th>
                    <th scope="col">Gender</th>
                    <th scope="col">DOB</th>
                    <th scope="col">DOJ</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Delete</th>
                </tr>
            </thead>
            <tbody>
                {allEmployees.map(employee => {
                    return(
                    <tr key={employee.employee_id}>
                        <th scope="row">{employee.employee_id}</th>
                        <td>{employee.employee_name}</td>
                        <td>{employee.designation}</td>
                        <td>{employee.department}</td>
                        <td>{employee.gender}</td>
                        <td>{employee.dob}</td>
                        <td>{employee.doj}</td>
                        <td><button type="button" class="btn btn-warning btn-sm" onClick={() => editEmployee(employee.employee_id)}> Edit</button></td>
                        <td><button type="button" class="btn btn-danger btn-sm" onClick={() => deleteEmployee(employee.employee_id)}>Delete</button></td>
                    </tr>
                    )
                })}
                
            </tbody>
            </table>
            </div>
        </div>
    );
};

export default EditCustData;