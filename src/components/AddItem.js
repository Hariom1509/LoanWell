import React from "react";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import makeForType from "../data/makeForType.json";
import loanCardData from "../data/loanCard.json";

import '../style/AddItem.css';


const AddItem = () => {

    const [itemCategory, setItemCategory] = useState('');
    const [itemDescription, setItemDescription] = useState('');
    const [itemValue, setItemValue] = useState(0);
    const [itemMake, setItemMake] = useState('');

    const [errors, setErrors] = useState({});


    const [isPending, setIsPending] = useState(false);
    const history = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsPending(true);
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length == 0) {
            const addItemForm = { item_category: itemCategory, item_description: itemDescription, item_valuation: itemValue, item_make: itemMake };
            console.log(addItemForm);
            try {
                fetch('http://localhost:8085/lms/api/items', {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(addItemForm)
                }).then(() => {
                    console.log('new item added');
                    setIsPending(false);
                    alert("Redirecting to item list...");
                    history('/viewItems');

                })
            } catch (error) {
                console.error('Registration item error', error);
                alert('An error occurred during adding item.');
                setIsPending(false);
            }
        } else {
            setErrors(validationErrors);
            setIsPending(false);
        }

    }
    const validateForm = () => {
        let validationErrors = {}

        if (!itemCategory) {
            validationErrors.itemCategory = 'Item Category is required';
        }
        if (!itemDescription) {
            validationErrors.itemDescription = 'Item Description is required';
        }
        if (!itemMake) {
            validationErrors.itemMake = 'Item Make is required';
        }
        if (!itemValue) {
            validationErrors.itemValue = 'Item Value is required';
        }

        return validationErrors;
    };

    useEffect(() => {
        itemCategory === '' ? setItemCategory(loanCardData[0].loan_type) : setItemCategory(itemCategory);
    }, [itemCategory]);


    return (
        <div className="create">
            <h2 className="col-9 mx-auto">Add Item Master Data Details</h2>
            <form action="" onSubmit={handleSubmit}>
            <div className="form-group col-9 mx-auto">
                <label htmlFor="">Item Category</label>
                <select className="form-control" onChange={(e) => setItemCategory(e.target.value)}>
                    {loanCardData.map(items => {
                        return <option value={items.loan_type}>
                            {items.loan_type}</option>;
                    })
                    }
                </select>
                {errors.itemCategory && <p className="error-message">{errors.itemCategory}</p>}

                <label htmlFor="">Item Description</label>
                <input type="text"
                    
                    value={itemDescription}
                    onChange={(e) => setItemDescription(e.target.value)}
                />
                {errors.itemDescription && <p className="error-message">{errors.itemDescription}</p>}

                <label htmlFor="">Item value</label>
                <input type="number"
                    min="0"
                    className="form-control"
                    value={itemValue}
                    onChange={(e) => setItemValue(e.target.value)}
                />
                {errors.itemValue && <p className="error-message">{errors.itemValue}</p>}

                <label htmlFor="">Item Make</label>
                {itemCategory && <>


                    <select className="form-control" onChange={(e) => setItemMake(e.target.value)}>
                        <option>Select Value</option>
                        {makeForType.filter(function (el) { return el.type === itemCategory })[0].make.map(items => {
                            return <option value={items}>
                                {items}</option>;
                        })
                        }
                    </select>
                    {errors.itemMake && <p className="error-message">{errors.itemMake}</p>}

                </>}

                {!isPending && <button>Add Item</button>}
                {isPending && <button disabled>Adding...</button>}
                </div>
            </form>

        </div>
    );


};

export default AddItem;





