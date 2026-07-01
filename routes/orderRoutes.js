const express = require('express');

const router = express.Router();


const Order = require('../models/order');

const Cart = require("../models/cart");

const admin = require('../admin');


const { jwtAuthmiddleware } = require('../jwt');





router.post('/create', jwtAuthmiddleware, async (req, res) => {


    try {

        const cart = await Cart.findOne({
            user: req.user.id
        }).populate("items.product");

        if (!cart || cart.items.length === 0) {
            return res.status(404).json({ message: 'Card empty' })
        }

        let totalPrice = 0;

        const orderItems = cart.items.map(item => {
            totalPrice +=
                item.product.price *
                item.quantity;

            return {
                product: item.product._id,

                quantity: item.quantity,

                price: item.product.price
            }


        });


        const order = await Order.create({
            user: req.user.id,
            orderItems,
            totalPrice
        });

        cart.items = [];

        await cart.save();


        return res.status(201).json({ message: "Order created successfully", order });
    }


    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' })
    }


})



router.get('/', jwtAuthmiddleware, async (req, res) => {

    try {
        const order = await Order.find({
            user: req.user.id
        }).populate("orderItems.product");


        res.status(200).json({ order })
    }

    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' })
    }

})


// Admin Get All Order


router.get('/admin',jwtAuthmiddleware, admin,async(req,res)=>{

    try{

        const order = await Order.find().populate("user");

        res.status(200).json({ order })


    }

    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' })
    }
})

router.get('/:id', jwtAuthmiddleware, async (req, res) => {

    try {

        const orderId = await Order.findById(req.params.id)
        .populate("orderItems.product");

        if(!orderId){
            return res.status(404).json({message:'Order not found'})
        }


        res.status(200).json({ orderId })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' })
    }

})





module.exports = router;