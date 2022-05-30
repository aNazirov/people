import bcryptjs from 'bcryptjs';
import mongoose from 'mongoose';
import { IRequest, IResponse } from '../interfaces';
import File from '../models/File';
import User from '../models/User';

import { customErrorHandler } from '../utils';

export const getUserById = async (req: IRequest, res: IResponse) => {
  try {
    const user = await User.findById(req.params.id, { __v: false });
    res.status(200).json({ user });
  } catch (error) {
    customErrorHandler(res, { message: 'SERVER_ERROR' }, 500);
  }
};

export const getUserByToken = async (req: IRequest, res: IResponse) => {
  try {
    console.log(req.user);

    const user = await User.findById(req.user.uId).populate('photo', {
      __v: false,
    });

    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    customErrorHandler(res, { message: 'SERVER_ERROR' }, 500);
  }
};

export const getUsers = async (req: IRequest, res: IResponse) => {
  try {
    const _id = new mongoose.mongo.ObjectId(req.user.uId);
    const users = await User.find({ _id: { $ne: _id } }, { __v: false }).populate('photo', {
      __v: false,
    });

    res.status(200).json(users);
  } catch (error) {
    customErrorHandler(res, { message: 'SERVER_ERROR' }, 500);
  }
};

export const updateUser = async (req: IRequest, res: IResponse) => {
  const { id } = req.params;
  const { email, password, name, birthDate, gender } = req.body;
  let file = req.file;

  const candidate = await User.findById(id);

  if (!candidate)
    return customErrorHandler(res, { message: 'Пользователя с таким id не существует' });

  const data = {
    email: undefined,
    password: undefined,
    name: undefined,
    gender: undefined,
    birthDate: undefined,
    photo: undefined,
  };

  if (email) {
    const conflict = await User.findOne({ email });

    if (conflict)
      return customErrorHandler(res, { message: 'Пользователь с таким email уже существует' });

    data.email = email;
  }

  if (password) {
    data.password = bcryptjs.hashSync(password, bcryptjs.genSaltSync(10));
  }

  if (name) {
    data.name = name;
  }

  if (birthDate) {
    data.birthDate = new Date(birthDate);
  }

  if (gender) {
    data.gender = gender;
  }

  try {
    if (file) {
      file = await File.create({ path: file.path });
      data.photo = file._id;
    }

    await User.findByIdAndUpdate(id, data);

    res.status(200).json({
      user: await User.findById(id, { __v: false, password: false }).populate('photo', {
        _v: false,
      }),
    });
  } catch (error) {
    console.log(error);

    customErrorHandler(res, { message: 'SERVER_ERROR' }, 500);
  }
};
