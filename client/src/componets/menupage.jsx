import React from 'react';
import { useNavigate } from 'react-router-dom';
import antipastosalad from "../assets/antipastosalad.jpg";
import drinksImage from "../assets/drinksImage.jpg";
import pepperonipizza from "../assets/pepperonipizza.jpg";
import calzone from "../assets/calzone.jpg";
import housesalad from '../assets/housesalad.jpg';
import peperonipizza2 from '../assets/pepperonipizza2.jpg';
import cartIcon from '../assets/cart-icon.png';

const MenuPage = () => {
    const navigate = useNavigate();

    const pizzas = [
        { name: 'Margherita', basePrice: 8.99 },
        { name: 'Pepperoni and Mushroom', basePrice: 9.99 },
        { name: 'BBQ Chicken', basePrice: 10.99 },
        { name: 'Veggie Supreme', basePrice: 11.99 },
        { name: 'Hawaiian', basePrice: 9.99 },
        { name: 'Meat Lover\'s', basePrice: 12.99 },
        { name: 'Four Cheese', basePrice: 10.99 },
        { name: 'Buffalo Chicken', basePrice: 11.99 },
        { name: 'Pesto Veggie', basePrice: 11.99 },
        { name: 'Italian Sausage and Peppers', basePrice: 10.99 },
        { name: 'Mediterranean', basePrice: 11.99 }
    ];

    const salads = [
        { name: 'Caesar Salad', price: 5.00 },
        { name: 'House Salad', price: 5.00 },
        { name: 'Antipasto Salad', price: 5.00 }
    ];

    const drinks = [
        { name: 'Coke', price: 2.50 },
        { name: 'Diet Coke', price: 2.50 },
        { name: 'Sprite', price: 2.50 },
        { name: 'Root Beer', price: 2.50 },
        { name: 'Water', price: 2.50 },
        { name: 'Orange Fanta', price: 2.50 }
    ];

    return (
        <div className="menu-page">
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
            <div className="menu-content">
                <h1>Menu</h1>
                <img src={calzone} alt="Pizza" className="calzone-imageone" onClick={() => navigate('/placeorder')} />
                <div className="menu-sectiona">
                    <h2>Pizzaz</h2>
                    <img src={pepperonipizza} alt="Pizza" className="menu-image" />
                    <ul>
                        {pizzas.map(pizza => (
                            <li key={pizza.name}>
                                <a href={`/pizzadetails/${pizza.name}`}>
                                    <strong>{pizza.name}</strong>: ${pizza.basePrice.toFixed(2)}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <p> ** Want something different? All Pizzaz can come as a Calzone </p>
                </div>
                <div className="menu-sectionb">
                    <h2>Salads</h2>
                    <img src={antipastosalad} alt="Salads" className="menu-image" />
                    <ul>
                        {salads.map(salad => (
                            <li key={salad.name}>
                                <strong>{salad.name}</strong>: ${salad.price.toFixed(2)}
                            </li>
                        ))}
                    </ul>
                </div>
                <img src={housesalad} alt="housesalad" className="house-imagetwo" onClick={() => navigate('/placeorder')} />
                <div className="menu-sectionc">
                    <h2>Drinks</h2>
                    <img src={drinksImage} alt="Drinks" className="menu-image" />
                    <ul>
                        {drinks.map(drink => (
                            <li key={drink.name}>
                                <strong>{drink.name}</strong>: ${drink.price.toFixed(2)}
                            </li>
                        ))}
                    </ul>
                </div>
                <img src={peperonipizza2} alt="Pizza" className="pizza-imagethree" onClick={() => navigate('/placeorder')} />
            </div>
        </div>
    );
};

export default MenuPage;