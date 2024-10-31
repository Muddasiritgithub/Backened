const { faker } = require('@faker-js/faker');
const Product = require('../Models/product'); // Make sure to adjust the path as needed

exports.fakeProductgenerator = async (req, res) => {
  const products = [];

  for (let i = 0; i < 10; i++) {
    const newProduct = {
      Name: faker.person.fullName(),
      Image: `uploads\\Image-${Date.now()}.png`,
      Title: faker.commerce.productName(),
      Price: [faker.commerce.price()],
      Discription: faker.commerce.productDescription(),
      Model: faker.date.past().getFullYear(),
      Camera: `${faker.number.int({ min: 1, max: 10 })} Pixel`,
      Ram: faker.helpers.arrayElement(['4GB', '6GB', '8GB', '12GB']),
      Company: faker.company.name(),
      MadeIn: faker.location.country(),
      Proccessor: faker.string.alphanumeric(6),
      Quantity: faker.number.int({ min: 1, max: 500 }),
    };

    products.push(newProduct);
  }

  try {
    await Product.insertMany(products);
    console.log('Random products data inserted successfully');
    res.status(200).send({
      message: "New Products Created",
    });
  } catch (error) {
    console.error('Error inserting products:', error);
    res.status(400).send({
      message: "Data Not Inserted",
    });
  }
};
