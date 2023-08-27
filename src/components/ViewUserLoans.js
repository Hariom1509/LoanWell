import React, { useEffect, useState } from "react";

const ViewUserLoans = () => {

    const [loans, setLoans] = useState([]);
    const [user, setUser] = useState(localStorage.getItem('id'));

    useEffect(() => {
        // setUser(localStorage.getItem('id'));
        fetchLoans();
    },[]);

    console.log(user);

    const fetchLoans = () =>{
        try {
            fetch('http://localhost:8085/lms/api/employees/'+user+'/viewmyloans')
            .then(res => {
                console.log(res);
                if(!res.ok){
                    throw Error('could not fetch the data for that resource');
                }
                return res.json()
            })
            .then(data =>{
                console.log(data);
                setLoans(data);
            })
        } catch (error) {
            alert('An error occurred during fetching employess.');  
        }
    }

    return(
        <div className="container">
            <h2 className="head">User Loans</h2>



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
                <th scope="col">Loan Type</th>
                <th scope="col">Duration</th>
                <th scope="col">Card Issue Date</th>
                </tr>
            </thead>
            <tbody>
                {loans.map(employee => {
                    return(
                    <tr key={employee.loan_id}>
                        <th scope="row">{employee.loan_id}</th>
                        <td>{employee.loan_type}</td>
                        <td>{employee.duration_in_years}</td>
                        <td>{employee.card_issue_date}</td>
                    </tr>
                    )
                })}
                
            </tbody>
            </table>
        </div>
    );
};

export default ViewUserLoans;