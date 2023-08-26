import React from "react";
import { useState,useEffect } from 'react';
import { useNavigate,useParams } from 'react-router-dom';
import loanCardData from "../data/loanCard.json";

import '../style/AddItem.css';


const EditLoan = () => {

    const [loanType, setLoanType] = useState('');
    const [loanDuration, setLoanDuration] = useState('');
      
    const [isPending, setIsPending] = useState(false);
    const history = useNavigate();

    const id = useParams();

    const [errors,setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsPending(true);
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length == 0) {
            const addLoanForm = { loan_type: loanType,duration_in_years: loanDuration };
            try {
                fetch('http://localhost:8085/lms/api/loans/'+id["id"], {
                    method: 'PUT',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(addLoanForm)
                }).then(() => {
                    console.log('old loan edited');
                    setIsPending(false);
                    alert("Redirecting to loan list...");
                    history('/viewLoans1');

                })
            } catch (error) {
                console.error('Edit loan error', error);
                alert('An error occurred during editing loan.');
                setIsPending(false);
            }
        }else{
            setErrors(validationErrors);
            setIsPending(false);
        }
    }

    useEffect(() => {
        try {
            fetch('http://localhost:8085/lms/api/loans/'+id["id"])
            .then(res => {
                console.log(res);
                if(!res.ok){
                    throw Error('could not fetch the data for that resource');
                }
                return res.json()
            })
            .then(data =>{
                setLoanType(data.loan_type);
                setLoanDuration(data.duration_in_years);
                
            })
        } catch (error) {
            alert('An error occurred during fetching items.');  
        }
    },[]);
      
      const validateForm = () => {
        let validationErrors = {}

        if (!loanType) {
            validationErrors.loanType = 'Loan Type is required';
        }
        if (!loanDuration) {
            validationErrors.loanDuration = 'Loan Duration is required';
        }else if(loanDuration>5){
            validationErrors.loanDuration = 'Loan Duration should be less than 6';
        }

        return validationErrors;
    };

    return (
        <div className="create">
            <h2>Add Loan Master Data Details</h2>
            <form action="" onSubmit={handleSubmit}>
                
                <label htmlFor="">Loan Type</label>
                <select  onChange={(e)=>setLoanType(e.target.value)}>
                    { loanCardData.map(items => { 
                        return <option  selected={items.loan_type===loanType} value={items.loan_type}>
                            {items.loan_type}</option>;
                        })
                    }
                </select>
                {errors.loanType && <p className="error-message">{errors.loanType}</p>}

                <label htmlFor="">Loan Duration in Years</label>
                <input type="number"
                    
                    value={loanDuration}
                    onChange={(e) => setLoanDuration(e.target.value)}
                    min="1"
                    max='5'
                />
                {errors.loanDuration && <p className="error-message">{errors.loanDuration}</p>}

    
                {!isPending && <button>Edit Loan</button>}
                {isPending && <button disabled>Editing...</button>}
            </form>

        </div>
    );


};

export default EditLoan;





