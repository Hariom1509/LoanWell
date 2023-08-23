import React from "react";
import loanCard from "../data/loanCard.json";


const LoanCard = () => {

    return(
        <div className="container">
            <h2 className="head"> Loan Data</h2>
            <br />
            <table class="table table-dark table-striped">
            <thead>
                <tr>
                    <th scope="col">Loan Id</th>
                    <th scope="col">Loan Type</th>
                    <th scope="col">Loan Duration in Years</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Delete</th>
                </tr>
            </thead>
            <tbody>
                {loanCard.map(loan => {
                    return(
                    <tr key={loan.loan_id}>
                        <td>{loan.loan_id}</td>
                        <td>{loan.loan_type}</td>
                        <td>{loan.duration}</td>
                        <td><button type="button" class="btn btn-warning btn-sm">Edit</button></td>
                        <td><button type="button" class="btn btn-danger btn-sm">Delete</button></td>
                    </tr>)
                })}
                
            </tbody>
            </table>
        </div>
    );
};

export default LoanCard;