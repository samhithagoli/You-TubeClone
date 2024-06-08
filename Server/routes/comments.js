import express from 'express';
import auth from '../middleware/auth.js'; // Ensure the path is correct and .js is included
import { postComment, getComment, deleteComment, editComment } from '../controllers/comments.js'; // Adjust the path to the correct location of your controllers

const router = express.Router();

router.post('/post', auth, postComment);
router.get('/get', getComment);
router.delete('/delete/:id', auth, deleteComment);
router.patch('/edit/:id', auth, editComment);

export default router;
