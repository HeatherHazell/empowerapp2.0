import fetch from 'node-fetch';

export default async function handler(req, res) {
    try {
        // Fetch products from the specified URL
        const response = await fetch('https://application-monitoring-flask-dot-sales-engineering-sf.appspot.com/products');
        const products = await response.json();

        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Error fetching products' });
    }
}