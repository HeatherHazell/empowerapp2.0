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
            const res = await fetch('/api/products');
            const data = await res.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    // Calculate the index of the first and last item of the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    // const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);
    let currentItems = [];
        if (Array.isArray(products) && products.length > 0) {
            const indexOfLastItem = currentPage * itemsPerPage;
            const indexOfFirstItem = indexOfLastItem - itemsPerPage;
            currentItems = products.slice(indexOfFirstItem, indexOfLastItem);
        }

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    // Change items per page
    const handleItemsPerPageChange = (event) => {
        setItemsPerPage(parseInt(event.target.value));
        setCurrentPage(1); // Reset page to 1 when changing items per page
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
                        {product.title}
                        <ul>
                            <li>{product.body}</li>
                        </ul>
                    </li>
                ))}
            </ol>
            <div>
                Page:
                {Array.from({ length: totalPages }, (_, index) => (
                    <button key={index + 1} onClick={() => paginate(index + 1)}>{index + 1}</button>
                ))}
            </div>
        </div>
    );
};

export default ProductsPage;
