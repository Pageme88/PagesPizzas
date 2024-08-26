import OrderModel from '../models/order.model.js';

const OrderController= {
    "createOrder" : async (req, res) => {
    try {
        const newOrder = new OrderModel(req.body);
        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create order' });
    }
}};

export default OrderController