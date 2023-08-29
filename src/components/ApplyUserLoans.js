import React from "react";
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/ApplyUserLoan.css';
import { toBeEmptyDOMElement } from "@testing-library/jest-dom/matchers";

const ApplyUserLoans = () => {


    const [employee_id, setEmployee_id] = useState(sessionStorage.getItem('id'));
    const [allLoans,setAllLoans] = useState([]);
    const [allItems,setAllItems] = useState([]);

    const [allLoanCategories,setAllLoanCategories] = useState([]);
    const [allMake,setAllMake] = useState([]);

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    
    
    const [item_category, setItem_category] = useState('');
    const [item_description, setItem_description] = useState('');
    const [item_value, setItem_value] = useState('');
    const [item_make, setItem_make] = useState('');
    const [duration_in_years, setDuration_in_years] = useState('');
    const [isPending, setIsPending] = useState(false);
    const history = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsPending(true);
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length === 0) {
            let [itemValue] = allItems.filter(function(el){return el.item_category === item_category && el.item_make === item_make && el.item_description === item_description}).map(item => item.item_valuation);
            const contactFormSubmit = { employee_id, item_category, item_make, item_description, item_valuation:itemValue, duration_in_years };
            console.log(contactFormSubmit);
            try {
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
                    })

            } catch (error) {
                console.error('Apply Loan error', error);
                setSuccessMessage('An error occurred during applying for loan.');
            }
        } else {
            setIsPending(false);
            setErrors(validationErrors);
        }
    }
    const validateForm = () => {
        let validationErrors = {};
        if (!item_category) {
            validationErrors.item_category = 'Item Category is required.';
        }
        if (!item_make) {
            validationErrors.item_make = 'Item Make is required.';
        }
        if (!item_description) {
            validationErrors.item_description = 'Item Description is required.';
        }
        if (!duration_in_years) {
            validationErrors.duration_in_years = 'Loan Duration is required.';
        }

        return validationErrors;
    };

    useEffect(() => {
        fetchData();
      }, []);

      const fetchData = async () => {
        let tempAllLoans = await fetchAllLoans();
        let tempAllItems = await fetchAllItems();
        setAllLoans(tempAllLoans);
        setAllItems(tempAllItems);
        setAllLoanCategories([...new Set(tempAllLoans.map(l => l.loan_type))]);
        let tempMake = (() => tempAllItems.reduce((result, { item_make, item_category }) => ({ ...result, [item_category]: [...new Set([...(result[item_category] || []), item_make])] }), {}))
        setAllMake(
              Object.entries(
                tempAllItems.reduce((acc, { item_make, item_category }) => ({
                  ...acc,
                  [item_category]: [...new Set([...(acc[item_category] || []), item_make])]
                }), {})
              ).map(([category, makes]) => ({ item_category: category, item_makes: makes }))
          );
    }  

      const fetchAllLoans = async () =>{
        try {
            let response = await fetch('http://localhost:8085/lms/api/loans')
            .then(res => {
                console.log(res);
                if(!res.ok){
                    throw Error('could not fetch the data for that resource');
                }

                return res.json()
            })
            return response;
        } catch (error) {
            alert('An error occurred during fetching loans.');  
        }
    }

    const fetchAllItems = async () =>{
        try {
            let response= await 
            fetch('http://localhost:8085/lms/api/items')
            .then(res => {
                console.log(res);
                if(!res.ok){
                    throw Error('could not fetch the data for that resource');
                }
                return res.json()
            })
            return response;
        } catch (error) {
            alert('An error occurred during fetching items.');  
        }
    }

    return (
        <div className="create">
            {/* {console.log("Items"+JSON.stringify(allItems))}
            {console.log("Loans"+JSON.stringify(allLoans))}
            {console.log("Categories"+JSON.stringify(allLoanCategories))}
            {console.log("Duration"+duration_in_years)}
            {console.log("Make"+JSON.stringify(allMake))}
            {console.log("Category"+item_category)} */}

            <h2 className="col-9 mx-auto">Select Product and Apply for Loan</h2>
            <form action="" onSubmit={handleSubmit}>
                <div className="form-group col-9 mx-auto">
                <label htmlFor="">Employee id</label>
                <input type="text"
                    required
                    disabled
                    value={employee_id}
                    onChange={(e) => setEmployee_id(e.target.value)}
                />

                <label htmlFor="">Item Category</label>
                <select required onChange={(e)=>setItem_category(e.target.value)}>
                    <option>Select Category</option>
                    { allLoanCategories.map(category => { 
                        return <option value={category}>
                            {category}</option>;
                        })
                    }
                </select>
                {errors.item_category && <p className="error-message">{errors.item_category}</p>}

                <label htmlFor="">Item Make</label>
                 <select required onChange={(e)=>setItem_make(e.target.value)}>
                    <option>Select Item Make</option>
                    { item_category && allMake.filter(function(el){return el.item_category === item_category})[0].item_makes.map(make => { 
                                return <option value={make}>
                                {make}</option>;
                        })    
                    }
                </select>
                {errors.item_make && <p className="error-message">{errors.item_make}</p>}

                <label htmlFor="">Item Description</label>
                <select required onChange={(e) => setItem_description(e.target.value)}>
                    <option>Select Item Description</option>
                    { item_make && allItems.filter(function(el){return el.item_category === item_category && el.item_make === item_make}).map(item => { 
                                return <option value={item.item_description}>
                                {item.item_description}</option>;
                        })    
                    }
                </select>
                {errors.item_description && <p className="error-message">{errors.item_description}</p>}


                <label htmlFor="">Loan Duration in Years</label>
                <select required onChange={(e) => setDuration_in_years(e.target.value)}>
                    <option>Select Duration</option>
                    {item_category &&
                        allLoans.filter(function(el){return el.loan_type === item_category}).map(loan => {
                            return(
                                <option value={loan.duration_in_years}>{loan.duration_in_years}</option>
                            )
                        })
                    }
                </select>
                {errors.duration_in_years && <p className="error-message">{errors.duration_in_years}</p>}

                
                <label htmlFor="">Item value</label>
                
                <input type="number"
                    required
                    disabled
                    value={
                        (item_description?allItems.filter(function(el){return el.item_category === item_category && el.item_make === item_make && el.item_description === item_description}).map(item => item.item_valuation):0)
                    }
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
                </div>
                </div>
            </form>

        </div>
    );


};

export default ApplyUserLoans;





