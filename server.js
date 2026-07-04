const express = require('express');

require('dotenv').config();

const app = express();



const db = require('./db');

const bodyParser = require('body-parser');

app.use(bodyParser.json());


const PORT = process.env.PORT || 3000;


app.get('/' ,function (req,res){

        res.send("hello")

})

const userRoutes = require('./routes/userRoutes');

const productRoutes = require('./routes/productRoutes');

const cartRoutes = require('./routes/cartRoutes');

const orderRoutes = require('./routes/orderRoutes');



app.use('/user',userRoutes);

app.use('/product',productRoutes);

app.use('/cart',cartRoutes);

app.use('/order',orderRoutes);







app.listen(PORT,()=>{
   console.log("server is live")

})     
    


    

