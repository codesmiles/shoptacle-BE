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
