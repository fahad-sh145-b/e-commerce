const express = require('express');

const router = express.Router();


const Product = require('../models/product');
const admin = require('../admin');

const { jwtAuthmiddleware } = require('../jwt');



router.post('/', jwtAuthmiddleware, admin, async (req, res) => {


    try {

        const data = req.body;

        const newProduct = new Product(data);

        const response = await newProduct.save();
        console.log('product saved');

        return res.status(201).json({ response });

    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' })
    }


})


router.get('/', async (req, res) => {


    try {

        const response = await Product.find();


        console.log('product fetched');

        return res.status(201).json({ response });


    }

    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' })
    }

})


router.get('/:id', async (req, res) => {
    try {
        const productId = req.params.id;

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: 'product not found' })
        }
        console.log('product fetched by id');
        return res.status(201).json({ product });
    }



    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' })
    }
})



router.put('/:id', jwtAuthmiddleware, admin, async (req, res) => {

    try {
        const productID = req.params.id

        const updatedproductdata = req.body;

        const product = await Product.findByIdAndUpdate(productID, updatedproductdata, {
            new: true,
            runValidators: true
        })

        if (!product) {
            return res.status(404).json({ message: 'product not found' })

        }

        console.log('product updated');

        return res.status(200).json({ product })

    }

    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' })
    }
})

router.delete('/:id', jwtAuthmiddleware, admin, async (req, res) => {

    try {
        const productID = req.params.id


        const product = await Product.findByIdAndDelete(productID)

        if (!product) {
            return res.status(404).json({ message: 'product not found' })

        }

        console.log('product deleted');

        return res.status(200).json({ product })

    }

    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' })
    }
})



      





module.exports = router;