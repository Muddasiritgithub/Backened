const Customer = require('../Models/getCustomer');

exports.getCustomerByEmail = async (req, res) => {
  try {
    console.log(req.body);  
    const { email } = req.body;  

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const customer = await Customer.findOne({ email:email});

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving customer', error });
  }
};