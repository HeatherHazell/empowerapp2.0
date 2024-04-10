import React, { useState, useEffect } from 'react';

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    useEffect(() => {
        fetchProducts();
    }, []);
    const fetchProducts = async () => {
                try {
                    const res = await fetch('/api/getProductPrices');
                    const data = await res.json();
                    setProducts(data);
                } catch (error) {
                    console.error('Error fetching products:', error);
                }
            };
    // const fetchProducts = async () => {
    //     try {
    //         const res = await fetch('/api/products');
    //         const data = await res.json();
    //         // Fetch prices for each product
    //         const productsWithPrices = await Promise.all(
    //             data.map(async product => {
    //                 const priceRes = await fetch(`/api/getProductPrices?id=${product.id}&currency=USD`); // Defaulting to USD for now
    //                 const priceData = await priceRes.json();
    //                 return { ...product, price: priceData.price };
    //             })
    //         );
    //         setProducts(productsWithPrices);
    //     } catch (error) {
    //         console.error('Error fetching products:', error);
    //     }
    // };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    let currentItems = [];
    if (Array.isArray(products) && products.length > 0) {
        currentItems = products.slice(indexOfFirstItem, indexOfLastItem);
    }

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const handleItemsPerPageChange = event => {
        setItemsPerPage(parseInt(event.target.value));
        setCurrentPage(1);
    };

    const totalPages = Math.ceil(products.length / itemsPerPage);

    return (
        <div>
            <h1>All the products!</h1>
            <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
                <option value={10}>10 per page</option>
                <option value={25}>25 per page</option>
                <option value={products.length}>All</option>
            </select>
            <ol start={indexOfFirstItem + 1}>
                {currentItems.map(product => (
                   <li key={product.id}>
                        {product.title} - investment: 
                        {Array.isArray(product.convertedPrices) && product.convertedPrices.map((price, index) => (
                            <span key={index}>
                                 {product.convertedPrices}
                            {index !== product.convertedPrices.length - 1 && ', '}
                       </span>
                   ))}
                   <ul>
                       <li>{product.description}</li>
                   </ul>
                    </li>
                ))}
            </ol>
            <div>
                Page:
                {Array.from({ length: totalPages }, (_, index) => (
                    <button key={index + 1} onClick={() => paginate(index + 1)}>
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};


// import React, { useState, useEffect } from 'react';

// const ProductsPage = () => {

//     const [products, setProducts] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [itemsPerPage, setItemsPerPage] = useState(10);
//     useEffect(() => {
//         fetchProducts();
//     }, []);
//     const fetchProducts = async () => {
//         try {
//             const res = await fetch('/api/products');
//             // const res = await fetch('/api/getProductPrices?productId=all&currency=USD');
//             const data = await res.json();
//             setProducts(data);
//         } catch (error) {
//             console.error('Error fetching products:', error);
//         }
//     };

//     // Calculate the index of the first and last item of the current page
//     const indexOfLastItem = currentPage * itemsPerPage;
//     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    
//     let currentItems = [];
//         if (Array.isArray(products) && products.length > 0) {
//             const indexOfLastItem = currentPage * itemsPerPage;
//             const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//             currentItems = products.slice(indexOfFirstItem, indexOfLastItem);
//         }

//     // Change page - A function paginate to update the current page number when a page button is clicked.
//     const paginate = pageNumber => setCurrentPage(pageNumber);
//     const handleItemsPerPageChange = (event) => {
//         setItemsPerPage(parseInt(event.target.value));
//         setCurrentPage(1); // Reset page to 1 when changing items per page
//     };
//     //Calculating the total number of pages based on the total number of products and items per page.
//     const totalPages = Math.ceil(products.length / itemsPerPage);
//         return (
//         <div>
//             <h1>All the products!</h1>
//             <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
//                 <option value={10}>10 per page</option>
//                 <option value={25}>25 per page</option>
//                 <option value={products.length}>All</option>
//             </select>
//             <ol start={indexOfFirstItem + 1}>
//                 {currentItems.map(product => (
//                     <li key={product.id}>
//                         {product.title} - investment: {product.price}
//                         <ul>
//                             <li>{product.description}</li>
//                         </ul>
//                     </li>
//                 ))}
//             </ol>
//             <div>
//                 Page:
//                 {Array.from({ length: totalPages }, (_, index) => (
//                     <button key={index + 1} onClick={() => paginate(index + 1)}>{index + 1}</button>
//                 ))}
//             </div>
//         </div>
//     );
// };
export default ProductsPage;