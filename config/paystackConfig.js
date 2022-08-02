const paystack = (request) => {
  const MySecretKey = process.env.PAYSTACK_SECRET_KEY;
  // sk_test_xxxx to be replaced by your own secret key
  const initializePayment = (form, mycallback) => {
    const options = {
      url: "https://api.paystack.co/transaction/initialize",
      headers: {
        authorization: MySecretKey,
        "content-type": "application/json",
        "cache-control": "no-cache",
      },
      form, //the form object which will contain the full name, email, amount and other needed paramters for the actual transaction.
    };
    const callback = (error, response, body) => {
      return mycallback(error, body);
    };
    request.post(options, callback);
  };

  const verifyPayment = (ref, mycallback) => {
    const options = {
        url : 'https://api.paystack.co/transaction/verify/'+encodeURIComponent(ref    ),
        headers : {
            authorization: MySecretKey,
            'content-type': 'application/json',
            'cache-control': 'no-cache'
       }
    }
    const callback = (error, response, body)=>{
        return mycallback(error, body);
    }
    request(options,callback);
}
};



// --------------------------IN A DIFFERENT FILE-------------------------------
// const request = require('request');
// const _ = require('lodash');
// const path = require('path');
// const {Donor} = require('./models/donor.model');
// const {initializePayment, verifyPayment} = require('./config/paystackConfig')(request);

// PAYSTACK PAYMENT
// app.post(`/paystack/pay`, checkUser, async (req, res) => {
//     // let { amount, email, full_name } = await req.body;
//     const form = _.pick(req.body,['amount','email','full_name']);
//     form.metadata = {
//         full_name : form.full_name
//     }
//     form.amount *= 100;
//     initializePayment(form, (error, body)=>{
//         if(error){
//             //handle errors
//             console.log(error);
//             return;
//        }
//        res.json(body.data.authorization_url);
//     });
// });



// app.get('/paystack/callback', (req,res) => {
//     const ref = req.query.reference;
//     verifyPayment(ref, (error,body)=>{
//         if(error){
//             //handle errors appropriately
//             res.json({error: error});
//         }
//         response = JSON.parse(body);
//         const data = _.at(response.data, ['reference', 'amount','customer.email', 'metadata.full_name']);
//         [reference, amount, email, full_name] = data;
//         newDonor = {reference, amount, email, full_name}
//         const donor = new Donor(newDonor)
//         donor.save().then((donor)=>{
//             if(donor){
//                 res.json({'receipt':donor._id});
//             }
//         }).catch((e)=>{
//             res.json({success:false, message:e.message});
//         })
//     })
// });



