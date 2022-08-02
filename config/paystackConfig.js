const https = require("https");

// INITIALIZE PAYSTACK
// STAYS
const options = {
  hostname: "api.paystack.co",
  port: 443,
  path: "/transaction/initialize",
  method: "POST",
  headers: {
    Authorization: process.env.PAYSTACK_TEST_SECRET_KEY,
    "Content-Type": "application/json",
  },
};

const req = https
  .request(options, (res) => {
    let data = "";

    res.on("data", (chunk) => {
      data += chunk;
    });

    res.on("end", () => {
      console.log(JSON.parse(data));
    });
  })
  .on("error", (error) => {
    console.error(error);
  });

// VERIFY PAYSTACK
const options2 = {
  hostname: "api.paystack.co",
  port: 443,
  path: "/transaction/verify/:reference",
  method: "GET",
  headers: {
    Authorization: process.env.PAYSTACK_TEST_SECRET_KEY,
  },
};

https
  .request(options2, (res) => {
    let data = "";

    res.on("data", (chunk) => {
      data += chunk;
    });

    res.on("end", () => {
      console.log(JSON.parse(data));
    });
  })
  .on("error", (error) => {
    console.error(error);
  });

module.exports = req;
// req.write(params);
// req.end();
