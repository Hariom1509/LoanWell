import React from "react";

const ViewUserItems= () => {

    return(
        <div className="container">
            <h2 className="head">Items Purchased</h2>

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
                <th scope="col">Issue Id</th>
                <th scope="col">Item Description</th>
                <th scope="col">Item Make</th>
                <th scope="col">Item Category</th>
                <th scope="col">Item Valuation</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">1</th>
                    <td>Table</td>
                    <td>Wooden</td>
                    <td>Furniture</td>
                    <td>5000</td>
                </tr>
                <tr>
                <th scope="row">1</th>
                    <td>Tea Set</td>
                    <td>Glass</td>
                    <td>Crockery</td>
                    <td>2000</td>
                </tr>
            </tbody>
            </table>
        </div>
    );
};

export default ViewUserItems;