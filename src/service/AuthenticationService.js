import axios from 'axios';

/*
  Axios, which is a popular library is mainly used to send asynchronous 
  HTTP requests(GET,POST,PUT,DELETE) to REST endpoints. 
This library is very useful to perform CRUD operations.
This popular library is used to communicate with the backend. 
Axios supports the Promise API, native to JS ES6.
Using Axios we make API requests in our application. 
Once the request is made we get the data in Return, and then we use this data in our React APPL. 

> npm install axios

*/
// Service class interacts with REST API

/* To Make RESTAPI  (Spring Boot App) calls we will be using axios.
> npm install axios
*/

const API_URL='http://localhost:8085/lms/api/';
class AuthenticationService{
    /*
        The async function declaration creates a binding of a new async function to a given name. 
    The await keyword is permitted within the function body, enabling asynchronous, promise-based behavior 
    to be written in a cleaner style and avoiding the need to explicitly configure promise chains.
    They are not coordinated with each other, meaning they could occur simultaneously or not 
    because they have their own separate agenda.   
    */ 

    static async registerEmployee(employee) {
        try {
          const response = await axios.post('http://localhost:8085/lms/api/register', employee);
          console.log(employee) // Adjust the API endpoint
          return response.data;
        } catch (error) {
          console.error('Registration error', error);
          throw new Error('An error occurred during registration.');
        }
      }
      
    static async login(employee) {
        try {
        const response = await axios.post('http://localhost:8085/lms/api/login', employee);
        console.log('SAPI response:', response.data +"Hello"+response.data.success); 
        if (response.data === true) {
            // Call the setSessionAttribute method to store the session token or user info
            // this.setSessionAttribute('sessionToken', response.data.sessionToken); // Adjust as needed
            return true; // Return true for successful login
        } else {
            return false; // Return false for unsuccessful login
        }
        } catch (error) {
        console.error('Login error', error);
        throw new Error('An error occurred during login.');
        }
    }

    static async getUser(employee) {
      try {
        const response = await axios.get('http://localhost:8085/lms/api/employees/'+employee.employee_id,employee.employee_id);
        console.log('SAPI response:', response.data +"Hello"+response.data.success); 
        if (response.data) {
            console.log("Employee Name"+response.data.employee_name);
            console.log(response.data.employee_id+response.data.employee_name+response.data.department+response.data.designation)
              localStorage.setItem('id', response.data.employee_id);
              localStorage.setItem('name', response.data.employee_name);
              localStorage.setItem('dept', response.data.department);
              localStorage.setItem('design', response.data.designation);
            // Call the setSessionAttribute method to store the session token or user info
            // this.setSessionAttribute('sessionToken', response.data.sessionToken); // Adjust as needed
            return response.data; // Return true for successful login
        } else {
            return false; // Return false for unsuccessful login
        }
        } catch (error) {
        console.error('Login error', error);
        throw new Error('An error occurred during login.');
        }
    }

}
// Create a Object
export default AuthenticationService;