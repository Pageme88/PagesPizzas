import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import pizzaovenflames from "../assets/pizzaovenflames.jpg";

const OrderCart = () => {
    const location = useLocation();
    const navigate = useNavigate();
    
    const { order, total } = location.state || { order: {}, total: 0 };
    const formatItems = (items) => {
        const safeItems = items || {};
    
        return Object.keys(safeItems).length > 0 ? (
            <ul>
                {Object.entries(safeItems).map(([item, qty]) => (
                    <li key={item}>{item}: {qty}</li>
                ))}
            </ul>
        ) : (
            <p>No items</p>
        );
    };
    
    const handleSubmit = () => {
        alert('Thank you for ordering!');
        navigate('/');
    };

    return (
        <div className="order-cart">
            <header className="header">
                <h1>Pizzaz My Heart</h1>
                <nav>
                    <button onClick={() => navigate('/menu')}>MENU</button>
                    <button onClick={() => navigate('/placeorder')}>ORDER</button>
                    <button onClick={() => navigate('/')}>HOME</button>
                </nav>
            </header>
            <img src={pizzaovenflames} alt="pizzaoven" className="oven-image" />
            <h3>Here's what you got!!</h3>
            <div className="summary">
                <h2>Order Summary</h2>
                <p><strong>Method:</strong> {order.method}</p>
                <p><strong>Type:</strong> {order.type}</p>
                <p><strong>Pizza Details:</strong> {order.pizzaType}</p> 
                <p><strong>Crust:</strong> {order.crust}</p>
                <p><strong>Size:</strong> {order.size}</p>
                <p><strong>Quantity:</strong> {order.qty}</p>
                <p><strong>Salads:</strong> {formatItems(order.salads)}</p>
                <p><strong> Drinks:</strong> {formatItems(order.drinks)}</p>
                <p><strong>Total:</strong> ${total.toFixed(2)}</p>
            </div>
            <div className="order-button">
            <button type="button" className="ordersubmit" onClick={handleSubmit}>Submit Order</button>
            </div>
        </div>
    );
};

export default OrderCart;

