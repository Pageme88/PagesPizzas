import { model, Schema } from 'mongoose';


const OrderSchema = new Schema({

    method: {
        type: String,
        enum: ['Carry Out', 'Pick Up'],
        required: true
    },
    type: {
        type: String,
        enum: ['Pizza', 'Calzone'],
        required: true
    },
    crust: {
        type: String,
        enum: ['Thin', 'Thick', 'Hand Tossed', 'Gluten Free'],
        required: true
    },
    size: {
        type: String,
        enum: ['Small', 'Medium', 'Large', 'Extra Large'],
        required: true
    },
    toppings: {
        type: [String],
        enum: [
            'Pepperoni', 'Sausage', 'Bacon', 'Ham', 'Mushrooms', 'Onions',
            'Green Peppers', 'Black Olives', 'Green Olives', 'Pineapple', 'Spinach',
            'Tomatoes', 'Garlic', 'Banana Peppers', 'Jalapeños', 'Anchovies', 'Chicken',
            'Beef', 'Salami', 'Artichoke Hearts', 'Feta Cheese'
        ],
        default: [],
        validate: [arrayLimit, '{PATH} exceeds the limit of 5'] // Optional: Validate max 21 toppings
    },
    addOns: {
        type: [String],
        enum: ['Caesar Salad', 'House Salad', 'Antipasto Salad'],
        default: []
    },
    drinks: {
        type: [String],
        enum: ['Coke', 'Diet Coke', 'Sprite', 'Orange Fanta'],
        default: []
    },
    total: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });


function arrayLimit(val) {
    return val.length <= 5;
}

const OrderModel = model("Order", OrderSchema);
export default OrderModel;
