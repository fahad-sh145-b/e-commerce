const express = require('express');

const router = express.Router();


const Cart = require('../models/cart');

const Product = require("../models/product");



const { jwtAuthmiddleware } = require('../jwt');

router.post('/add',  jwtAuthmiddleware,async (req, res) => {


    try {
        const { productId, quantity } = req.body;

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }


        let cart = await Cart.findOne({
            user: req.user.id
        })

        if (!cart) {

            cart = await Cart.create({
                user: req.user.id,
                items: [],

            });


        }

        const itemIndex = cart.items.findIndex(
            item => item.product.toString() === productId);

        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity;
        }

        else {
            cart.items.push({
                product: productId,
                quantity
            });
        }

        const response = await cart.save();


        console.log('cart saved by product ');

        return res.status(201).json({ response });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' })
    }

})



router.get('/',jwtAuthmiddleware,async(req,res)=>{

    try{


        const cart = await Cart.findOne({
             user: req.user.id
        }).populate("items.product");

        console.log('cart saved');

        return res.status(201).json({cart});
    }

     catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' })
    }

})


    router.delete('/:id',jwtAuthmiddleware,async(req,res)=>{

        try{
            const cart = await Cart.findOne({user:req.user.id})

            if(!cart){
                return res.status(404).json({message:'Card not found'})
            }

            cart.items=cart.items.filter(
                item=>
                    item.product.toString() !==
                req.params.id
            );

            const carts = await cart.save();

            console.log('cart deleted by id');

            return res.status(200).json({carts})
        
        }


         catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' })
    }
    })
module.exports = router;