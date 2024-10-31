 const Product = require('../Models/product');  

 exports.countryName =  async (req, res) => {
   try {
    const { country } = req.body;

    if (!country) {
      return res.status(400).send({
        message: 'Country name is required',
      });
    }

    // Find all products made in the specified country
    const products = await Product.find({ MadeIn: country });

    if (products.length === 0) {
      return res.status(404).send({
        message: `No products found made in ${country}`,
      });
    }

    res.status(200).send(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).send({
      message: 'An error occurred while fetching the products',
    });
  }
};

 