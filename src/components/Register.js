import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../style/Register.css';
import AuthenticationService from '../service/AuthenticationService';

const Register = () => {

    const history = useNavigate(); // Object to navigate

    //defining state
    const [employee, setEmployee] = useState({
        email: '',
        fname: '',
        lname: '',
        password: '',
        dob: '',
        phoneNo: '',
        
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
                },2000);
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

        if (!employee.email) {
            validationErrors.email = 'Email is required.';
        }

        if (!employee.fname) {
            validationErrors.fname = 'First Name is required.';
        }
        else if (!/^[A-Za-z]+$/.test(employee.fname)) {
            validationErrors.fname = 'Enter Alphabets Only';
        }

        if (!employee.lname) {
            validationErrors.lname = 'Last Name is required.';
        }

        if (!employee.password) {
            validationErrors.password = 'Password is required.';
        } else if (employee.password.length < 6) {
            validationErrors.password = 'Password must be at least 6 characters.';
        }

        if (!employee.dob) {
            validationErrors.dob = 'Date of Birth is required.';
        }

        if (!employee.phoneNo) {
            validationErrors.phoneNo = 'Phone number is required.';
        } else if (!/^\d{10}$/.test(employee.phoneNo)) {
            validationErrors.phoneNo = 'Invalid phone number. Please enter a 10-digit number.';
        }


        return validationErrors;
    };

    return (
        <div className="registration-container">
            <h2 className='head'>EMPLOYEE REGISTRATION</h2>
            <br></br>
            {successMessage && <p className="success-message">{successMessage}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={employee.email}
                        onChange={handleChange}
                        className={errors.email && 'error'}
                    />
                    {errors.email && <p className="error-message">{errors.email}</p>}
                </div>
                <div className="form-group">
                    <label>First Name:</label>
                    <input
                        type="text"
                        name="fname"
                        value={employee.fname}
                        onChange={handleChange}
                        className={errors.fname && 'error'}
                    />
                    {errors.fname && <p className="error-message">{errors.fname}</p>}
                </div>
                <div className="form-group">
                    <label>Last Name:</label>
                    <input
                        type="text"
                        name="lname"
                        value={employee.lname}
                        onChange={handleChange}
                        className={errors.lname && 'error'}
                    />
                    {errors.lname && <p className="error-message">{errors.lname}</p>}
                </div>

                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={employee.password}
                        onChange={handleChange}
                        className={errors.password && 'error'}
                    />
                    {errors.password && <p className="error-message">{errors.password}</p>}
                </div>

                <div className="form-group">
                    <label>Date of Birth:</label>
                    <input
                        type="date"
                        name="dob"
                        value={employee.dob}
                        onChange={handleChange}
                        className={errors.dob && 'error'}
                    />
                    {errors.dob && <p className="error-message">{errors.dob}</p>}
                </div>

                <div className="form-group">
                    <label>Phone Number:</label>
                    <input
                        type="text"
                        name="phoneNo"
                        value={employee.phoneNo}
                        onChange={handleChange}
                        className={errors.phoneNo && 'error'}
                    />
                    {errors.phoneNo && <p className="error-message">{errors.phoneNo}</p>}
                </div>

                <div className="form-group">
                    <button type="submit" className="submit-button">
                        Register
                    </button>
                </div>
            </form>
        </div >
    );
};

export default Register;