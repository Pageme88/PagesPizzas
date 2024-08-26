import React from 'react';
import { useNavigate } from 'react-router-dom';
import PizzaToppings from "../assets/pizzatoppings.jpg";
import cartIcon from '../assets/cart-icon.png';

const HomePage = () => {
    const navigate = useNavigate();

    const handleOrderClick = () => {
        navigate('/placeorder');
    };

    return (
        <div className="whole-page">
            <header className="header">
                <h1>Pizzaz My Heart</h1>
                <nav>
                    <button onClick={() => navigate('/menu')}>MENU</button>
                    <button onClick={handleOrderClick}>ORDER</button>
                    <img
                        src={cartIcon}
                        alt="Cart"
                        className="cart-icon"
                        onClick={() => navigate('/ordercart')}
                    />
                </nav>
            </header>
            <div className="weekly-planner">
                        <h3> Our Weekly Promotions </h3>
                        <p>MONDAY: Free $5 salad with every small pizza</p>
                        <p>Details: Purchase any small pizza and get a $5 salad for free. </p>
                        <p>TUESDAY:  Free gallon of lemonade with every $25+ purchase</p>
                        <p>Details: Spend $25 or more and receive a free gallon of lemonade with your order. </p>
                        <p>WEDNESDAY: 50% off every order of $25+  </p>
                        <p>Details: Get 50% off your entire order when you spend $25 or more. </p>
                        <p>THURSDAY: Buy one, get one free pizza </p>
                        <p>Details: Buy any pizza and get another pizza of equal or lesser value for free. </p>
                        <p>FRIDAY: All-day Happy Hour </p>
                        <p>Details: Enjoy happy hour pricing all day long on selected drinks and appetizers. </p>
                        <p>SATURDAY:  Free brownie dessert with every kids meal </p>
                        <p>Details: Purchase a kids meal and receive a free brownie dessert. </p>
                        <p>SUNDAY:  Kids eat free  </p>
                        <p>Details: One free kids meal with each adult meal purchased.</p>
            </div>
            <div className="welcome-container">
                <section className="about-us">
                    <img src={PizzaToppings} alt="pepperoni pizza" className="small-image" />
                    <h2>Welcome to Pizzaz My Heart!</h2>
                    <p>Since 2008, we’ve been serving up delicious brick oven pizzas crafted with love by Nancy Page, a dedicated mother of three. Nancy's passion for cooking and her garden-fresh herbs turned simple ingredients into extraordinary meals.</p>
                    <p>With the support of her husband, a successful real estate tycoon, Nancy’s vision blossomed into a beloved local spot. Here, every pizza reflects her commitment to quality and flavor.</p>
                    <p>Join us to experience the magic of traditional brick oven cooking and the joy of family-style dining. At Pizzaz My Heart, every meal is a celebration of fresh ingredients and heartfelt cooking!</p>

                </section>
                <button type="submit" className="submit-button" onClick={handleOrderClick}>PLACE YOUR ORDER HERE</button>
            </div>
        </div>
    );
};

export default HomePage;

