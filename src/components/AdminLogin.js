import React, { useState } from "react";
import { useNavigate } from "react-router";
import AuthenticationService from "../service/AuthenticationService";
import '../style/Login.css';
import { Link } from "react-router-dom";

const AdminLogin = () => {

    const history = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async () => {
        if (!email || !password) {
          setErrorMessage('Please enter both email and password.');
          return;
        }
    
        const employee = {
          email,
          password
        };

        try {
            const loginSuccess = await AuthenticationService.login(employee);
            console.log('API response:', loginSuccess.data); // Add this line
            if (loginSuccess) {
              setSuccessMessage('Login successful. Redirecting...');
              setTimeout(() => {
                history('/admin-dashboard'); // navigates to product Component
              }, 0);
            } else {
              setErrorMessage('Invalid email or password.');
            }
          } catch (error) {
            console.error('Login error', error);
            setErrorMessage('An error occurred during login.');
          }
          
          };

    return(
        <div className="container">
          
            <span className='head'><h2>ADMIN LOGIN</h2></span>
            <br></br>
            <br></br>
            <div className="form-group">
            <label>Email:</label>
            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="form-group">
            <label>Password:</label>
            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <br></br>
            <div className="form-group d-grid gap-2 col-6 mx-auto">
              <button className="btn btn-success" onClick={handleLogin}>Login</button>
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
        
        </div>
    );
};

export default AdminLogin;