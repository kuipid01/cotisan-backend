import Product from "../models/product.model.js";
import createError from "../utils/createError.js";

export const createProduct = async (req, res, next) => {
  try {
    

    const newProduct = new Product({
      username: req.username,
      userId: req.userId,
      ...req.body,
    });
    // console.log(req.username, req.userId);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    console.log('we here',product.userId,req.userId)
    if (product.userId !== req.userId)
      return next(
        createError(403, "You can only deleteproduct created by you")
      );

    await Product.findByIdAndDelete(req.params.id);
    res.status(201).send("product deleted succesfully");
  } catch (error) {}
};
export const getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) next(createError(404, "Product not found"));
    res.status(200).send(product);
  } catch (error) {
    next(createError(404, "Something went wrong"));
  }
};
export const getProducts = async (req, res, next) => {
  const q = req.query;
  const filters = {};

  if (q.category) {
    filters.category = { $regex: q.category, $options: "i" };
  }

  if (q.featured === "true" || q.featured === "false") {
    filters.featured = q.featured === "true";
  }

  if (q.userId) {
    filters.userId = q.userId;
  }

  if (q.min || q.max) {
    filters.price = {};
    if (q.min) {
      filters.price.$gt = q.min;
    }
    if (q.max) {
      filters.price.$lt = q.max;
    }
  }

  if (q.search) {
    filters.title = { $regex: q.search, $options: "i" };
  }

  // Sort based on the provided 'sort' query parameter
  let sortQuery = {};
  if (q.sort === "latest") {
    sortQuery = { createdAt: -1 }; // Sort by creation date in descending order
  } else if (q.sort === "highestRated") {
    sortQuery = { averageRating: -1 }; // Sort by averageRating in descending order
  }

  try {
    const products = await Product.find(filters).sort(sortQuery);
    res.status(200).send(products);
  } catch (error) {
    // Handle error here
    console.error("Error:", error);
    res.status(500).send("An error occurred");
  }
};
