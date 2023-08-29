import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import AuthenticationService from "../service/AuthenticationService";


const ViewAllLoans = () => {
    const [items, setItems] = useState([]);
    const [user, setUser] = useState(sessionStorage.getItem('id'));

    const [allIssuedLoan,setAllIssuedLoan] = useState([]); 
    const [allIssuedItem,setAllIssuedItem] = useState([]); 
    const [allApplied,setAllApplied] = useState([]);

    const history=useNavigate();

    useEffect(() => {
        // setUser(localStorage.getItem('id'));

        if(!AuthenticationService.isLoggedIn()){
            history('/');
        } else {
            sessionStorage.getItem('name');
            sessionStorage.getItem('id');
            fetchData();
        }
    },[]);

    const fetchData = async ()=>{
        let tempAllIssuedLoan = await fetchAllIssuedLoan();
        let tempAllIssuedItem = await fetchAllIssuedItem();
        console.log(tempAllIssuedLoan);
        console.log(tempAllIssuedItem);
        setAllApplied(mergeArrayObjects(tempAllIssuedLoan,tempAllIssuedItem));
        // setAllIssuedLoan(tempAllIssuedLoan);
        // setAllIssuedItem(tempAllIssuedItem);


    }
    const fetchAllIssuedLoan = async () =>{
        try {
            let response = await fetch('http://localhost:8085/lms/api/loancards')
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

    const fetchAllIssuedItem = async () =>{
        try {
            let response = await fetch('http://localhost:8085/lms/api/itemcards')
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
    function mergeArrayObjects(arr1,arr2){
        return arr1.map((item,i)=>{
           if(item.lc_issue_id === arr2[i].issue_id){
               //merging two objects
             return Object.assign({},item,arr2[i])
           }
        })
      }
      
    const handleRawLoan = (eid,lc_issued_id,issue_id,status) =>{
        let data = {"eid":eid,"lc_issue_id":lc_issued_id,"issue_id":issue_id};
        let url = 'http://localhost:8085/lms/api/employees/'+eid;
        if(status==1){
            url+='/sanctioned';
        }else{
            url+='/rejected';
        }
        try {
            
            fetch(url, {
                method: 'PUT',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
                
            }).then(() => {
                console.log('Sanctioned/Rejected');
                alert(status==1?("Sanctioned"):"Rejected");
                fetchData();
            })

        } catch (error) {
            console.error('Error while sanction/reject', error);
        }
    }
    const handleSanctioned = (eid,lc_issued_id,issue_id,status) =>{
        let data = {"eid":eid,"lc_issue_id":lc_issued_id,"issue_id":issue_id};
        let url = 'http://localhost:8085/lms/api/employees/'+eid+'/paidback';
        
        try {
            
            fetch(url, {
                method: 'PUT',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
                
            }).then(() => {
                console.log('Paidback');
                alert("Loan Paidback");
                fetchData();
            })

        } catch (error) {
            console.error('Error while paying back', error);
        }
    }



    return(
        <div className="container">
            <h2 className="head">View All loans</h2>
            <br />
            <div className="table-responsive">
            <table class="table table-dark table-striped">
            <thead>
                <tr>
                <th scope="col">Issue ID</th>
                <th scope="col">Employee ID</th>
                <th scope="col">Loan ID</th>
                <th scope="col">Item ID</th>
                <th scope="col">Applied Date</th>
                <th scope="col">Return Date</th>
                <th colspan="2" scope="col" style={{"textAlign":"center"}}>Action</th>
                
                </tr>
            </thead>
            <tbody>
                {/* {console.log(allApplied)} */}
                {allApplied.map(card => {
                    return(
                    <tr key={card.issue_id}>
                        <th scope="row">{card.issue_id}</th>
                        <td>{card.employee_id}</td>
                        <td>{card.loan_id}</td>
                        <td>{card.item_id}</td>
                        <td>{card.card_issue_date}</td>
                        <td>{card.return_date}</td>
                        {!card.issued &&
                            <>
                            <td><button type="button" class="btn btn-success btn-sm" onClick={() => handleRawLoan(card.employee_id,card.lc_issue_id,card.issue_id,1)}>Sanction</button></td>
                            <td><button type="button" class="btn btn-danger btn-sm" onClick={() => handleRawLoan(card.employee_id,card.lc_issue_id,card.issue_id,-1)}>Reject</button></td>
                            </>
                        }
                        {/* onClick={() => editItem(item.item_id)} */}
                        {/* onClick={() => deleteItem(item.item_id)} */}
                        { card.issued==1 && !card.paidback &&
                            <td colspan="2" style={{"textAlign":"center"}}  onClick={() => handleSanctioned(card.employee_id,card.lc_issue_id,card.issue_id,1)}><button type="button" class="btn btn-info btn-sm" >Payback</button></td>
                        }
                        { card.issued==1 && card.paidback==1 &&
                            <td colspan="2" style={{"textAlign":"center"}}><button disabled type="button" class="btn btn-success btn-sm">Paidback</button></td>
                        }
                        { card.issued==-1 &&
                            <td colspan="2" style={{"textAlign":"center"}}><button disabled type="button" class="btn btn-danger btn-sm" >Rejected</button></td>
                        }
                    </tr>
                    )
                })}
                
            </tbody>
            </table>
            </div>
        </div>
    );


}

export default ViewAllLoans;