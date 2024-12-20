const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 8000;
const jwt=require('jsonwebtoken')
const mongoose =require("mongoose");
require('dotenv').config()
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);


require("dotenv").config();
// console.log(process.env.ACCESS_TOKEN_SECRET);



//middleware

app.use(cors());
app.use(express.json());

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@bakers-cluster.8ezxh.mongodb.net/bakers-and-crumbs?retryWrites=true&w=majority&appName=bakers-cluster`)
.then(
  console.log('MongoDB Connected Succesfully')
  
)

.catch((error)=>console.log('Error connecting to MongoDB',error))

//jwt authentication
app.post('/jwt',async(req,res)=>{
  const user=req.body;
  const token=jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{
    expiresIn:'1hr'
  })
  res.send({token})
})



//verify authentication 



//import routes
const menuRoutes=require('./api/routes/menuRoutes');
const cartRoutes=require('./api/routes/cartRoutes');
const userRoutes=require('./api/routes/userRoutes');
app.use('/menu',menuRoutes);
app.use('/carts',cartRoutes);
app.use('/users',userRoutes);

//stripe payment routes
app.post("/create-payment-intent", async (req, res) => {
  const { price } = req.body;
  const amount = price*100;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "usd",

    "payment_method_types": ["card"],
  });

  res.send({
    clientSecret: paymentIntent.client_secret 
  });
});


app.get("/",(req,res)=>{
  res.send("hello world");
});

app.listen(port,()=>{
  console.log(`app listening on port ${port}`);
  
})


