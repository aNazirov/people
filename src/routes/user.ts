import express from 'express';
import asyncHandler from 'express-async-handler';
import passport from 'passport';
import { getUserById, getUserByToken, getUsers, updateUser } from '../constrollers/user';
import { upload } from '../midelwares/upload';

const router = express.Router();

router.patch(
  '/:id',
  upload.single('photo'),
  passport.authenticate('jwt', { session: false }),
  asyncHandler(updateUser),
);

router.get(
  '/token',
  passport.authenticate('jwt', { session: false }),
  asyncHandler(getUserByToken),
);
router.get('/:id', passport.authenticate('jwt', { session: false }), asyncHandler(getUserById));
router.get('/', passport.authenticate('jwt', { session: false }), asyncHandler(getUsers));

export default router;
