import React from "react";
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/ApplyUserLoan.css';
import loanCardData from "../data/loanCard.json";
import makeForType from "../data/makeForType.json";

const ApplyUserLoans = () => {

    const [employee_id, setEmployee_id] = useState('');
    const [item_category, setItem_category] = useState('');
    const [item_description, setItem_description] = useState('');
    const [item_value, setItem_value] = useState('');
    const [item_make, setItem_make] = useState('');
    const [duration_in_years, setDuration_in_years] = useState('');
    const [isPending, setIsPending] = useState(false);
    const history = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const contactFormSubmit = { employee_id, item_category, item_make, item_description, item_value, duration_in_years };
        console.log(contactFormSubmit);

        setIsPending(true);
        fetch('http://localhost:8085/lms/api/employees/'+employee_id+'/applyloan', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(contactFormSubmit)
        }).then(() => {
            console.log('new loan added');
            alert("Thank You for applying for a loan");
            setIsPending(false);
            setTimeout(() => {
                history('/dashboard');
            },0);
            // history.go(-1);
            // history.push('/');
        })


        // history.go(-1);
    }

    useEffect(() => {
        item_category===''?setItem_category(loanCardData[0].loan_type):setItem_category(item_category);
      },[item_category]);


    return (
        <div className="create">
            <h2>Select Product and Apply for Loan</h2>
            <form action="" onSubmit={handleSubmit}>
                <label htmlFor="">Employee id</label>
                <input type="text"
                    required
                    value={employee_id}
                    onChange={(e) => setEmployee_id(e.target.value)}
                />
                <label htmlFor="">Item Category</label>
                {/* <input type="text"
                    required
                    value={item_category}
                    onChange={(e) => setItem_category(e.target.value)}
                /> */}
                <select required onChange={(e)=>setItem_category(e.target.value)}>
                    { loanCardData.map(items => { 
                        return <option value={items.loan_type}>
                            {items.loan_type}</option>;
                        })
                    }
                </select>
                {/* dropdown1 ={this.state.dropdown1} */}
                <label htmlFor="">Item Description</label>
                <input type="text"
                    required
                    value={item_description}
                    onChange={(e) => setItem_description(e.target.value)}
                />
                <label htmlFor="">Item value</label>
                <input type="number"
                    required
                    value={item_value}
                    onChange={(e) => setItem_value(e.target.value)}
                />
                <label htmlFor="">Item Make</label>
                {item_category!==''?
                 <select required onChange={(e)=>setItem_make(e.target.value)}>
                    { makeForType.filter(function(el){return el.type === item_category})[0].make.map(items => { 
                        return <option value={items}>
                            {items}</option>;
                        })
                    }
                </select> : "hello"}

                <label htmlFor="">Loan Duration in Years</label>
                <input type="number"
                    
                    value={duration_in_years}
                    onChange={(e) => setDuration_in_years(e.target.value)}
                    min="1"
                    max='5'
                />

                {/* <textarea
                    value={item_make}
                    onChange={(e) => setItem_make(e.target.value)}
                ></textarea> */}
                {!isPending && <button>Apply Loan</button>}
                {isPending && <button disabled>Sending...</button>}
                {/* <p>{title}</p>
                <p>{body}</p>
                <p>{author}</p> */}
                <div>
                    {console.log(makeForType.filter(function(el){return el.type === "Furniture"})[0].make)}
                    {console.log(item_category)}
                </div>
            </form>

        </div>
    );


};

export default ApplyUserLoans;





