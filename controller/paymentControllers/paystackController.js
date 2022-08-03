const request = require("../../config/paystackConfig");
const https = require("https");

// INITIALIZE PAYSTACK
module.exports.initialize=async(req,res)=>{
let{amount,email}=await req.body;
const params = JSON.stringify({
  email,
  amount
});

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
  // res.send(request.end().outputData);

}

module.exports.verify=async(req,res)=>{}
