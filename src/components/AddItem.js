import React from "react";
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import makeForType from "../data/makeForType.json";
import loanCardData from "../data/loanCard.json";

import '../style/AddItem.css';


const AddItem = () => {

    const [itemCategory, setItemCategory] = useState('');
    const [itemDescription, setItemDescription] = useState('');
    const [itemValue, setItemValue] = useState(0);
    const [itemMake, setItemMake] = useState('');
   
    const [isPending, setIsPending] = useState(false);
    const history = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const contactFormSubmit = { itemCategory, itemDescription, itemValue, itemMake };
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
        itemCategory===''?setItemCategory(loanCardData[0].loan_type):setItemCategory(itemCategory);
      },[itemCategory]);


    return (
        <div className="create">
            <h2>Add Item Master Data Details</h2>
            <form action="" onSubmit={handleSubmit}>
                
                <label htmlFor="">Item Category</label>
                <select required onChange={(e)=>setItemCategory(e.target.value)}>
                    { loanCardData.map(items => { 
                        return <option value={items.loan_type}>
                            {items.loan_type}</option>;
                        })
                    }
                </select>
                <label htmlFor="">Item Description</label>
                <input type="text"
                    required
                    value={setItemDescription}
                    onChange={(e) => setItemDescription(e.target.value)}
                />
                <label htmlFor="">Item value</label>
                <input type="text"
                    required
                    value={itemValue}
                    onChange={(e) => setItemValue(e.target.value)}
                />
                <label htmlFor="">Item Make</label>
                {itemCategory!==''?
                 <select required >
                    { makeForType.filter(function(el){return el.type === itemCategory})[0].make.map(items => { 
                        return <option value={items}>
                            {items}</option>;
                        })
                    }
                </select> : "hello"}
                
                {!isPending && <button>Send Message</button>}
                {isPending && <button disabled>Sending...</button>}
            </form>

        </div>
    );


};

export default AddItem;





