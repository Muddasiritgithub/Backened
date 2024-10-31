const Customer = require("../Models/getCustomer");

exports.addCustomer = async (req, res) => {
  const { name, email, address, phone, signedUp } = req.body;

  const usermodel = require("../Models/user"); // Import the User model

  exports.adduser = async (req, res) => {
    console.log("api called");
    console.log("body is", req.body);

    try {
      const { email, password, firstName, lastName } = req.body;

      console.log("user is ", firstName);

      // Check if user already exists
      const existingUser = await usermodel.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Ensure file is available if used
      let imagePath = "";
      if (req.file) {
        imagePath = req.file.path; // Ensure req.file is not undefined
      }

      // Create a new user
      const user = new usermodel({
        email,
        password,
        firstName,
        lastName,
        image: imagePath, // Include the image path if applicable
      });

      // Save the user to the database
      const savedUser = await user.save();

      res.status(201).json({
        success: true,
        message: "User created successfully",
        data: savedUser,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error creating user", error });
    }
  };

  exports.getuser = (req, res) => {
    const user = {
      name: "Balouch",
      age: 22,
      salary: 50000,
      company: "Alfain Technology",
    };
    delete user.salary;
    res.status(200).send(user);
  };
};
exports.getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving customers", error });
  }
};

