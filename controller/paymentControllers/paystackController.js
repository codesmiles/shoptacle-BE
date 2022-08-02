const request = require("../../config/paystackConfig");

// INITIALIZE PAYSTACK
module.exports.initialize=async(req,res)=>{
let{amount,email}=await req.body;
// GO
const params = JSON.stringify({
    email,
    amount,
  });

  request.write(params);
  request.end();

}

module.exports.verify=async(req,res)=>{}
