import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './views/Home.jsx';
import PizzaDetails from './componets/pizzaDetails.jsx';
import OrderPage from './componets/OrderPage.jsx';
import OrderCart from './componets/ordercart.jsx';
import MenuPage from './componets/menupage.jsx';
import './App.css';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/pizzadetails/:pizzaName" element={<PizzaDetails />} />
        <Route path="/placeorder" element={<OrderPage />} />
        <Route path="/ordercart" element={<OrderCart />} />
      </Routes>
    </Router>
  );
};

export default App;
