import React,{useState, useEffect} from "react";
import itemCard from "../data/itemCard.json";
import useFetch from "../service/useFetch";


const ItemCard = () => {

    const [allItems,setAllItems] = useState([]);

    

    useEffect(() => {  // reactHook - Runs only once on the firts Render
        fetchItems();
    }, []);

    const fetchItems = () =>{
        try {
            fetch('http://localhost:8085/lms/api/items')
            .then(res => {
                console.log(res);
                if(!res.ok){
                    throw Error('could not fetch the data for that resource');
                }
                return res.json()
            })
            .then(data =>{
                console.log(data);
                setAllItems(data);
            })
        } catch (error) {
            alert('An error occurred during fetching items.');  
        }
    }

    const deleteItem = (id) => {
        try {
            fetch('http://localhost:8085/lms/api/items/'+id, {
                method: 'DELETE',
                headers: { "Content-Type": "application/json" }
            }).then(() => {
                console.log('Item Deleted');
                fetchItems();
                alert("Item Deleted");
            })
        } catch (error) {
            alert('An error occurred during deleting item.');  
        }
    };

    return(
        <div className="container">
            <h2 className="head"> Item Data</h2>
            <br />
            <table class="table table-dark table-striped">
            <thead>
                <tr>
                    <th scope="col">Item Id</th>
                    <th scope="col">Description</th>
                    <th scope="col">Item Make</th>
                    <th scope="col">Item Category</th>
                    <th scope="col">Item Valuation</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Delete</th>
                </tr>
            </thead>
            <tbody>
                {allItems && allItems.map(item => {
                    return(
                    <tr key={item.item_id}>
                        <td>{item.item_id}</td>
                        <td>{item.item_description}</td>
                        <td>{item.item_make}</td>
                        <td>{item.item_category}</td>
                        <td>{item.item_valuation}</td>
                        <td><button type="button" class="btn btn-warning btn-sm">Edit</button></td>
                        <td><button type="button" class="btn btn-danger btn-sm" onClick={() => deleteItem(item.item_id)}>Delete</button></td>
                    </tr>)
                })}
                
            </tbody>
            </table>
        </div>
    );
};

export default ItemCard;