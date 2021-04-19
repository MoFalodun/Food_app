const { userRouter } = require('./customer');

const { adminRouter } = require('./admin');

const { foodRouter } = require('./food')

const { cartRouter } = require('./cart')

module.exports = { userRouter, adminRouter, foodRouter, cartRouter };