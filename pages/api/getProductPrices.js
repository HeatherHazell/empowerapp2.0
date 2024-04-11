const fetch = require('node-fetch');

// Function to fetch product prices and convert them to the desired currency
async function getProductPrices(req, res) {
    const productId = req.query.productId;
    const currency = req.query.currency; 
    console.log('currency',currency);
    try {
        // Fetch product data from the provided API
        const response = await fetch(`https://application-monitoring-flask-dot-sales-engineering-sf.appspot.com/products`);
        const products = await response.json();

        // Define conversion rates for different currencies
        const conversionRates = {
            euro: 0.85, 
            yen: 110.45, 
        };

        // Calculate the converted prices for each product
        const productsWithConvertedPrices = products.map(product => {
            let convertedPrices = product.price; // Assuming product.price contains the prices
            if (currency && conversionRates[currency]) {
                convertedPrices = product.price * conversionRates[currency]
            }
            return { ...product, convertedPrices };
        });

        console.log('Products with converted prices:', productsWithConvertedPrices);

        // Return the products with converted prices
        res.status(200).json(productsWithConvertedPrices);
    } catch (error) {
        console.error('Error fetching product prices:', error);
        res.status(500).json({ error: 'Failed to fetch product prices' });
    }
}

module.exports = getProductPrices;
