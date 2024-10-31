const category = require("../Models/category");

exports.createCategory = async (req, res) => {
  console.log("jhdgwf", req.body);
  try {
    const { Name, Discription } = req.body;

    let imagePath = "";
    if (req.file && req.file.firebaseUrl) {
      imagePath = req.file.firebaseUrl;
    } else {
      imagePath = "";
    }

    if (req.file) {
      try {
        // Create a new product
        const newcategory = new category({
          Name,
          Discription,
          image: imagePath,
        });

        await newcategory.save();
        res.status(201).json({
          message: "Category created successfully",
          newcategory,
          publicUrl: req.file.firebaseUrl,
        });
      } catch (error) {
        console.log("Error in creating new product");
        res.status(500).json({ message: "Error creating category", error });
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Error creating category", error });
  }
};



exports.getAllCategories = async (req, res) => {
    try {
      // Retrieve all products from the database
      const Categories = await category.find();
  
    
  
      // Respond with the products data
      res.status(200).json({
        message: "Category retrieved successfully",
        data: Categories,
       });
    } catch (error) {
      console.error("Server error:", error);
      res.status(500).json({ message: "Server error" });
    }
  };
