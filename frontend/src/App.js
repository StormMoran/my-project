import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import ProductPopup from './components/ProductPopup.js';

const App = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('https://opulent-space-potato-x59w4gg7w45jhp5q-5000.app.github.dev/api/Products');
                console.log('Response:', response.data);
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
                setError(error.message);
            }
        };

        fetchProducts();
    }, []);

    // Function to handle showing description for a product
    const handleDescription = (uniqid) => {
        setSelectedProduct(uniqid);
    };

    // Function to handle clearing the selected product
    const handleCloseDescription = () => {
        setSelectedProduct(null);
    };

    // Function to handle clearing the search term
    const handleClearSearch = () => {
        setSearchTerm('');
    };

    // Filter products based on search term
    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="App">
            <nav className="navbar">
                <h1 className="company-title">RayDaAsians's Store</h1>
                <div className="search-container">
                    <input
                        className="search-bar"
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                    {searchTerm && (
                        <button className="clear-search" onClick={handleClearSearch}>
                            X
                        </button>
                    )}
                </div>
                <a href="/">Home</a> {/* Regular anchor tag for internal link */}
                <a href="https://discord.com/invite/AdtreC4yk4" target="_blank" rel="noopener noreferrer">Discord</a> {/* Regular anchor tag for external link */}
                <a href="https://raydaasian.mysellix.io/contact" target="_blank" rel="noopener noreferrer">Contact Me</a> {/* Regular anchor tag for external link */}
            </nav>
            <main>
                <header className="App-header">
                    {error ? (
                        <div>Error: {error}</div>
                    ) : (
                        <table className="product-table">
                            <thead>
                                <tr>
                                    <th>Price</th>
                                    <th>Product Name</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProducts.map(product => (
                                    <React.Fragment key={product.uniqid}>
                                        <tr>
                                            <td>${product.price}USD</td>
                                            <td>{product.title}</td>
                                            <td>
                                                <button
                                                    data-sellix-product={product.uniqid}
                                                    className="purchase-button"
                                                    type="button"
                                                    onClick={() => window.Sellix.pay({
                                                        product_id: product.uniqid,
                                                        quantity: 1,
                                                        returnUrl: window.location.href
                                                    })}
                                                >
                                                    Purchase
                                                </button>
                                                <button
                                                    className="description-button"
                                                    onClick={() => handleDescription(product.uniqid)}
                                                >
                                                    Description
                                                </button>
                                            </td>
                                        </tr>
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>
                    )}
                    {selectedProduct && (
                        <ProductPopup
                            product={products.find(product => product.uniqid === selectedProduct)}
                            onClose={handleCloseDescription}
                        />
                    )}
                </header>
            </main>
        </div>
    );
};

export default App;
