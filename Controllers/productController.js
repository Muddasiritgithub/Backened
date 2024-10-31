const Product = require("../Models/product");
const firebase = require("../Helpers/firebase"); // Ensure this is your correct path

exports.createProduct = async (req, res) => {
  console.log("jhdgwf", req.body);
  try {
    const {
      Name,
      Title,
      Price,
      Discription,
      Model,
      Camera,
      Ram,
      Company,
      MadeIn,
      Proccessor,
      Quantity,
      Category,
      SubCategory,
    } = req.body;

    let imagePath = '';
    if (req.file && req.file.firebaseUrl) {
      imagePath = req.file.firebaseUrl;  
    } else {
       imagePath = ''; 
    }


    if (req.file) {
      try {
        // Create a new product
        const newProduct = new Product({
          Name,
          Title,
          Price,
          Discription,
          Model,
          Camera,
          Ram,
          Company,
          MadeIn,
          image: imagePath,
          Proccessor,
          Quantity,
          Category,
          SubCategory,
        });
        

        await newProduct.save();
        res.status(201).json({
          message: "Product created successfully",
          newProduct,
          publicUrl:req.file.firebaseUrl
        });
      } catch (error) {
        console.log("Error in creating new product");
        res.status(500).json({ message: "Error creating product", error });
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Error creating product", error });
  }
};

exports.getCustomersByFilter = async (req, res) => {
  console.log("Request Body:", req.body); // Log the request body to verify the received data

  try {
    // Extract fields from the request body
    const { Title, Model, MadeIn } = req.body;

    // Create the query object based on the provided fields
    let query = {};

    // Add fields to the query object if they are provided
    if (Name) {
      query.Name = Name;
    }
    if (Title) {
      query.Title = Title;
    }
    if (Model) {
      query.Model = Model;
    }
    if (MadeIn) {
      query.MadeIn = MadeIn;
    }
    if (Discription) {
      query.Discription = Discription;
    }
    if (Price) {
      query.Price = Price;
    }
    if (Camera) {
      query.Camera = Camera;
    }
    if (Ram) {
      query.Ram = Ram;
    }
    if (Company) {
      query.Company = Company;
    }
    if (Quantity) {
      query.Quantity = Quantity;
    }
    if (Proccessor) {
      query.Proccessor = Proccessor;
    }

    console.log("Query Object:", query); // Log the query object to verify its contents

    // Perform the Mongoose query
    {
    }
    const products = await Product.find(query); // Use the Product model to find matching documents

    // Check if any products are found
    if (products.length === 0) {
      console.log("No products found matching the criteria.");
      return res.status(404).json({ message: "Koi product nahi mila." });
    }

    // Return the found products
    res.status(200).json(products);
  } catch (error) {
    // Log any errors that occur during the query
    console.error("Error during query:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.deleteOneProduct = async (req, res) => {
  console.log("Delete product api called");
  try {
    const productId = req.params.id; // Get the product ID from the request parameters

    // Find and delete the product by its ID
    const result = await Product.findByIdAndDelete(productId);

    if (!result) {
      return res.status(404).json({ message: "Product not found" });
    }

    res
      .status(200)
      .json({ message: "Product deleted successfully", data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateOneProduct = async (req, res) => {
  try {
    const productId = req.params.id; // Get the product ID from the request parameters
    const updateData = req.body; // Get the updated data from the request body

    // Find and update the product by its ID
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updateData,
      {
        new: true, // Return the updated document
        runValidators: true, // Validate the data against the model schema
      }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res
      .status(200)
      .json({ message: "Product updated successfully", data: updatedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    // Retrieve all products from the database
    const products = await Product.find();

    // Get the image URL from Firebase upload, if available
    let imagePath = "";
    if (req.file && req.file.firebaseUrl) {
      imagePath = req.file.firebaseUrl; // Use Firebase URL
      console.log("Firebase URL found:", imagePath);
    } else {
      console.log("No Firebase URL found in req.file");
    }

    // Respond with the products data
    res.status(200).json({
      message: "Products retrieved successfully",
      data: products,
      publicUrl: imagePath,
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
