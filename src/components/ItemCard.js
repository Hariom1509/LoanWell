import React from "react";
import itemCard from "../data/itemCard.json";


const ItemCard = () => {

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
                {itemCard.map(item => {
                    return(
                    <tr key={item.item_id}>
                        <td>{item.item_id}</td>
                        <td>{item.description}</td>
                        <td>{item.item_make}</td>
                        <td>{item.item_category}</td>
                        <td>{item.item_valuation}</td>
                        <td><button type="button" class="btn btn-warning btn-sm">Edit</button></td>
                        <td><button type="button" class="btn btn-danger btn-sm">Delete</button></td>
                    </tr>)
                })}
                
            </tbody>
            </table>
        </div>
    );
};

export default ItemCard;