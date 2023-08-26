import React, { useState } from "react";
import { useNavigate } from "react-router";
import AuthenticationService from "../service/AuthenticationService";
import '../style/Login.css';
import { Link } from "react-router-dom";

const Login = () => {

    const history = useNavigate();

    const [user, setUser] = useState({});

    const [employee_id, setEmployee_id] = useState('');
    const [password, setPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async () => {
        if (!employee_id || !password) {
          setErrorMessage('Please enter both employee_id and password.');
          return;
        }
    
        const employee = {
          employee_id,
          password
        };

        try {
            const loginSuccess = await AuthenticationService.login(employee);
            console.log('API response:', loginSuccess.data); // Add this line
            if (loginSuccess) {
              setSuccessMessage('Login successful. Redirecting...');
              const getUserSuccess = await AuthenticationService.getUser(employee);
              console.log("User Data"+getUserSuccess.data);
              // setUser(getUserSuccess.data);
              // console.log(user);
              setTimeout(() => {
                history('/dashboard'); // navigates to product Component
              }, 2);
            } else {
              setErrorMessage('Invalid employee_id or password.');
            }
          } catch (error) {
            console.error('Login error', error);
            setErrorMessage('An error occurred during login.');
          }
          
          };

    return(
        <div className="container">
          
            <span className='head'><h2>LOGIN</h2></span>
            <br></br>
            <br></br>
            <div className="form-group">
            <label>Employee_id:</label>
            <input type="employee_id" className="form-control" value={employee_id} onChange={(e) => setEmployee_id(e.target.value)} />
            </div>
            <div className="form-group">
            <label>Password:</label>
            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <br></br>
            <div className="form-group d-grid gap-2 col-6 mx-auto">
              <button className="btn btn-success" onClick={handleLogin}>Login</button>
            </div>
            <br/>
            <br />
            <h5>New User?&nbsp;<Link to = "/register">Register</Link></h5>

            
            <br />
            <h5><Link to = "/admin-login">Log in as Admin</Link></h5>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
        
        </div>
    );
};

export default Login;