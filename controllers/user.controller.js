
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
  const filters = {
    ...(q.featured === "true" && { featured: true }),
    ...(q.featured === "false" && { featured: false }),
  };
  
  try {
 
    const users = await User.find(filters);
  
    res.status(200).send(users);
  } catch (error) {
    // Handle error here
    console.error("Error:", error);
    res.status(500).send("An error occurred");
  }
};
