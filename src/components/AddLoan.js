import React from "react";
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import loanCardData from "../data/loanCard.json";

import '../style/AddItem.css';


const AddLoan = () => {

    const [loanType, setLoanType] = useState('');
    const [loanDuration, setLoanDuration] = useState('');
      
    const [isPending, setIsPending] = useState(false);
    const history = useNavigate();

    const [errors,setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsPending(true);
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length == 0) {
            const addLoanForm = { loan_type: loanType,duration_in_years: loanDuration };
            try {
                fetch('http://localhost:8085/lms/api/loans', {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(addLoanForm)
                }).then(() => {
                    console.log('new loan added');
                    setIsPending(false);
                    alert("Redirecting to loan list...");
                    history('/viewLoans1');

                })
            } catch (error) {
                console.error('Registration loan error', error);
                alert('An error occurred during adding loan.');
                setIsPending(false);
            }
        }else{
            setErrors(validationErrors);
            setIsPending(false);
        }
    }

    useEffect(() => {
        loanType===''?setLoanType(loanCardData[0].loan_type):setLoanType(loanType);
      },[loanType]);
      
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
            <h2 className="col-9 mx-auto">Add Loan Master Data Details</h2>
            <form action="" onSubmit={handleSubmit}>
            <div className="form-group col-9 mx-auto">
                <label htmlFor="">Loan Type</label>
                <select className="form-control" onChange={(e)=>setLoanType(e.target.value)}>
                    { loanCardData.map(items => { 
                        return <option value={items.loan_type}>
                            {items.loan_type}</option>;
                        })
                    }
                </select>
                {errors.loanType && <p className="error-message">{errors.loanType}</p>}

                <label htmlFor="">Loan Duration (in Years)</label>
                <input type="number"
                    className="form-control"
                    value={loanDuration}
                    onChange={(e) => setLoanDuration(e.target.value)}
                    min="1"
                    max='5'
                />
                {errors.loanDuration && <p className="error-message">{errors.loanDuration}</p>}

    
                {!isPending && <button>Add Loan</button>}
                {isPending && <button disabled>Adding...</button>}
                </div>
            </form>

        </div>
    );


};

export default AddLoan;