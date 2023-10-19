import jwt from "jsonwebtoken";
import Review from "../models/review.model.js";
import createError from "../utils/createError.js";

export const createReview = async (req, res, next) => {
  try {
    if (req.isSeller) {
      throw createError(403, "Only Ordinary users can create a review");
    }

    const newReview = new   Review({
      username: req.username,
      userId: req.userId,
      ...req.body,
    });
    console.log(req.username, req.userId);
    const savedReview = await newReview.save();
    res.status(201).json(savedReview);
  } catch (error) {
    next(error);
  }
};
export const deleteReview = async (req, res, next) => {
  const review = await Review.findById(req.params.id);

  if (req.userId !== review._id.toString()) {
    return next(createError(403, 'You can only delete review created by you"'));
  }
  await Review.findByIdAndDelete(req.params.id);
  res.status(200).send("Product deleted");
};
export const getReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) next(createError(404, "review not found"));
    res.status(200).send(user);
  } catch (error) {
    next(createError(404, "Something went wrong"));
  }
};
export const getReviews = async (req, res, next) => {
  const q = req.query;
  const filters = {
    
    ...(q.sellerId && { sellerId: q.sellerId }), // Filter by sellerId if provided in query
  };

  try {
    const reviews = await Review.find(filters);

    res.status(200).send(reviews);
  } catch (error) {
    // Handle error here
    console.error("Error:", error);
    res.status(500).send("An error occurred");
  }
};
