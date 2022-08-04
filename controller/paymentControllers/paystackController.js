const https = require("https");

const options = {
  hostname: "api.paystack.co",
  port: 443,
  path: "/transaction/initialize",
  method: "POST",
  headers: {
    "Authorization":`Bearer ${process.env.PAYSTACK_TEST_SECRET_KEY}`,
    "Content-Type": "application/json",
  },
};



// INITIALIZE PAYSTACK
module.exports.initialize=async(req,res)=>{
let{amount,email}=await req.body;
const params = JSON.stringify({
  email,
  amount
});

// const options = {
//   hostname: "api.paystack.co",
//   port: 443,
//   path: "/transaction/initialize",
//   method: "POST",
//   headers: {
//     "Authorization":`Bearer ${process.env.PAYSTACK_TEST_SECRET_KEY}`,
//     "Content-Type": "application/json",
//   },
// };

const request = https
  .request(options, (response) => {
    let data = "";

    response.on("data", (chunk) => {
      data += chunk;
    });

    response.on("end", () => {
      console.log(JSON.parse(data));
    });
  })
  .on("error", (error) => {
    console.error(error);
  });

  
  
  request.write(params);
  request.end();
  // res.send(request.end().outputData); // figure out how to store the reference of the transaction to the database

}

module.exports.verify=async(req,res)=>{
  let reference= await req.params.reference;

  options.path = `/transaction/verify/${reference}`; //reference from initialize

  console.log(options);
  return 0
  https.request(options, res => {
    let data = ''
  
    res.on('data', (chunk) => {
      data += chunk
    });
  
    res.on('end', () => {
      console.log(JSON.parse(data))
    })
  }).on('error', error => {
    console.error(error)
  })
}
