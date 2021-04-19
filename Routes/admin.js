const { Router } = require('express');
const adminRouter = Router();

const { addNewAdmin,
    logAdmin,} = require('../Controllers')
const {   validateAdminSignup,
    validateLoginAdmin,
    checkIfAdminExists, } = require('../Middlewares')

adminRouter.post('/admin/signup', validateAdminSignup, addNewAdmin)
adminRouter.post('/admin/login', validateLoginAdmin, checkIfAdminExists, logAdmin )

module.exports = { adminRouter };