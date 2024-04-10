// pages/index.js - main route
import React from 'react'; 
import Link from 'next/link'; 

const IndexPage = () => {
    return (
        <div> 
            <h1>Empower Your Plants</h1>
            <h2>This is the landing page.</h2> 
            <h3>
                <Link href="/products"> 
                    Go to Products Page
                </Link>
            </h3>
        </div> 
    );
};

export default IndexPage;
