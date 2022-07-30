// jshint esversion: 6
require("dotenv").config();
const express = require('express');
const userRoute = require("./route/userRoute");
const request = require('request');
const _ = require('lodash');
const path = require('path');
const {Donor} = require('./models/donor.model');
const {initializePayment, verifyPayment} = require('./config/paystackConfig')(request);


const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api/user', userRoute);




// PAYSTACK PAYMENT
app.post(`/paystack/pay`, checkUser, async (req, res) => {
    // let { amount, email, full_name } = await req.body;
    const form = _.pick(req.body,['amount','email','full_name']);
    form.metadata = {
        full_name : form.full_name
    }
    form.amount *= 100;
    initializePayment(form, (error, body)=>{
        if(error){
            //handle errors
            console.log(error);
            return;
       }
       res.json(body.data.authorization_url);
    });
});



app.get('/paystack/callback', (req,res) => {
    const ref = req.query.reference;
    verifyPayment(ref, (error,body)=>{
        if(error){
            //handle errors appropriately
            res.json({error: error});
        }
        response = JSON.parse(body);
        const data = _.at(response.data, ['reference', 'amount','customer.email', 'metadata.full_name']);
        [reference, amount, email, full_name] = data;
        newDonor = {reference, amount, email, full_name}
        const donor = new Donor(newDonor)
        donor.save().then((donor)=>{
            if(donor){
                res.json({'receipt':donor._id});
            }
        }).catch((e)=>{
            res.json({success:false, message:e.message});
        })
    })
});



  

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
