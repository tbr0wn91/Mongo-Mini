const Customer = require('../collections/customer');

module.exports = {
  getAllCustomers: (req, res, next) => {
    Customer.find().then(customers => {
      res.status(200).send(customers);
    })
  },
  postCustomer: (req, res, next) => {
    const { name, email } = req.body;
    const customer = new Customer({name, email})

    customer.save((err) =>{
      Customer.find().then(customers =>{
        res.status(200).send(customers)
      })
    })
  },
  updateCustomer: (req, res, next) => {
    const { id } = req.params;
    const { email } = req.query;

    Customer.findById(id).then(foundCustomer => {
      foundCustomer.email = email
      foundCustomer.save((err) => {
        Customer.find().then(customers => {
          res.status(200).send(customers)
        })
      })
    })
  },
  deleteCustomer: (req, res, next) => {
    const { id } = req.params;

    Customer.findByIdAndDelete(id).then(customerDeletionInfo => {
      console.log(customerDeletionInfo)

      Customer.find().then(() => {
        res.status(200).send(customers);
      })
    })
  }
};
