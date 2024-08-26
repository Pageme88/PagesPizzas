import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import drinksImage from "../assets/drinksImage.jpg";
import rootbeer from "../assets/rootbeer.jpg";
import margheritapizza from "../assets/margheritapizza.jpg";
import cartIcon from '../assets/cart-icon.png';

const OrderPage = () => {
    const [order, setOrder] = useState({
        method: '',
        type: '',
        crust: '',
        size: '',
        qty: 1,
        pizzaType: '',
        customToppings: [],
        salads: {},
        drinks: {},
        createOwn: false
    });

    const [total, setTotal] = useState(0.00);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const prices = {
        sizes: {
            'Small': 2.00,
            'Medium': 4.00,
            'Large': 6.00,
            'XLarge': 8.00
        },
        crusts: {
            'Thin': 0.00,
            'Thick': 0.00,
            'Handtossed': 0.00,
            'GlutenFree': 2.00
        },
        salads: {
            'Caesar Salad': 5.00,
            'House Salad': 5.00,
            'Antipasto Salad': 5.00
        },
        drinks: {
            'Coke': 2.50,
            'Diet Coke': 2.50,
            'Sprite': 2.50,
            'RootBeer': 2.50,
            'Water': 2.50,
            'Orange Fanta': 2.50
        },
        pizzas: {
            'Margherita': { basePrice: 8.99, toppings: ['Tomato sauce', 'fresh mozzarella', 'basil', 'olive oil'] },
            'Pepperoni and Mushroom': { basePrice: 9.99, toppings: ['Tomato sauce', 'mozzarella', 'pepperoni', 'mushrooms'] },
            'BBQ Chicken': { basePrice: 10.99, toppings: ['BBQ sauce', 'mozzarella', 'grilled chicken', 'red onions', 'cilantro'] },
            'Veggie Supreme': { basePrice: 11.99, toppings: ['Tomato sauce', 'mozzarella', 'bell peppers', 'onions', 'black olives', 'mushrooms', 'spinach'] },
            'Hawaiian': { basePrice: 9.99, toppings: ['Tomato sauce', 'mozzarella', 'ham', 'pineapple'] },
            'Meat Lover\'s': { basePrice: 12.99, toppings: ['Tomato sauce', 'mozzarella', 'pepperoni', 'sausage', 'bacon', 'ham'] },
            'Four Cheese': { basePrice: 10.99, toppings: ['Tomato sauce', 'mozzarella', 'cheddar', 'parmesan', 'gorgonzola'] },
            'Buffalo Chicken': { basePrice: 11.99, toppings: ['Buffalo sauce', 'mozzarella', 'grilled chicken', 'celery', 'blue cheese crumbles'] },
            'Pesto Veggie': { basePrice: 11.99, toppings: ['Pesto sauce', 'mozzarella', 'sun-dried tomatoes', 'artichoke hearts', 'olives'] },
            'Italian Sausage and Peppers': { basePrice: 10.99, toppings: ['Tomato sauce', 'mozzarella', 'Italian sausage', 'bell peppers', 'onions'] },
            'Mediterranean': { basePrice: 11.99, toppings: ['Tomato sauce', 'mozzarella', 'feta cheese', 'kalamata olives', 'red onions', 'tomatoes', 'spinach'] }
        }
    };

    const availableToppings = [
        'Pepperoni', 'Mushrooms', 'Onions', 'Green Peppers', 'Black Olives',
        'Sausage', 'Bacon', 'Extra Cheese', 'Spinach', 'Tomatoes',
        'Garlic', 'Chicken', 'Pineapple', 'Jalapeños', 'Red Onions',
        'Artichokes', 'Bell Peppers', 'Anchovies', 'Ground Beef',
        'Crumbled Sausage', 'Sun-Dried Tomatoes'
    ];

    useEffect(() => {
        if (order.pizzaType && !order.createOwn) {
            const pizza = prices.pizzas[order.pizzaType];
            if (pizza) {
                setOrder(prevOrder => ({
                    ...prevOrder,
                    customToppings: pizza.toppings
                }));
            }
        } else {
            setOrder(prevOrder => ({
                ...prevOrder,
                customToppings: []
            }));
        }
        calculateTotal(order);
    }, [order.pizzaType, order.createOwn]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setOrder(prevOrder => {
            const updatedOrder = { ...prevOrder, [name]: value };

            if (name === 'pizzaType') {
                updatedOrder.createOwn = value === 'createOwn';
                if (value !== 'createOwn') {
                    const pizza = prices.pizzas[value];
                    if (pizza) {
                        updatedOrder.customToppings = pizza.toppings;
                    }
                } else {
                    updatedOrder.customToppings = [];
                }
            }

            calculateTotal(updatedOrder);
            return updatedOrder;
        });
    };

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        setOrder(prevOrder => {
            const updatedOrder = {
                ...prevOrder,
                createOwn: value === 'createOwn' ? checked : prevOrder.createOwn,
                pizzaType: value === 'createOwn' ? '' : prevOrder.pizzaType
            };

            if (value === 'createOwn' && checked) {
                updatedOrder.customToppings = [];
            } else if (order.pizzaType && !checked) {
                const pizza = prices.pizzas[order.pizzaType];
                updatedOrder.customToppings = pizza.toppings || [];
            }

            calculateTotal(updatedOrder);
            return updatedOrder;
        });
    };

    const handleToppingChange = (e) => {
        const { value, checked } = e.target;
        setOrder(prevOrder => {
            const updatedToppings = checked
                ? [...prevOrder.customToppings, value]
                : prevOrder.customToppings.filter(topping => topping !== value);

            const updatedOrder = { ...prevOrder, customToppings: updatedToppings };
            calculateTotal(updatedOrder);
            return updatedOrder;
        });
    };

    const handleQuantityChange = (e) => {
        const { value, dataset } = e.target;
        const { type, item } = dataset;

        setOrder(prevOrder => {
            const updatedOrder = { ...prevOrder };
            if (type === 'salads') {
                updatedOrder.salads[item] = parseInt(value, 10) || 0;
            } else if (type === 'drinks') {
                updatedOrder.drinks[item] = parseInt(value, 10) || 0;
            }
            calculateTotal(updatedOrder);
            return updatedOrder;
        });
    };

    const calculateTotal = (updatedOrder) => {
        let newTotal = 0;
        if (updatedOrder.pizzaType && !updatedOrder.createOwn) {
            const pizza = prices.pizzas[updatedOrder.pizzaType];
            newTotal += pizza.basePrice || 0;
        }
        if (updatedOrder.createOwn) {
            newTotal += 8.99;
        }
        if (updatedOrder.customToppings.length > 0) {
            newTotal += updatedOrder.customToppings.length * 1.00;
        }
        newTotal += (prices.crusts[updatedOrder.crust] || 0);
        newTotal += (prices.sizes[updatedOrder.size] || 0);
        newTotal *= (updatedOrder.qty || 1);


        for (const [salad, qty] of Object.entries(updatedOrder.salads)) {
            newTotal += (prices.salads[salad] || 0) * qty;
        }


        for (const [drink, qty] of Object.entries(updatedOrder.drinks)) {
            newTotal += (prices.drinks[drink] || 0) * qty;
        }

        setTotal(newTotal);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/ordercart', { state: { order, total } });
    };

    return (
        <div className="order-page">
                <header className="header">
                <h1>Pizzaz My Heart</h1>
                <nav>
                        <button onClick={() => navigate('/menu')}>MENU</button>
                        <button onClick={() => navigate('/')}>HOME</button>
                        <img
                            src={cartIcon}
                            alt="Cart"
                            className="cart-icon"
                            onClick={() => navigate('/ordercart')}
                        />
                    </nav>
                </header>
            <div className="dinner">
                <h1>Create Tonights Dinner Here!!!</h1>
            </div>
            <div className="form-container">
                <img src={drinksImage} alt="drinks" className="drinks-image" />
                <img src={margheritapizza} alt="margheritapizza" className="margheritapizza-image" />
                <img src={rootbeer} alt="rootbeer" className="rootbeer-image" />
            </div>
            <form onSubmit={handleSubmit}>
                <label>
                    Method:
                    <select name="method" value={order.method} onChange={handleInputChange}>
                        <option value="">Select One</option>
                        <option value="delivery">Delivery</option>
                        <option value="carryout">Carry Out</option>
                    </select>
                </label>
                {errors.method && <p className="error">{errors.method}</p>}
                <br />
                <label>
                    Type:
                    <select name="type" value={order.type} onChange={handleInputChange}>
                        <option value="">Select One</option>
                        <option value="Pizza">Pizza</option>
                        <option value="Calzone">Calzone</option>
                    </select>
                </label>
                {errors.type && <p className="error">{errors.type}</p>}
                <br />
                <label>
                    Crust:
                    <select name="crust" value={order.crust} onChange={handleInputChange}>
                        <option value="">Select One</option>
                        <option value="Thin">Thin</option>
                        <option value="Thick">Thick</option>
                        <option value="Handtossed">Handtossed</option>
                        <option value="GlutenFree">Gluten Free</option>
                    </select>
                    {errors.crust && <p className="error">{errors.crust}</p>}
                </label>
                <br />
                <label>
                    Size:
                    <select name="size" value={order.size} onChange={handleInputChange}>
                        <option value="">Select One</option>
                        <option value="Small">Small</option>
                        <option value="Medium">Medium</option>
                        <option value="Large">Large</option>
                        <option value="XLarge">XLarge</option>
                    </select>
                    {errors.size && <p className="error">{errors.size}</p>}
                </label>
                <br />
                <label>
                    Quantity:
                    <input type="number" name="qty" value={order.qty} onChange={handleInputChange} min="1" />
                </label>
                <br />
                <fieldset>
                <legend>Choose Your Specialty Pizza or Create Your Own:</legend>
                    {Object.keys(prices.pizzas).map(pizza => (
                        <label key={pizza}>
                            <input
                                type="radio"
                                name="pizzaType"
                                value={pizza}
                                checked={order.pizzaType === pizza && !order.createOwn}
                                onChange={handleInputChange}
                            />
                            {pizza}
                        </label>
                    ))}
                    <label>
                        <input
                            type="radio"
                            name="pizzaType"
                            value="createOwn"
                            checked={order.createOwn}
                            onChange={handleCheckboxChange}
                        />
                        Create Your Own
                    </label>
                    {errors.pizzaType && <p className="error">{errors.pizzaType}</p>}
                </fieldset>
                {order.createOwn && (
                    <fieldset>
                        <legend>Custom Toppings:</legend>
                        {availableToppings.map(topping => (
                            <label key={topping}>
                                <input
                                    type="checkbox"
                                    value={topping}
                                    checked={order.customToppings.includes(topping)}
                                    onChange={handleToppingChange}
                                />
                                {topping}
                            </label>
                        ))}
                        {errors.customToppings && <p className="error">{errors.customToppings}</p>}
                    </fieldset>
                )}
                {order.createOwn && (
                    <fieldset>
                        <legend>Custom Toppings:</legend>
                        {availableToppings.map(topping => (
                            <label key={topping}>
                                <input
                                    type="checkbox"
                                    value={topping}
                                    checked={order.customToppings.includes(topping)}
                                    onChange={handleToppingChange}
                                />
                                {topping}
                            </label>
                        ))}
                        {errors.customToppings && <p className="error">{errors.customToppings}</p>}
                    </fieldset>
                )}
                <fieldset>
                    <legend>Select Salads:</legend>
                    {Object.keys(prices.salads).map(salad => (
                        <label key={salad}>
                            {salad}:
                            <input
                                type="number"
                                data-type="salads"
                                data-item={salad}
                                value={order.salads[salad] || 0}
                                onChange={handleQuantityChange}
                                min="0"
                            />
                        </label>
                    ))}
                </fieldset>
                <fieldset>
                    <legend>Select Drinks:</legend>
                    {Object.keys(prices.drinks).map(drink => (
                        <label key={drink}>
                            {drink}:
                            <input
                                type="number"
                                data-type="drinks"
                                data-item={drink}
                                value={order.drinks[drink] || 0}
                                onChange={handleQuantityChange}
                                min="0"
                            />
                        </label>
                    ))}
                </fieldset>
                <br />
                <p>Total: ${total.toFixed(2)}</p>
                <button type="submit">Submit Order</button>
                <br />
            </form>
        </div>
    );
};

export default OrderPage;

