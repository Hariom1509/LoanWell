import React from "react";
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/ApplyUserLoan.css';
import loanCardData from "../data/loanCard.json";
import makeForType from "../data/makeForType.json";

const ApplyUserLoans = () => {

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [details, setDetails] = useState('');
    const [isPending, setIsPending] = useState(false);
    const history = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const contactFormSubmit = { firstname, lastname, email, message, details };
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


        // history.go(-1);
    }

    useEffect(() => {
        lastname===''?setLastname(loanCardData[0].loan_type):setLastname(lastname);
      },[lastname]);


    return (
        <div className="create">
            <h2>Select Product and Apply for Loan</h2>
            <form action="" onSubmit={handleSubmit}>
                <label htmlFor="">Employee id</label>
                <input type="text"
                    required
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                />
                <label htmlFor="">Item Category</label>
                {/* <input type="text"
                    required
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                /> */}
                <select required onChange={(e)=>setLastname(e.target.value)}>
                    { loanCardData.map(items => { 
                        return <option value={items.loan_type}>
                            {items.loan_type}</option>;
                        })
                    }
                </select>
                {/* dropdown1 ={this.state.dropdown1} */}
                <label htmlFor="">Item Description</label>
                <input type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="">Item value</label>
                <input type="text"
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <label htmlFor="">Item Make</label>
                {lastname!==''?
                 <select required >
                    { makeForType.filter(function(el){return el.type === lastname})[0].make.map(items => { 
                        return <option value={items}>
                            {items}</option>;
                        })
                    }
                </select> : "hello"}
                {/* <textarea
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                ></textarea> */}
                {!isPending && <button>Apply Loan</button>}
                {isPending && <button disabled>Sending...</button>}
                {/* <p>{title}</p>
                <p>{body}</p>
                <p>{author}</p> */}
                <div>
                    {console.log(makeForType.filter(function(el){return el.type === "Furniture"})[0].make)}
                    {console.log(lastname)}
                </div>
            </form>

        </div>
    );


};

export default ApplyUserLoans;





