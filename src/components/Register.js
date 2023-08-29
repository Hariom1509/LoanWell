import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../style/Register.css';
import '../style/ApplyUserLoan.css';
import AuthenticationService from '../service/AuthenticationService';

const Register = () => {

    const history = useNavigate(); // Object to navigate

    //defining state
    const [employee, setEmployee] = useState({
        employee_id: '',
        employee_name: '',
        designation: '',
        department: '',
        gender: '',
        dob: '',
        doj: '',
        password: '',
    });


    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setEmployee((prevEmployee) => ({
                ...prevEmployee,
                [parent]: {
                    ...prevEmployee[parent],
                    [child]: value
                }
            }));
        } else {
            setEmployee((prevEmployee) => ({
                ...prevEmployee,
                [name]: value
            }));
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length === 0) {
            try {
                await AuthenticationService.registerEmployee(employee);
                setSuccessMessage('Registration successful!');
                // Clear form or navigate to another page
                alert("Registration Successfull");
                setTimeout(() => {
                    history('/login');
                },0);
            } catch (error) {
                console.error('Registration error', error);
                setSuccessMessage('An error occurred during registration.');
            }
        } else {
            setErrors(validationErrors);
        }
    };

    const validateForm = () => {
        let validationErrors = {};

        // if (!employee.employee_id) {
        //     validationErrors.employee_id = 'Emp ID is required.';
        // }

        if (!employee.employee_name) {
            validationErrors.employee_name = 'Name is required.';
        } else if(!/^[a-zA-Z ]*$/.test(employee.employee_name)) {
            validationErrors.employee_name = 'Name can only be alphabet';
        }

        if (!employee.password) {
            validationErrors.password = 'Password is required.';
        } else if (employee.password.length < 6) {
            validationErrors.password = 'Password must be at least 6 characters.';
        }

        if (!employee.department) {
            validationErrors.department = 'Department is required.';
        }

        if (!employee.gender) {
            validationErrors.gender = 'Gender is required.';
        }

        if (!employee.designation) {
            validationErrors.designation = 'designationation is required.';
        }

        if (!employee.dob) {
            validationErrors.dob = 'Date of Birth is required.';
        }

        if (!employee.doj) {
            validationErrors.doj = 'Date of Joining is required.';
        }
        return validationErrors;
    };

    return (
        <div className="registration-container container-fluid">
            <h2 className='head col-9 mx-auto'>EMPLOYEE REGISTRATION</h2>
            {successMessage && <p className="success-message">{successMessage}</p>}
            <form onSubmit={handleSubmit} class="form-horizontal">
            <div className="form-group col-9 mx-auto">
            <div className='row'>
                    <div className='col'>
                        <div className="form-group">
                            <label>Employee Id:</label>
                            <input
                                type="text"
                                name="employee_id"
                                value={employee.employee_id}
                                onChange={handleChange}
                                className={errors.employee_id && 'error'}
                                style={{height:'37px'}}
                            />
                            {errors.employee_id && <p className="error-message">{errors.employee_id}</p>}
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col'>
                        <div className="form-group">
                            <label>Employee Name:</label>
                            <input
                                type="text"
                                name="employee_name"
                                value={employee.employee_name}
                                onChange={handleChange}
                                className={errors.employee_name && 'error'}
                                style={{height:'37px'}}
                            />
                            {errors.employee_name && <p className="error-message">{errors.employee_name}</p>}
                        </div>
                    </div>
                </div>

                <div className="form-group col-md-12">
                    <label className='col-sm-2 control-label'>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={employee.password}
                        onChange={handleChange}
                        className={errors.password && 'error'}
                        style={{height:'37px'}}
                    />
                    {errors.password && <p className="error-message">{errors.password}</p>}
                </div>

                <div className='row'>
                    <div className='col'>
                        <div className="form-group">
                            <label for="department">Department:</label>
                                <select required name = "department" value={employee.department} onChange={handleChange} className='form-select form-select-sm mb-4' aria-label="Default select example">
                                    <option selected>Open this select menu</option>
                                    <option value = "CT">CT</option>
                                    <option value = "DTI">DTI</option>
                                    <option value = "TCOO">TCOO</option>
                                    <option value = "CTO">CTO</option>
                                </select>
                            {errors.department && <p className="error-message">{errors.department}</p>}
                        </div>
                    </div>

                    <div className='col'>
                        <div className="form-group">
                            <label for="designation">designation:</label>
                            <select name = "designation" required value={employee.designation} onChange={handleChange} className='form-select form-select-sm mb-4' aria-label="Default select example">
                                <option selected>Open this select menu</option>
                                <option value = "Program Associate">Program Associate</option>
                                <option value = "Software Engineer">Software Engineer</option>
                                <option value = "Manager">Manager</option>
                            </select>
                            {errors.designation && <p className="error-message">{errors.designation}</p>}
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <label for="gender">Gender:</label>
                    <select name =  "gender" required value={employee.gender} onChange={handleChange} className='form-select form-select-sm mb-4' aria-label="Default select example">
                        <option selected>Open this select menu</option>
                        <option value = "M">Male</option>
                        <option value = "F">Female</option>
                    </select>
                    {errors.gender && <p className="error-message">{errors.gender}</p>}
                </div>

                <div className='row'>
                    <div className='col'>
                        <div className="form-group">
                            <label>Date of Birth:</label>
                            <input
                                type="date"
                                name="dob"
                                value={employee.dob}
                                onChange={handleChange}
                                className={errors.dob && 'error'}
                                style={{height:'37px'}}
                            />
                            {errors.dob && <p className="error-message">{errors.dob}</p>}
                        </div>
                    </div>
                    <div className='col'>
                        <div className="form-group">
                            <label>Date of Joining:</label>
                            <input
                                type="date"
                                name="doj"
                                value={employee.doj}
                                onChange={handleChange}
                                className={errors.doj && 'error'}
                                style={{height:'37px'}}
                            />
                            {errors.doj && <p className="error-message">{errors.doj}</p>}
                        </div>
                    </div>
                </div>

                <div className="form-group d-grid gap-2 col-6 mx-auto">
                    <button type="submit" className="btn btn-success">
                        Register
                    </button>
                </div>
                </div>
            </form>
        </div >
    );
};

export default Register;