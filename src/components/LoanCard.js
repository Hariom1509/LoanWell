import React,{useState,useEffect} from "react";
import loanCard from "../data/loanCard.json";
import { useNavigate } from "react-router-dom";
import AuthenticationService from "../service/AuthenticationService";


const LoanCard = () => {

    const [allLoans,setAllLoans] = useState([]);

    const history=useNavigate();

    useEffect(() => {

        if(!AuthenticationService.isLoggedIn()){
            history('/');
        } else {
            sessionStorage.getItem('name');
            sessionStorage.getItem('id');
            
            fetchItems();
        }
    },[]);

    const fetchItems = () =>{
        try {
            fetch('http://localhost:8085/lms/api/loans')
            .then(res => {
                console.log(res);
                if(!res.ok){
                    throw Error('could not fetch the data for that resource');
                }
                return res.json()
            })
            .then(data =>{
                console.log(data);
                setAllLoans(data);
            })
        } catch (error) {
            alert('An error occurred during fetching loans.');  
        }
    }

    const addLoan = () => {
        history('/addLoan');
    }

    const editLoan = (id) => {
        history(`/editLoan/${id}`);
    }

    const deleteLoan = (id) => {
        try {
            fetch('http://localhost:8085/lms/api/loans/'+id, {
                method: 'DELETE',
                headers: { "Content-Type": "application/json" }
            }).then(() => {
                console.log('Loan Deleted');
                fetchItems();
                alert("Loan Deleted");
            })
        } catch (error) {
            alert('An error occurred during deleting loan.');  
        }
    };
    return(
        <div className="container">
            <h2 className="head"> Loan Data</h2>
            <br />
            <div className="row justify-content-center">
                <button className="btn btn-info w-auto" onClick={addLoan}>Add Loan</button>
            </div >
            <br/>
            <div className="table-responsive">
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
                {allLoans.map(loan => {
                    return(
                    <tr key={loan.loan_id}>
                        <td>{loan.loan_id}</td>
                        <td>{loan.loan_type}</td>
                        <td>{loan.duration_in_years}</td>
                        <td><button type="button" class="btn btn-warning btn-sm" onClick={() => editLoan(loan.loan_id)}>Edit</button></td>
                        <td><button type="button" class="btn btn-danger btn-sm" onClick={() => deleteLoan(loan.loan_id)}>Delete</button></td>
                    </tr>)
                })}
                
            </tbody>
            </table>
            </div>
        </div>
    );
};

export default LoanCard;