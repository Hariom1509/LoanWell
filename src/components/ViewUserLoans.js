import React, { useEffect, useState } from "react";
import AuthenticationService from "../service/AuthenticationService";
import { useNavigate } from "react-router";

const ViewUserLoans = () => {

    const [loans, setLoans] = useState([]);
    const [user, setUser] = useState(sessionStorage.getItem('id'));

    const history=useNavigate();

    useEffect(() => {
        // setUser(localStorage.getItem('id'));

        if(!AuthenticationService.isLoggedIn()){
            history('/');
        } else {
            sessionStorage.getItem('name');
            sessionStorage.getItem('id');

            fetchLoans();
        }
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
            <div className="table-responsive">
                <table class="table-primary">
                <tr class="table-primary">
                <td class="table-primary"><b>Employee id:</b> {sessionStorage.getItem('id')}</td>
                <td class="table-primary"><b>Designation:</b> {sessionStorage.getItem('design')}</td>
                <td class="table-primary"><b>Department:</b> {sessionStorage.getItem('dept')}</td>
                </tr>
                </table>
            </div>

            <br />
            <br />
            <div className="table-responsive">
            <table class="table table-dark table-striped" style={{borderRadius:'15px', overflow:'hidden'}}>
            <thead>
                <tr>
                <th scope="col">Loan Id</th>
                <th scope="col">Loan Type</th>
                <th scope="col">Duration</th>
                <th scope="col">Card Issue Date</th>
                <th scope="col">Status</th>
                </tr>
            </thead>
            <tbody>
                {loans.filter(function(el){return el.paidback === 0}).map(loan => {
                    return(
                    <tr key={loan.loan_id}>
                        <th scope="row">{loan.loan_id}</th>
                        <td>{loan.loan_type}</td>
                        <td>{loan.duration_in_years}</td>
                        <td>{loan.card_issue_date}</td>
                        <td>{loan.issued==1?"Sanctioned":"Pending"}</td>
                    </tr>
                    )
                })}
                
            </tbody>
            </table>
            </div>
        </div>
    );
};

export default ViewUserLoans;