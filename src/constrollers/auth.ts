import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { IRequest, IResponse } from '../interfaces';
import File from '../models/File';
import User from '../models/User';
import { customErrorHandler } from '../utils';

export const signUp = async (req: IRequest, res: IResponse) => {
  const { email, password, name, birthDate, gender } = req.body;
  let file = req.file;

  const user = await User.findOne({ email });

  if (user)
    return customErrorHandler(res, { message: 'Пользователь с таким email уже существует' });

  const salt = bcryptjs.genSaltSync(10);

  try {
    if (file) {
      file = await File.create({ path: file.path });
    }

    await User.create({
      name,
      email,
      birthDate,
      gender,
      ...(file ? { photo: file.id } : {}),
      password: bcryptjs.hashSync(password, salt),
    });

    res.status(201).json({
      status: 'success',
      message: 'Пользователь успешно создан',
    });
  } catch (error) {
    customErrorHandler(res, { message: 'SERVER_ERROR' }, 500);
  }
};

export const singIn = async (req: IRequest, res: IResponse) => {
  try {
    const { email, password } = req.body;
    const candidate = await User.findOne({ email });

    if (!candidate)
      return customErrorHandler(
        res,
        { message: 'Пароль или email не верны попробуйте снова.' },
        401,
      );

    const passwordResult = bcryptjs.compareSync(password, candidate.password);

    if (!passwordResult)
      return customErrorHandler(
        res,
        { message: 'Пароль или email не верны попробуйте снова.' },
        401,
      );

    try {
      const token = jwt.sign(
        {
          email: candidate.email,
          uId: candidate.id,
        },
        process.env.KEY,
        { expiresIn: 3600 },
      );

      res.status(200).json({
        user: await User.findById(candidate.id, { __v: false }).populate('photo', {
          __v: false,
        }),
        token,
      });
    } catch (e) {
      customErrorHandler(
        res,
        { message: 'Во время получения токена что то пошло не так. Попробуйте снова' },
        500,
      );
    }
  } catch (error) {
    console.log(error);
    customErrorHandler(res, { message: 'SERVER_ERROR' }, 500);
  }
};
