
import jwt from "jsonwebtoken"
import User from "../models/user.model.js"
import createError from "../utils/createError.js"

export const deleteUser = async  (req,res,next) => {
const user = await User.findById(req.params.id)


    
    if (req.userId !== user._id.toString()) {
      return next (createError(403,'You can only delete your account"'))

    }
    await User.findByIdAndDelete(req.params.id);
    res.status(200).send("User deleted")
}
export const getUser = async (req,res,next) => {
  
  try {
      const user = await User.findById(req.params.id)
      if(!user) next(createError(404,'user not found'))
      res.status(200).send(user)
  } catch (error) {
      next(createError(404,'Something went wrong'))
  }

}
export const getUsers = async (req, res, next) => {
  const q = req.query;
  const filters = {};

  if (q.featured === 'true' || q.featured === 'false') {
    filters.featured = q.featured === 'true';
  }

  if (q.category) {
    filters.category = q.category;
  }

  // Declare user as an empty array
  let user = [];

  // Add logic to sort by stars if 'sort' query parameter is provided
  if (q.sort) {
    if (q.sort === 'latest') {
      // Sort by the latest users (assuming a "createdAt" property)
      user = await User.find(filters).sort({ createdAt: -1 });
    } else if (q.sort === 'highest_stars') {
      // Sort by the highest stars (assuming a "stars" property)
      user = await User.find(filters).sort({ stars: -1 });
    } else {
      // Default sorting (you can customize this)
      user = await User.find(filters);
    }
  } else {
    // No sorting specified, return the user without sorting
    user = await User.find(filters);
  }

  try {
    res.status(200).send(user);
  } catch (error) {
    // Handle error here
    console.error('Error:', error);
    res.status(500).send('An error occurred');
  }
};



