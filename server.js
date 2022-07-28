const express = require('express');
const app = express();
const authRoute = require("./route/authRoute");

app.use('/api', authRoute);





app.listen(3000, () => {
    console.log(`Server is running on port ${3000}`);
})
