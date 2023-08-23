import React from "react";

const EditCustData = () => {

    return(
        <div className="container">
            <h2 className="head">Edit Customer Data</h2>
            <br />
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
                <tr>
                    <th scope="row">1</th>
                    <td>Ram</td>
                    <td>Manager</td>
                    <td>Finance</td>
                    <td>Male</td>
                    <td>01/01/1999</td>
                    <td>01/01/2021</td>
                    <td><button type="button" class="btn btn-warning btn-sm">Edit</button></td>
                    <td><button type="button" class="btn btn-danger btn-sm">Delete</button></td>
                </tr>
                <tr>
                <th scope="row">2</th>
                    <td>Anita</td>
                    <td>Executive</td>
                    <td>Finance</td>
                    <td>Female</td>
                    <td>01/01/1999</td>
                    <td>01/01/2021</td>
                    <td><button type="button" class="btn btn-warning btn-sm">Edit</button></td>
                    <td><button type="button" class="btn btn-danger btn-sm">Delete</button></td>
                </tr>
            </tbody>
            </table>
        </div>
    );
};

export default EditCustData;