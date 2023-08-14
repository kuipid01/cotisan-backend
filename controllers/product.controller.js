import Product from "../models/product.model.js";
import createError from "../utils/createError.js";

export const createProduct = async (req, res, next) => {
  try {
    if (!req.isSeller) {
      throw createError(403, "Only sellers can create a product");
    }

    const newProduct = new Product({
      username: req.username,
      userId: req.userId,
      ...req.body,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
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
  const filters = {
    ...(q.category && { category: { $regex: q.category, $options: "i" } }),
    ...(q.featured === "true" && { featured: true }),
    ...(q.featured === "false" && { featured: false }),

    ...(q.userId && { userId: q.userId }),
    ...((q.min || q.max) && {
      price: {
        ...(q.min && { $gt: q.min }),
        ...(q.max && { $lt: q.max }),
      },
    }),
    ...(q.search && {
      title: { $regex: q.search, $options: "i" },
    }),
  };

  try {
    const products = await Product.find(filters).sort({ [q.sort]: -1 });
    res.status(200).send(products);
  } catch (error) {
    // Handle error here
    res.status(500).send("An error occurred");
  }
};
