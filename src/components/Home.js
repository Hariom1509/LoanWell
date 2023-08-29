import React from "react";
import bgVideo from "../assets/bgVideo.mp4";

const Home = () => {
    return (
        // <>
        //     <div className="col align-content-center align-middle">
        //         <h1>LoanWell</h1>
        //     </div>
        // </>

        <div>
            <div style={{position:'relative', width:'auto', height:'100vh', overflow:'hidden', overflowY:'hidden', left: '-1%'}}>
                <video src={bgVideo} autoPlay loop muted />
                <div className="content" style={{position:'absolute', top:'50%', left:'40%', transform:'translate(-50%, -50%)', textAlign:'center', color:'white'}}>
                        <i class="fs-1 bi-coin"></i>
                        <h1>
                            LoanWell
                        </h1>
                        <h3>
                            Your path to financial freedom starts here.
                        </h3>
                        <p>
                            Explore our comprehensive Loan Management System designed to simplify your borrowing experience.
                        </p>
                </div>
            </div>
        </div>

        
    )
}

export default Home;