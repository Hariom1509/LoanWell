import React from "react";
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import loanCardData from "../data/loanCard.json";

import '../style/AddItem.css';


const AddLoan = () => {

    const [loanCategory, setLoanCategory] = useState('');
    const [loanDuration, setLoanDuration] = useState('');
      
    const [isPending, setIsPending] = useState(false);
    const history = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const contactFormSubmit = { loanCategory, loanDuration };
        console.log(contactFormSubmit);

        setIsPending(true);
        fetch('https://krishi-charcha.herokuapp.com/addInquiry', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(contactFormSubmit)
        }).then(() => {
            console.log('new inquiry added');
            alert("Thank You! You will recieve email in next 24 hours");
            setIsPending(false);
            // history.go(-1);
            // history.push('/');
        })


        history.go(-1);
    }

    useEffect(() => {
        loanCategory===''?setLoanCategory(loanCardData[0].loan_type):setLoanCategory(loanCategory);
      },[loanCategory]);


    return (
        <div className="create">
            <h2>Add Loan Master Data Details</h2>
            <form action="" onSubmit={handleSubmit}>
                
                <label htmlFor="">Loan Category</label>
                <select required onChange={(e)=>setLoanCategory(e.target.value)}>
                    { loanCardData.map(items => { 
                        return <option value={items.loan_type}>
                            {items.loan_type}</option>;
                        })
                    }
                </select>
                <label htmlFor="">Loan Duration in Years</label>
                <input type="number"
                    required
                    value={setLoanDuration}
                    onChange={(e) => setLoanDuration(e.target.value)}
                    min="1"
                    max='5'
                />
    
                {!isPending && <button>Send Message</button>}
                {isPending && <button disabled>Sending...</button>}
            </form>

        </div>
    );


};

export default AddLoan;





