import React from "react";

const ViewUserLoans = () => {

    return(
        <div className="container">
            <h2 className="head">User Loans</h2>

            <br />
            <br />

            <table class="table-primary">
            <tr class="table-primary">
            <td class="table-primary"><b>Employee id:</b> uid</td>
            <td class="table-primary"><b>Designation:</b> userDesignation</td>
            <td class="table-primary"><b>Department:</b> userDepartment</td>
            </tr>
            </table>

            <br />
            <br />
            <table class="table table-dark table-striped">
            <thead>
                <tr>
                <th scope="col">Loan Id</th>
                <th scope="col">Loan Type</th>
                <th scope="col">Duration</th>
                <th scope="col">Card Issue Details</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <th scope="row">1</th>
                <td>Furniture</td>
                <td>5</td>
                <td>01/01/2001</td>
                </tr>
                <tr>
                <th scope="row">2</th>
                <td>Stationary</td>
                <td>0</td>
                <td>02/02/2002</td>
                </tr>
            </tbody>
            </table>
        </div>
    );
};

export default ViewUserLoans;