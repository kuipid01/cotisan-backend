import createError from "../utils/createError.js";
import jwt from 'jsonwebtoken'
export const verifyToken = (req, res,next) => {
  const token = req.cookies.acessToken;
  
  if (!token) return   next(createError(401,'You are not authenticated now'))
 
  jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
    if (err) return next(createError(403,'Token is not valid')) 
    req.userId = payload.id;
    req.isSeller = payload.isSeller;
    req.username=payload.username;
    next()
  });
};
