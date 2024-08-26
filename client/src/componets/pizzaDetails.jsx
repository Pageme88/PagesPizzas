import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import cartIcon from "../assets/cart-icon.png";

const PizzaDetails = () => {
    const { pizzaName } = useParams();
    const navigate = useNavigate();

    const pizzas = [
        { name: 'Margherita', basePrice: 8.99, toppings: ['Tomato', 'Mozzarella'] },
        { name: 'Pepperoni and Mushroom', basePrice: 9.99, toppings: ['Pepperoni', 'Mushroom'] },
        { name: 'BBQ Chicken', basePrice: 10.99, toppings: ['BBQ Chicken', 'Red Onion'] },
        { name: 'Veggie Supreme', basePrice: 11.99, toppings: ['Bell Peppers', 'Olives', 'Onions'] },
        { name: 'Hawaiian', basePrice: 9.99, toppings: ['Ham', 'Pineapple'] },
        { name: 'Meat Lover\'s', basePrice: 12.99, toppings: ['Pepperoni', 'Sausage', 'Bacon'] },
        { name: 'Four Cheese', basePrice: 10.99, toppings: ['Mozzarella', 'Parmesan', 'Gorgonzola', 'Ricotta'] },
        { name: 'Buffalo Chicken', basePrice: 11.99, toppings: ['Buffalo Chicken', 'Celery'] },
        { name: 'Pesto Veggie', basePrice: 11.99, toppings: ['Pesto', 'Tomato', 'Spinach'] },
        { name: 'Italian Sausage and Peppers', basePrice: 10.99, toppings: ['Italian Sausage', 'Bell Peppers'] },
        { name: 'Mediterranean', basePrice: 11.99, toppings: ['Feta', 'Olives', 'Tomato'] }
    ];

    const pizza = pizzas.find(pizza => pizza.name === pizzaName);

    const handleOrderClick = () => {
        navigate(`/placeorder?pizza=${pizzaName}`);
    };

    if (!pizza) return <div>Pizza not found</div>;

    return (
        <div className= "whole-page-details">
            <header className="header">
                <h1>Pizzaz My Heart</h1>
                <nav>
                <button onClick={() => navigate('/placeorder')}>ORDER</button>
                <button onClick={() => navigate('/')}>HOME</button>
                <img
                    src={cartIcon}
                    alt="Cart"
                    className="cart-icon"
                    onClick={() => navigate('/ordercart')}
                />
                </nav>
                </header>
            <div className="pizza-details-page">
                <h1>{pizza.name}</h1>
                <p>Price: ${pizza.basePrice.toFixed(2)}</p>
                <h2>Toppings:</h2>
                <ul>
                    {pizza.toppings.map(topping => (
                        <li key={topping}>{topping}</li>
                    ))}
                </ul>
                <button onClick={handleOrderClick}>Order Now</button>
            </div>
        </div>
    );
};

export default PizzaDetails;
