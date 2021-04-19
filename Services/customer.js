const { CustomerModel } = require('../Models');


// exports.create = (req, res) => {
//     if (!req.body){
//         return res.status(400).json({status: 'fail', message: 'Body cannot be empty'})
//     };

//     const customer = new user({
//         firstName: req.body.firstName,
//         lastName: req.body.lastName,
//         email: req.body.email,
//         password: req.body.password,
//         phoneNumber: req.body.phoneNumber,
//     })

//     customer.save()
//     .then(data => {
//         res.send(data);
//     }).catch(error => {
//         res.status(500).json({status: 'fail', message: 'error occured when creating this customer'})
//         console.log(error);
//     })
// }

const addCustomer = async (data) => {
    const { firstName, lastName, email, password, phoneNumber } = data;
    const customer = new CustomerModel({ firstName, lastName, email, password, phoneNumber })
    return customer;
}

const loginCustomer = async (email) => CustomerModel.findOne({email})

const findCustomerByEmail = async (email) => CustomerModel.findOne({email})


module.exports = {
    addCustomer,
    loginCustomer,
    findCustomerByEmail  
}