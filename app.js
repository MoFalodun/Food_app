const express = require("express");
const logger = require("morgan");
const mongoose = require('mongoose');
// const PayStack = require('paystack-node')
const { userRouter, adminRouter, foodRouter, cartRouter} = require("./Routes");

const app = express();

app.use(express.json());
app.use(userRouter);
app.use(adminRouter);
app.use(foodRouter);
app.use(cartRouter);
app.use(logger("dev"));

mongoose.connect('mongodb://localhost:27017/food_app',{
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to Mongodb'))
.catch(err => console.log('Could not connect to Mongodb...', err))

app.listen(3000, () => console.log(`Listening on port ${3000}`));