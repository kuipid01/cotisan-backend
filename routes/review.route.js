import express from 'express';
import { deleteReview, getReviews,getReview,createReview } from '../controllers/review.controller.js';
import { verifyToken } from '../middleware/jwt.js';


const router = express.Router();

router.post("/create", createReview)
router.delete("/:id",verifyToken, deleteReview)
router.get("/:id", getReview)
router.get('/',getReviews)
// Add more routes for CRUD operations or other user-related actions

export default router;
