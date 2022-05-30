import express from 'express';
import asyncHandler from 'express-async-handler';
import { signUp, singIn } from '../constrollers/auth';
import { upload } from '../midelwares/upload';

const router = express.Router();

router.post('/login', asyncHandler(singIn));
router.post('/auth', upload.single('photo'), asyncHandler(signUp));

export default router;
